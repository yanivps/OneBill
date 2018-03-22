json.partial! "credit_card_transactions/credit_card_transaction", credit_card_transaction: @credit_card_transaction
json.payment do
  json.id @credit_card_transaction.payment.id
  json.amount_cents @credit_card_transaction.payment.amount_cents
  json.amount_formatted @credit_card_transaction.payment.amount.format
end
