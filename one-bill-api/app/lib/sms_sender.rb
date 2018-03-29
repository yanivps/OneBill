class SmsSender
  SEND_URL = 'https://api.txtlocal.com/send'

  # TODO: implement sender functions with real implementation
  class << self
    def verification_code(phone_number, code)
      message = "Your verification code is #{code}"
      send_sms(phone_number, message)
    end

    def login_to_new_account_invitation(phone_number, invitation)
      uri = URI.parse(Rails.configuration.x.invitation_urls[:login])
      add_query_string(uri, { token: invitation.token })
      message = "You have new account associated with your user in OneBill. In order to complete the association process and watch the account, click on this link: #{uri.to_s}"
      send_sms(phone_number, message)
    end

    def register_invitation(phone_number, invitation)
      uri = URI.parse(Rails.configuration.x.invitation_urls[:register])
      add_query_string(uri, { token: invitation.token })
      message = "You were invited to OneBill! OneBill is a platform where you can see all your municipality bills online. To register and go to your account, click on this link: #{uri.to_s}"
      send_sms(phone_number, message)
    end

    private
      def send_sms(phone_number, message)
        uri = URI.parse(SEND_URL)
        response = Net::HTTP.post_form(uri, 'apikey' => TEXT_LOCAL_API_KEY, 'username' => TEXT_LOCAL_USERNAME, 'hash' => TEXT_LOCAL_HASH, 'message' => message, 'numbers' => phone_number)
        response_data = JSON.parse(response.body)
        if response_data["status"] != "success"
          Rails.logger.error Message.sms_failed + " Errors: #{response_data['errors']}"
          raise ExceptionHandler::InternalError, Message.sms_failed
        end
        if Rails.env.development?
          puts "[SMS SENT to #{phone_number}]: #{message}"
        end
        nil
      end

      def add_query_string(uri, query_string)
        new_query_ar = URI.decode_www_form(String(uri.query))
        query_string.each do |key, value|
          new_query_ar << [key, value]
        end
        uri.query = URI.encode_www_form(new_query_ar)
        uri
      end
  end
end
