class AccountsController < ApplicationController
  before_action :set_account, only: [:show]

  # GET /accounts
  def index
    @accounts = current_user.accounts
    @accounts = @accounts.select{ |acc| acc.amount_due > 0 }
  end

  # GET /accounts/1
  def show
  end

  private
    def set_account
      @account = current_user.accounts.find(params[:id])
    end
end
