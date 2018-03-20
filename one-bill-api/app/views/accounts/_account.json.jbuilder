json.(account, :id, :account_number, :owner_name, :created_at)
json.address account.physical_address, partial: 'physical_addresses/physical_address', as: :address
json.amount_due_cents account.amount_due.cents
json.amount_due_formatted account.amount_due.format

json.currency_code account.amount_due.currency.iso_code

json.municipality_accounts account.municipality_accounts, partial: 'municipality_accounts/municipality_account', as: :municipality_account
