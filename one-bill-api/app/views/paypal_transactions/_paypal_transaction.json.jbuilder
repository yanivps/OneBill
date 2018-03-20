json.(paypal_transaction, :id, :unique_id, :payer, :created_at)
json.payment do
  json.id paypal_transaction.payment.id
  json.amount_cents paypal_transaction.payment.amount_cents
  json.amount_formatted paypal_transaction.payment.amount.format
end
