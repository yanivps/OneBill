class UsersController < ApplicationController
  skip_before_action :authorize_request, only: :create

  # POST /signup
  def create
    User.create!(user_params)
    token = AuthenticateUser.new(user_params[:email], user_params[:password]).call
    response = { auth_token: token, message: Message.account_created }
    json_response(response, :created)
  end

  private

  def user_params
    params.permit(:name, :email, :password, :password_confirmation, :phone_number)
  end
end
