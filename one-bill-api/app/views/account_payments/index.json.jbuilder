json.array! @payments do |payment|
  if payment.user_id == @current_user.id
    json.partial! "account_payments/account_payment_current_user", payment: payment
  else
    json.partial! "account_payments/account_payment", payment: payment
  end
end
