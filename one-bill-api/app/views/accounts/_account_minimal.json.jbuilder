json.(account, :id, :account_number, :owner_name, :created_at)
json.amount_due_cents account.amount_due.cents
json.amount_due_formatted account.amount_due.format
json.address account.physical_address, partial: 'physical_addresses/physical_address', as: :address
