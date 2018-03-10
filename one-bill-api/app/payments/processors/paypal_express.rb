module Processors
  class PaypalExpress
    include Processors::PaymentProcessorCommon

    def initialize(attributes = {})
      @amount = Money.from_amount(attributes[:amount].to_f)
      @account_id = attributes[:account_id]
      @user_id = attributes[:user_id]
    end

    def setup_purchase(options = {})
      validate_amount
      response = PAYPAL_GATEWAY.setup_purchase(
        amount.cents,
        ip: options[:ip],
        return_url: options[:return_url],
        cancel_return_url: options[:cancel_return_url],
        currency: amount.currency.iso_code,
        allow_guest_checkout: false,
        no_shipping: true,
        items: options[:items] || [{name: "OneBill", quantity: "1", amount: amount.cents}]
      )
      handle_unsuccessful_response(response)
      response.token
    end

    def redirect_url_for(token)
      PAYPAL_GATEWAY.redirect_url_for(token)
    end

    def checkout(options)
      token = options[:token]
      @paypal_transaction = PaypalTransaction.find_by_token(token)
      raise ExceptionHandler::InvalidOperation, Message.invalid_paypal_token unless @paypal_transaction
      raise ExceptionHandler::InvalidOperation, Message.payment_was_already_processed if is_successful_payment_exist

      destroy_existing_unsuccessful_payments
      @account_id = @paypal_transaction.account_id
      @user_id = @paypal_transaction.user_id
      details = PAYPAL_GATEWAY.details_for(token)
      @amount = Money.from_amount(details.params['amount'].to_f)
      options[:currency] = @amount.currency.iso_code
      @paypal_transaction.payer = details.params['payer']

      create_payment_for_transaction(@paypal_transaction)
      purchase(options)
      @paypal_transaction
    end

    private
      def is_successful_payment_exist
        if @paypal_transaction.payment.present?
          return @paypal_transaction.payment.success?
        end
      end

      def destroy_existing_unsuccessful_payments
        if @paypal_transaction.payment.present?
          if @paypal_transaction.payment.status != :success
            @paypal_transaction.payment.destroy
          end
        end
      end

      def purchase(purchase_options)
        response = PAYPAL_GATEWAY.purchase(amount.cents, purchase_options)
        handle_unsuccessful_response(response)
        @paypal_transaction.update_attribute(:processor_authorization_code, response.authorization)
        @paypal_transaction.payment.update_attribute(:status, :success)
        response
      end

      def handle_unsuccessful_response(response)
        return if response.success?

        @paypal_transaction.payment.update_attribute(:status, :failure) if @paypal_transaction

        error_number = response.params['error_codes']
        error_description = response.params['message']
        Rails.logger.error "Error #{error_number} in processing payment: #{error_description}"

        raise ExceptionHandler::PaymentProcessingError, Message.payment_processor_general_error
      end
  end
end
