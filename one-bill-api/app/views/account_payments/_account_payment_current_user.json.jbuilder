json.partial! "account_payments/account_payment", payment: payment
json.(payment, :payment_method_type)

if payment.payment_method_type == "CreditCard"
  json.payment_method do
    json.last_4 payment.payment_method.last_4
    json.credit_card_type payment.payment_method.card_type.name
  end
end
