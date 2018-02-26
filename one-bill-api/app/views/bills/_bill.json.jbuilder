json.(bill, :bill_account_number, :amount_cents, :service_date,
  :days_of_service, :due_date, :created_at)
json.amount_formatted bill.amount.format
