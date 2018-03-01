class AccountPaymentsController < ApplicationController
  before_action :set_account

  def index
    user_join_date = @account.user_of_accounts.find_by_user_id(current_user.id).created_at
    @payments = @account.payments.where.has { created_at >= user_join_date }
  end

  def create
    # make a payment
    # Process with ProcessPayment simple command
  end

  private
    def set_account
      @account = current_user.accounts.find(params[:account_id])
    end
end
