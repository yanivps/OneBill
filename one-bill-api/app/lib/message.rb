class Message
  class << self
    def not_found(record = 'record')
      "Sorry, #{record} not found"
    end

    def already_exists(record = 'Record')
      "#{record} is not unique"
    end

    def invalid_credentials
      'Invalid credentials'
    end

    def invalid_token
      'Invalid token'
    end

    def missing_token
      'Missing token'
    end

    def unauthorized
      'Unauthorized request'
    end

    def internal_error
      'Sorry, an internal server error has occured'
    end

    def not_allowed
      'You are not not allowed to perform this operation'
    end

    def invitation_does_not_belong_to_this_user
      "Invitation does not belong to this user"
    end

    def account_created
      'Account created successfully'
    end

    def account_not_created
      'Account could not be created'
    end

    def expired_token
      'Sorry, your token has expired. Please login to continue'
    end

    def invalid_invitation_token
      'The invitation is invalid or was expired'
    end

    def invitation_already_used
      'The invitation was already used'
    end

    def missing_parameter(param)
      "Missing parameter: #{param}"
    end

    def incorrect_phone_number
      "Phone number is incorrect"
    end

    def incorrect_verification_code
      "Verification code is incorrect"
    end

    def user_not_verified
      "User is not verified"
    end

    def credit_card_declined
      "The credit card you provided was declined. Please double check your information and try again"
    end

    def credit_card_invalid
      "The credit card information you provided is not valid. Please double check the information you provided and then try again"
    end

    def payment_processor_general_error
      "Payment error. Please contact us or try again later"
    end

    def invalid_min_payment_amount(min_range)
      "Payment amount should be more than #{min_range}"
    end

    def invalid_max_payment_amount(max_range)
      "Payment amount can not be more than #{max_range}"
    end

    def credit_card_not_removed
      "Credit card could not be removed"
    end

    def invalid_paypal_token
      "PayPal token is invalid"
    end

    def payment_was_already_processed
      "Payment was already processed"
    end

    def sms_failed
      "Failed to send SMS message"
    end
  end
end
