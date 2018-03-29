class UsersController < ApplicationController
  skip_before_action :authorize_request

  before_action :authorize_request_from_non_verified_user
  skip_before_action :authorize_request_from_non_verified_user, only: :create

  before_action :set_invitation_by_token, only: [:create]

  # POST /signup
  def create
    User.create!(user_params.merge(phone_number: @invitation.phone_number))
    token = AuthenticateUser.new(user_params[:email], user_params[:password]).call
    response = { auth_token: token, message: Message.account_created }
    json_response(response, :created)
  end

  def send_verification_code_sms
    raise ExceptionHandler::BadRequest, Message.missing_parameter(:phone_number) if params[:phone_number].blank?
    raise ExceptionHandler::Forbidden Message.not_allowed if current_user.id != params[:id]
    phone_number = params[:phone_number].gsub(/[() -]/, '')
    user_phone_number = current_user.phone_number.gsub(/[() -]/, '')
    raise ExceptionHandler::InvalidOperation, Message.incorrect_phone_number if user_phone_number != phone_number

    code = generate_verification_code
    current_user.update(verification_code: code)

    # TODO: Uncomment this when done with SMS demonstration
    # if Rails.env.development? || Rails.env.test?
    #   return json_response({ code: code }, :created)
    # end

    SmsSender.verification_code(params[:phone_number], code)
    head :no_content
  end

  def verify
    raise ExceptionHandler::BadRequest, Message.missing_parameter(:code) if params[:code].blank?
    raise ExceptionHandler::Forbidden Message.not_allowed if current_user.id != params[:id]
    raise ExceptionHandler::InvalidOperation, Message.incorrect_verification_code if current_user.verification_code != params[:code]

    current_user.update(is_verified: true, verification_code: nil)
    head :no_content
  end

  private

  def user_params
    params.permit(:name, :email, :password, :password_confirmation)
  end

  def generate_verification_code(digits = 6)
    Array(1..digits).map!{|x| x == 1 ? (1..9).to_a.sample : (0..9).to_a.sample}.join
  end

  def set_invitation_by_token
    raise ExceptionHandler::BadRequest, Message.missing_parameter(:invitation_token) if params[:invitation_token].blank?

    @invitation = Invitation.find_by_token(params[:invitation_token])
    if @invitation.nil? || @invitation.expires_at.past?
      raise ExceptionHandler::InvalidOperation, Message.invalid_invitation_token
    end
    raise ExceptionHandler::InvalidOperation, Message.invitation_already_used if @invitation.used_at.present?
  end
end
