class SmsSender
  # TODO: implement sender functions with real implementation
  class << self
    def verification_code(phone_number, code)
      puts "[SMS SENT to #{phone_number}]: Your verification code is #{code}"
    end

    def login_to_new_account_invitation(phone_number, invitation)
      puts "[SMS SENT to #{phone_number}] Login to [URL] to see new account #{invitation.account_id}"
    end

    def register_invitation(phone_number, invitation)
      puts "[SMS SENT to #{phone_number}] Welcome to OneBill. Register to see account #{invitation.account_id}"
    end
  end
end
