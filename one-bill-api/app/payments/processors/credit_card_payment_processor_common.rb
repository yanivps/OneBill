module Processors
  module CreditCardPaymentProcessorCommon
    require "active_merchant/billing/rails"
    include Processors::PaymentProcessorCommon
    extend ActiveSupport::Concern

    included do
      attr_accessor :gateway
      attr_accessor :card_type_key
      attr_accessor :payment_processor

      # Credit Card fields
      attr_accessor :card_security_code
      attr_accessor :credit_card_number
      attr_accessor :expiration_month
      attr_accessor :expiration_year
      attr_accessor :first_name
      attr_accessor :last_name
    end

    def process(options={})
      if valid_card
        if options[:store_card] == true
          store_response = @gateway.store(credit_card_information)
          handle_unsuccessful_response(store_response) if !store_response.success?
          token = store_response.authorization
        end

        create_payment_with_credit_card_transaction
        response = purchase(token || credit_card_information)

        begin
          card_type = response.params[@card_type_key]&.downcase&.to_sym
          credit_card = create_credit_card(card_type, token)
          @credit_card_transaction.credit_card = credit_card
          @credit_card_transaction.save!
        rescue Exception => e
          Rails.logger.error "Failed storing credit card. Error #{e.class}: #{e.message}\n#{e.backtrace.join("\n")}"
        end

        @credit_card_transaction
      end
    end

    def process_with_credit_card_token(credit_card)
      create_payment_with_credit_card_transaction
      @credit_card_transaction.credit_card_id = credit_card.id
      purchase(credit_card.token)
      @credit_card_transaction
    end

    private

      def credit_card_information
        @credit_card_information ||= ActiveMerchant::Billing::CreditCard.new(
          number:              credit_card_number,
          verification_value:  card_security_code,
          month:               expiration_month,
          year:                expiration_year,
          first_name:          first_name,
          last_name:           last_name
        )
        @credit_card_information
      end

      def valid_card
        if !credit_card_information.valid?
          raise ExceptionHandler::PaymentProcessingError, Message.credit_card_invalid
        else
          true
        end
      end

      def purchase(payment_method)
        response = FIRST_DATA_GATEWAY.purchase(amount.cents, payment_method)
        handle_unsuccessful_response(response) if !response.success?

        @credit_card_transaction.update_attribute(:processor_authorization_code, response.authorization)
        @credit_card_transaction.payment.update_attribute(:status, :success)

        response
      end

      def handle_unsuccessful_response(response)
        return if response.success?

        @credit_card_transaction.payment.update_attribute(:status, :failure) if @credit_card_transaction

        error_number = response.params[@error_number_key] if @error_number_key
        error_description = response.params[@error_description_key] || response.message
        Rails.logger.error "Error #{error_number} in processing payment: #{error_description}"

        raise ExceptionHandler::PaymentProcessingError, Message.payment_processor_general_error if error_number == '401'
        raise ExceptionHandler::PaymentProcessingError, Message.credit_card_declined
      end

      def create_credit_card(card_type = :unknown, token = nil)
        credit_card = CreditCard.new(last_4: credit_card_number[-4..-1],
          expires_at: Date.new(expiration_year.to_i, expiration_month.to_i).end_of_month,
          card_type: CreditCardType.find_by_name(card_type) || CreditCardType.find_by_name(:unknown))
        if token
          credit_card.token = token
          credit_card.user_id = user_id
        end
        credit_card.save!
        credit_card
      end

      def create_payment_with_credit_card_transaction
        @credit_card_transaction = CreditCardTransaction.new(payment_processor: @payment_processor)
        create_payment_for_transaction(@credit_card_transaction)
      end

      def assert_attributes
        [:gateway, :card_type_key, :payment_processor].each do |attr|
          raise "Attribute #{attr} cannot be nil" if instance_variable_get("@#{attr}").nil?
        end
      end
  end
end
