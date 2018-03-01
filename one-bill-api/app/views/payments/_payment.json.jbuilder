json.(payment, :id, :amount_cents, :payment_method_type, :created_at, :updated_at)
json.amount_formatted payment.amount.format

json.account do
  json.(payment.account, :id, :account_number, :owner_name, :created_at)
  json.address payment.account.physical_address, partial: 'physical_addresses/physical_address', as: :address
end

if payment.payment_method_type == "CreditCard"
  json.payment_method do
    json.last_4 payment.payment_method.last_4
    json.credit_card_type payment.payment_method.card_type.name
  end
end
