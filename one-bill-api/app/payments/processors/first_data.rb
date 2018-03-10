module Processors
  class FirstData
    require "active_merchant/billing/rails"
    include Processors::PaymentProcessorCommon

    # Payment Processor required fields
    attr_accessor :card_security_code
    attr_accessor :credit_card_number
    attr_accessor :expiration_month
    attr_accessor :expiration_year
    attr_accessor :first_name
    attr_accessor :last_name

    def initialize(attributes)
      @card_security_code = attributes[:card_security_code]
      @credit_card_number = attributes[:credit_card_number]
      @expiration_month = attributes[:expiration_month]
      @expiration_year = attributes[:expiration_year]
      @first_name = attributes[:first_name]
      @last_name = attributes[:last_name]
      @amount = Money.from_amount(attributes[:amount].to_f)
      @account_id = attributes[:account_id]
      @user_id = attributes[:user_id]
    end

    def process(options={})
      if valid_card
        if options[:store_card] == true
          store_response = GATEWAY.store(credit_card_information)
          handle_unsuccessful_response(store_response) if !store_response.success?
          token = store_response.authorization
        end

        create_payment_with_credit_card_transaction
        response = purchase(token || credit_card_information)

        card_type = response.params['card_type'].downcase.to_sym
        credit_card = create_credit_card(card_type, token)
        @credit_card_transaction.credit_card = credit_card
        @credit_card_transaction.save!
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
        response = GATEWAY.purchase(amount.cents, payment_method)
        handle_unsuccessful_response(response) if !response.success?

        @credit_card_transaction.update_attribute(:processor_authorization_code, response.authorization)
        @credit_card_transaction.payment.update_attribute(:status, :success)

        response
      end

      def handle_unsuccessful_response(response)
        return if response.success?

        @credit_card_transaction.payment.update_attribute(:status, :failure) if @credit_card_transaction

        error_number = response.params['error_number']
        error_description = response.params['error_description']
        Rails.logger.error "Error #{error_number} in processing payment: #{error_description}"

        raise ExceptionHandler::PaymentProcessingError, Message.payment_processor_general_error if error_number == '401'
        raise ExceptionHandler::PaymentProcessingError, Message.credit_card_declined
      end

      def create_credit_card(card_type = :unknown, token = nil)
        credit_card = CreditCard.new(last_4: credit_card_number[-4..-1],
          expires_at: Date.new(expiration_year, expiration_month).end_of_month,
          card_type: CreditCardType.find_by_name(card_type) || CreditCardType.find_by_name(:unknown))
        if token
          credit_card.token = token
          credit_card.user_id = user_id
        end
        credit_card.save!
        credit_card
      end

      def create_payment_with_credit_card_transaction
        @credit_card_transaction = CreditCardTransaction.new(payment_processor: PaymentProcessor.find_by_name(:first_data))
        create_payment_for_transaction(@credit_card_transaction)
      end
  end
end
