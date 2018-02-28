class UsersController < ApplicationController
  skip_before_action :authorize_request

  before_action :authorize_request_from_non_verified_user
  skip_before_action :authorize_request_from_non_verified_user, only: :create

  # POST /signup
  def create
    User.create!(user_params)
    token = AuthenticateUser.new(user_params[:email], user_params[:password]).call
    response = { auth_token: token, message: Message.account_created }
    json_response(response, :created)
  end

  def send_verification_code_sms
    raise ExceptionHandler::BadRequest, Message.missing_parameter(:phone_number) if params[:phone_number].blank?
    raise ExceptionHandler::Forbidden Message.not_allowed if current_user.id != params[:id]
    raise ExceptionHandler::InvalidOperation Message.incorrect_phone_number if current_user.phone_number != params[:phone_number]

    code = generate_verification_code
    current_user.update(verification_code: code)

    if Rails.env.development? || Rails.env.test?
      return json_response({ code: code }, :created)
    end

    # TODO: implement sender
    # SmsSender.verification_code(params[:phone_number], code)
  end

  def verify
    raise ExceptionHandler::BadRequest, Message.missing_parameter(:code) if params[:code].blank?
    raise ExceptionHandler::Forbidden Message.not_allowed if current_user.id != params[:id]
    raise ExceptionHandler::InvalidOperation Message.incorrect_verification_code if current_user.verification_code != params[:code]

    current_user.update(is_verified: true, verification_code: nil)
    head :no_content
  end

  private

  def user_params
    params.permit(:name, :email, :password, :password_confirmation, :phone_number)
  end

  def generate_verification_code(digits = 6)
    Array(1..digits).map!{|x| x == 1 ? (1..9).to_a.sample : (0..9).to_a.sample}.join
  end
end
