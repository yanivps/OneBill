json.(payment, :id, :amount_cents, :user_id, :created_at, :updated_at)
json.amount_formatted payment.amount.format
