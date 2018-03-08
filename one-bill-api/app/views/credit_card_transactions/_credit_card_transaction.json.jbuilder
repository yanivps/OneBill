json.(credit_card_transaction, :unique_id, :created_at)
json.credit_card do
  json.last_4 credit_card_transaction.credit_card.last_4
  json.credit_card_type credit_card_transaction.credit_card.card_type.name
end
json.payment do
  json.amount_cents credit_card_transaction.payment.amount_cents
  json.amount_formatted credit_card_transaction.payment.amount.format
end
