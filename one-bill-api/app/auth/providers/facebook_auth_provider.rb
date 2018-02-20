class FacebookAuthProvider < BaseAuthProvider
  def initialize(auth_code, redirect_uri)
    @auth_code = auth_code
    @redirect_uri = redirect_uri
    @user_info_url = "https://graph.facebook.com/v2.12/me?fields=id,name,email"
    @access_token_url = "https://graph.facebook.com/v2.12/oauth/access_token"
    @provider = :facebook
  end

  private

  def token_exchange_params
    {
      code: @auth_code,
      client_id: OAUTH_PROVIDERS[:facebook][:client_id],
      client_secret: OAUTH_PROVIDERS[:facebook][:client_secret],
      redirect_uri: @redirect_uri,
      grant_type: 'authorization_code'
    }
  end
end
