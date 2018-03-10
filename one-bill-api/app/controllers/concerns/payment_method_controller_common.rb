module PaymentMethodControllerCommon
  def create_payment_applications(payment)
    payment_amount = payment.amount
    account = payment.account

    ordered_bills = account.bills.order(:service_date).preload(:payment_applications)
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
