json.(payment, :id, :amount_cents, :payment_method_type, :created_at, :updated_at)
json.amount_formatted payment.amount.format

json.account do
  json.(payment.account, :id, :account_number, :owner_name, :created_at)
  json.address payment.account.physical_address, partial: 'physical_addresses/physical_address', as: :address
end

if payment.payment_method_type == "CreditCardTransaction"
  json.payment_method(payment.payment_method,
    partial: 'credit_card_transactions/credit_card_transaction', as: :credit_card_transaction)
end

if payment.payment_method_type == "PaypalTransaction"
  json.payment_method(payment.payment_method,
    partial: 'paypal_transactions/paypal_transaction', as: :paypal_transaction)
end
