class InvitationsController < ApplicationController
  before_action :set_account, only: [:create]
  before_action :set_invited_user, only: [:create]

  # POST /invitations
  def create
    token = SecureRandom.urlsafe_base64(32, false)
    expires_at = 1.month.from_now
    @invitation = Invitation.create!(
      invitation_params.merge(account_id: @account.id, token: token, expires_at: expires_at))

    # TODO: implement sender
    # if @invited_user
    #   SmsSender.watch_new_account_invitation(@invitation.phone_number, @invitation)
    # else
    #   SmsSender.register_invitation(@invitation.phone_number, @invitation)
    # end

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
end
