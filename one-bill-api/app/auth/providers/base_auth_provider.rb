require "rest-client"

class BaseAuthProvider

  def get_user_info
    @access_token = exchange_auth_code_with_token
    raise "oauth token exchange response does not contain access_token" unless @access_token

    user_info_response = RestClient.get @user_info_url,
      { :Authorization => "Bearer #{@access_token}" }

    adapt_user_info JSON.parse(user_info_response)
  end

  private

  def exchange_auth_code_with_token
    response = RestClient.post @access_token_url, token_exchange_params.to_query
    @access_token = JSON.parse(response)['access_token']
  end

  def adapt_user_info(user_info)
    user_info
  end

  def token_exchange_params
    raise 'Unimplemented method'
  end
end
