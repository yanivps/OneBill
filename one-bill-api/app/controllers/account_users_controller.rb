class AccountUsersController < ApplicationController
  before_action :set_account_and_user, only: [:destroy]
  before_action :set_account, only: [:index]

  def index
    @users = @account.users
  end

  def destroy
    if current_user.id == @user.id
      # User leaves
      delete_association
    else
      # User remove other user
      mark_association_as_removed
    end
    head :no_content
  end

  def create_from_invitation
    raise ExceptionHandler::BadRequest, Message.missing_parameter(:invitation_token) if params[:invitation_token].blank?

    invitation = Invitation.find_by_token(params[:invitation_token])
    if invitation.nil? || invitation.expires_at.past?
      raise ExceptionHandler::InvalidOperation, Message.invalid_invitation_token
    end
    raise ExceptionHandler::InvalidOperation, Message.invitation_already_used if invitation.used_at.present?
    if current_user.phone_number != invitation.phone_number
      raise ExceptionHandler::Forbidden, Message.account_user_association_not_created
    end

    UserOfAccount.create!(account_id: invitation.account_id, user_id: current_user.id)
    invitation.update(used_at: Time.now)

    head :no_content
  end

  private
    def set_account_and_user
      set_account
      @user = @account.users.find(params[:id])
    end

    def set_account
      @account = current_user.accounts.find(params[:account_id])
    end

    def delete_association
      @account.user_of_accounts.where.has { |t| t.user_id == @user.id }.destroy_all
    end

    def mark_association_as_removed
      @account.user_of_accounts.where.has { |t| t.user_id == @user.id }.update(is_removed: true)
    end
end
