class AccountCreditCardTransactionsController < ApplicationController
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

    def create_payment_applications(payment)
      payment_amount = payment.amount

      ordered_bills = @account.bills.order(:service_date).preload(:payment_applications)
      PaymentApplication.transaction do
        ordered_bills.each do |bill|
          bill_amount_due = bill.amount_due
          next if bill_amount_due == 0

          if bill_amount_due - payment_amount >= 0 # payment covers part of or the whole bill
            payment_application_amount = payment_amount
          else # payment covers more than bill amount
            payment_application_amount = bill_amount_due
          end

          payment_amount -= payment_application_amount
          PaymentApplication.create!(amount: payment_application_amount, payment: payment, bill: bill)
          break if payment_amount == 0
        end
      end
    end
end
