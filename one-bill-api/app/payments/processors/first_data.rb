module Processors
  class FirstData
    include Processors::CreditCardPaymentProcessorCommon

    def initialize(attributes)
      @gateway = FIRST_DATA_GATEWAY

      @card_security_code = attributes[:card_security_code]
      @credit_card_number = attributes[:credit_card_number]
      @expiration_month = attributes[:expiration_month]
      @expiration_year = attributes[:expiration_year]
      @first_name = attributes[:first_name]
      @last_name = attributes[:last_name]

      @amount = Money.from_amount(attributes[:amount].to_f)
      @account_id = attributes[:account_id]
      @user_id = attributes[:user_id]

      @error_number_key = 'error_number'
      @error_description_key = 'error_description'
      @card_type_key = 'card_type'
      @payment_processor = PaymentProcessor.find_by_name(:first_data)

      assert_attributes
    end
  end
end
