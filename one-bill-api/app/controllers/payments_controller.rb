class PaymentsController < ApplicationController
  def index
    @payments = current_user.payments.success
  end
end
