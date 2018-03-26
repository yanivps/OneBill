class InvitationsController < ApplicationController
  skip_before_action :authorize_request, only: [:show]

  before_action :set_account, only: [:create]
  before_action :set_invited_user, only: [:create]
  before_action :set_invitation_by_token, only: [:show]

  def show
  end

  # POST /invitations
  def create
    token = SecureRandom.urlsafe_base64(32, false)
    expires_at = 1.month.from_now
    @invitation = Invitation.create!(
      invitation_params.merge(account_id: @account.id, token: token, expires_at: expires_at))

    if @invited_user
      SmsSender.login_to_new_account_invitation(@invitation.phone_number, @invitation)
    else
      SmsSender.register_invitation(@invitation.phone_number, @invitation)
    end

    render :show, status: :created
  end

  private
    def invitation_params
      params.permit(:phone_number)
    end

    def set_account
      raise ExceptionHandler::BadRequest, Message.missing_parameter(:account_id) if params[:account_id].blank?

      @account = current_user.accounts.where(id: params[:account_id]).first
      raise ExceptionHandler::Forbidden, Message.not_allowed unless @account
    end

    def set_invited_user
      @invited_user = User.find_by_phone_number(params[:phone_number])
    end

    def set_invitation_by_token
      raise ExceptionHandler::BadRequest, Message.missing_parameter(:invitation_token) if params[:invitation_token].blank?

      @invitation = Invitation.find_by_token(params[:invitation_token])
      if @invitation.nil? || @invitation.expires_at.past?
        raise ExceptionHandler::InvalidOperation, Message.invalid_invitation_token
      end
      @invited_user = User.find_by_phone_number(@invitation.phone_number)
    end
end
