json.(bill, :bill_account_number, :amount_cents,
  :days_of_service, :created_at)
json.period_start_date bill.period_start_date.strftime("%d/%m/%Y")
json.period_end_date bill.period_end_date.strftime("%d/%m/%Y")
json.due_date bill.due_date.strftime("%d/%m/%Y")
json.amount_formatted bill.amount.format
json.amount_due_cents bill.amount_due.cents
json.amount_due_formatted bill.amount_due.format
