json.(credit_card_transaction, :id, :unique_id, :created_at)
json.credit_card do
  json.last_4 credit_card_transaction.credit_card.last_4
  json.credit_card_type credit_card_transaction.credit_card.card_type.name
end if credit_card_transaction.credit_card
