class AccountCreditCardTransactionsController < ApplicationController
  include PaymentMethodControllerCommon
  before_action :set_account
  before_action :set_credit_card

  def create
    # make a payment
    @credit_card_transaction = ProcessPayment.new(payment_processor_params.merge(
      account_id: @account.id, user_id: current_user.id, credit_card: @credit_card, account: @account)).call
    create_payment_applications(@credit_card_transaction.payment)
    render(:show, status: :created)
  end

  private
    def set_account
      @account = current_user.accounts.find(params[:account_id])
    end

    def set_credit_card
      if params[:credit_card_id]
        @credit_card = current_user.credit_cards.find(params[:credit_card_id])
      end
    end

    def payment_processor_params
      params.permit(:first_name, :last_name, :credit_card_number, :expiration_month, :expiration_year, :card_security_code, :amount, :store_card)
    end
end
