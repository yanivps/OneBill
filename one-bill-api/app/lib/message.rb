class Message
  class << self
    def not_found(record = 'record')
      { message: :not_found, description: "Sorry, #{record} not found" }.to_json
    end

    def already_exists(record = 'Record')
      { message: :already_exists, description: "#{record} is not unique" }.to_json
    end

    def invalid_credentials
      { message: :invalid_credentials, description: 'Invalid credentials' }.to_json
    end

    def invalid_token
      { message: :invalid_token, description: 'Invalid token' }.to_json
    end

    def missing_token
      { message: :missing_token, description: 'Missing token' }.to_json
    end

    def unauthorized
      { message: :unauthorized, description: 'Unauthorized request' }.to_json
    end

    def internal_error
      { message: :internal_error, description: 'Sorry, an internal server error has occured' }.to_json
    end

    def not_allowed
      { message: :not_allowed, description: 'You are not not allowed to perform this operation' }.to_json
    end

    def invitation_does_not_belong_to_this_user
      { message: :invitation_does_not_belong_to_this_user, description: "Invitation does not belong to this user" }.to_json
    end

    def account_created(auth_token = nil)
      json = { message: :account_created, description: 'Account created successfully' }
      json[:auth_token] = auth_token if auth_token
      json.to_json
    end

    def account_not_created
      { message: :account_not_created, description: 'Account could not be created' }.to_json
    end

    def expired_token
      { message: :expired_token, description: 'Sorry, your token has expired. Please login to continue' }.to_json
    end

    def invalid_invitation_token
      { message: :invalid_invitation_token, description: 'The invitation is invalid or was expired' }.to_json
    end

    def invitation_already_used
      { message: :invitation_already_used, description: 'The invitation was already used' }.to_json
    end

    def invitation_was_expired
      { message: :invitation_was_expired, description: 'The invitation was was expired' }.to_json
    end

    def missing_parameter(param)
      { message: :missing_parameter, description: "Missing parameter: #{param}" }.to_json
    end

    def incorrect_phone_number
      { message: :incorrect_phone_number, description: "Phone number is incorrect" }.to_json
    end

    def incorrect_verification_code
      { message: :incorrect_verification_code, description: "Verification code is incorrect" }.to_json
    end

    def user_not_verified
      { message: :user_not_verified, description: "User is not verified" }.to_json
    end

    def credit_card_declined
      { message: :credit_card_declined, description: "The credit card you provided was declined. Please double check your information and try again" }.to_json
    end

    def credit_card_invalid
      { message: :credit_card_invalid, description: "The credit card information you provided is not valid. Please double check the information you provided and then try again" }.to_json
    end

    def payment_processor_general_error
      { message: :payment_processor_general_error, description: "Payment error. Please contact us or try again later" }.to_json
    end

    def invalid_min_payment_amount(min_range)
      { message: :invalid_min_payment_amount, description: "Payment amount should be more than #{min_range}" }.to_json
    end

    def invalid_max_payment_amount(max_range)
      { message: :invalid_max_payment_amount, description: "Payment amount can not be more than #{max_range}" }.to_json
    end

    def credit_card_not_removed
      { message: :credit_card_not_removed, description: "Credit card could not be removed" }.to_json
    end

    def invalid_paypal_token
      { message: :invalid_paypal_token, description: "PayPal token is invalid" }.to_json
    end

    def payment_was_already_processed
      { message: :payment_was_already_processed, description: "Payment was already processed" }.to_json
    end

    def sms_failed
      { message: :sms_failed, description: "Failed to send SMS message" }.to_json
    end
  end
end
