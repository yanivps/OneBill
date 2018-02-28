class Message
  class << self
    def not_found(record = 'record')
      "Sorry, #{record} not found."
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

    def account_user_association_not_created
      "Could not associate user with the account"
    end

    def account_created
      'Account created successfully'
    end

    def account_not_created
      'Account could not be created'
    end

    def expired_token
      'Sorry, your token has expired. Please login to continue.'
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
  end
end
