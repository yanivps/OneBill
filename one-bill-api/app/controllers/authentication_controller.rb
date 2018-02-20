class AuthenticationController < ApplicationController
  skip_before_action :authorize_request

  # POST /auth/login
  def authenticate
    token = AuthenticateUser.new(auth_params[:email], auth_params[:password]).call
    json_response({auth_token: token})
  end

  private

  def generic_oauth(provider)
    auth_provider_class = "#{provider.to_s_camelize}AuthProvider".constantize
    auth_provider = auth_provider_class.new(params[:auth_code], params[:redirect_uri])
    token = AuthenticateOauthUser.new(auth_provider, provider).call
    json_response({auth_token: token})
  end

  def auth_params
    params.permit(:email, :password)
  end

  def oauth_params
    params.permit(:auth_code)
  end
end
