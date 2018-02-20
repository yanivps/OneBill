require "rest-client"

class AuthenticateOauthUser
  include AuthenticateUserCommand

  def initialize(auth_provider, provider)
    @auth_provider = auth_provider
    @provider = provider
  end

  private

  def user
    return @user if @user

    user_info = @auth_provider.get_user_info
    @user = get_or_create_user(user_info)
    return @user

  rescue RestClient::Exception => e
    error_msg = JSON.parse(e.response)
    Rails.logger.error(error_msg)
    raise ExceptionHandler::InternalError, Message.internal_error
  end

  def get_or_create_user(user_info)
    user = User.where(:uid => user_info['id'], :provider => @provider).first
    unless user
      user = User.new(name: user_info['name'], email: user_info['email'],
                          uid: user_info['id'], provider: @provider)
      # Skip validation to not fail on missing password
      user.save!(validate: false)
    end
    user
  end
end
