json.partial! "account_payments/account_payment", payment: payment
json.(payment, :payment_method_type)

if payment.payment_method_type == "CreditCardTransaction"
  json.payment_method(payment.payment_method,
    partial: 'credit_card_transactions/credit_card_transaction', as: :credit_card_transaction)
end
