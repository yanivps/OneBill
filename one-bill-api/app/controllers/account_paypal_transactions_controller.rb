class AccountPaypalTransactionsController < ApplicationController
  include PaymentMethodControllerCommon
  before_action :set_account, only: [:generate_paypal_link]

  def generate_paypal_link
    raise ExceptionHandler::BadRequest, Message.missing_parameter(:return_url) if params[:return_url].blank?
    raise ExceptionHandler::BadRequest, Message.missing_parameter(:cancel_return_url) if params[:cancel_return_url].blank?
    paypal_express_url = setup_express_checkout
    json_response(paypal_express_url: paypal_express_url)
  end

  def create
    raise ExceptionHandler::BadRequest, Message.missing_parameter(:token) if params[:token].blank?
    raise ExceptionHandler::BadRequest, Message.missing_parameter(:payer_id) if params[:payer_id].blank?
    checkout_options = {
      :ip => request.remote_ip,
      :token => params[:token],
      :payer_id => params[:payer_id]
    }
    @paypal_transaction = Processors::PaypalExpress.new.checkout(checkout_options)
    create_payment_applications(@paypal_transaction.payment)
    render(:show, status: :created)
  end

  private
    def set_account
      @account = current_user.accounts.find(params[:account_id])
    end

    def setup_express_checkout
      paypal_express = Processors::PaypalExpress.new(paypal_express_processor_attributes)
      token = paypal_express.setup_purchase({
        ip: request.remote_ip,
        return_url: params[:return_url],
        cancel_return_url: params[:cancel_return_url]
      })
      PaypalTransaction.create!(token: token, user_id: current_user.id, account_id: @account.id)
      paypal_express.redirect_url_for(token)
    end

    def paypal_express_processor_attributes
      params.permit(:amount).merge(user_id: current_user.id, account_id: @account.id)
    end

end
