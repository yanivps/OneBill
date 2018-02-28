class ApplicationController < ActionController::API
  include Response
  include ExceptionHandler

  before_action :authorize_request

  attr_reader :current_user

  private

  def authorize_request
    authorize_request_from_non_verified_user
    raise ExceptionHandler::NotVerifiedError, Message.user_not_verified unless @current_user.is_verified
  end

  def authorize_request_from_non_verified_user
    @current_user = AuthorizeApiRequest.new(request.headers).call[:user]
  end
end
