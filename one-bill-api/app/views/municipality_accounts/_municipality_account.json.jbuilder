json.(municipality_account, :id, :municipality_account_number)
json.category municipality_account.category.name.titleize
json.bills municipality_account.bills, partial: 'bills/bill', as: :bill
