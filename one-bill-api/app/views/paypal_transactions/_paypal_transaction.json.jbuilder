json.(paypal_transaction, :unique_id, :payer, :created_at)
json.payment do
  json.amount_cents paypal_transaction.payment.amount_cents
  json.amount_formatted paypal_transaction.payment.amount.format
end
