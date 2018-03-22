json.extract! credit_card, :id, :last_4, :expires_at, :created_at
json.credit_card_type credit_card.card_type.name.titleize
