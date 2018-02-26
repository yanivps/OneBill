def create_one_time_data
  [:electricity, :water, :property_tax].each do |category|
    Category.create!(name: category)
  end

  [:manual, :automated].each do |payment_source|
    PaymentSource.create!(name: payment_source)
  end

  [:tranzila, :braintree, :z_credit].each do |payment_processor|
    PaymentProcessor.create!(name: payment_processor)
  end

  [:visa, :mastercard, :amex].each do |credit_card_type|
    CreditCardType.create!(name: credit_card_type)
  end
end

def create_cities_and_streets(cities_count = 10, streets_per_city_count = 10, sinonim_streets_count = 3)
  1.upto(cities_count) do |i|
    city = City.create!(code: i * 10, name: Faker::Address.city)

    official_streets = []
    1.upto(streets_per_city_count) do |i|
      official_streets <<
        Street.create!(code: i * 10, name: Faker::Address.street_name,
                       official_code: i * 10, city_id: city.id)
    end

    official_streets.last(sinonim_streets_count).each do |official_street|
      Street.create!(code: official_street.code + 1, name: Faker::Address.street_name,
                     official_code: official_street.code, city_id: official_street.city_id)
    end
  end
end

def create_bills(municipality_account, bills_count: 3, bill_period_in_days: 60, due_date_interval: 15, days_to_pay_bill: 30)
  1.upto(bills_count) do |i|
    days_since_first_service_date = bill_period_in_days * bills_count

    due_date = Date.today - days_since_first_service_date + (i * bill_period_in_days) + days_to_pay_bill
    days_of_service = bill_period_in_days
    service_date = due_date - days_to_pay_bill - days_of_service

    municipality_account.bills.build(
      bill_account_number: "#{municipality_account.municipality_account_number}B#{i}",
      amount: Faker::Commerce.price, service_date: service_date, days_of_service: days_of_service,
      due_date: due_date, created_at: service_date + days_of_service )
    municipality_account.save!
  end
end

User.create!(name: 'Test User', email: 'test@email.com', password: 'test1234', phone_number: Faker::PhoneNumber.cell_phone)
User.create!(name: 'Test User2', email: 'test2@email.com', password: 'test1234', phone_number: Faker::PhoneNumber.cell_phone)
User.create!(name: 'Test User3', email: 'test3@email.com', password: 'test1234', phone_number: Faker::PhoneNumber.cell_phone)

User.create!(name: 'Test User4', email: 'test4@email.com', password: 'test1234', phone_number: Faker::PhoneNumber.cell_phone)
User.create!(name: 'Test User5', email: 'test5@email.com', password: 'test1234', phone_number: Faker::PhoneNumber.cell_phone)
User.create!(name: 'Test User6', email: 'test6@email.com', password: 'test1234', phone_number: Faker::PhoneNumber.cell_phone)

create_one_time_data
create_cities_and_streets(10)

1.upto(2) do |i|
  address = PhysicalAddress.create!(
    city: City.first, street: City.first.streets.first,
    house_number: 13, entrance: "C", apartment_number: "7")

  account = Account.new(account_number: i, owner_name: "#{Faker::Name.first_name} #{Faker::Name.last_name}",
    owner_phone: Faker::PhoneNumber.cell_phone, physical_address: address)
  account.save!

  account.users += User.all[(i-1) * 3, 3]
  account.save!

  electricity_municipality_account =
    MunicipalityAccount.new(municipality_account_number: "E#{account.account_number}", account: account, category: Category.find_by_name(:electricity))
  create_bills(electricity_municipality_account)

  water_municipality_account =
    MunicipalityAccount.create!(municipality_account_number: "W#{account.account_number}", account: account, category: Category.find_by_name(:water))
  create_bills(water_municipality_account, bill_period_in_days: 30)

  bill1, bill2, bill3 = electricity_municipality_account.bills.sample(3)
  credit_card = CreditCard.create!(card_type: CreditCardType.all.sample,
    last_4: Faker::Business.credit_card_number.split('-').last, token: nil, expires_at: 1.year.from_now, user: User.first)

  payment_date = 1.day.ago
  payment_amount = Money.new(Faker::Commerce.price(bill1.amount_cents))
  payment = Payment.create(amount: payment_amount, account: account, user: User.first,
    payment_method: credit_card, payment_source: PaymentSource.find_by_name(:manual), processing_status: :success,
    processor: PaymentProcessor.all.sample, processor_request_uid: SecureRandom.uuid, created_at: payment_date)
  PaymentApplication.create(amount: payment.amount, payment: payment, bill: bill1, created_at: payment_date)

  payment_application_amounts = [bill2.amount, Money.new(Faker::Commerce.price(bill3.amount_cents))]
  payment = Payment.create(amount: payment_application_amounts.sum, account: account, user: User.first,
    payment_method: credit_card, payment_source: PaymentSource.find_by_name(:manual), processing_status: :success,
    processor: PaymentProcessor.all.sample, processor_request_uid: SecureRandom.uuid)
  PaymentApplication.create(amount: payment_application_amounts[0], payment: payment, bill: bill2)
  PaymentApplication.create(amount: payment_application_amounts[1], payment: payment, bill: bill3)
end

Invitation.create!(phone_number: Account.first.users.first.phone_number,
  account_id: Account.last.id, token: "A_VALID_TOKEN", expires_at: 1.year.from_now)

Invitation.create!(phone_number: Account.last.users.first.phone_number,
  account_id: Account.first.id, token: "AN_EXPIRED_TOKEN", expires_at: 1.day.ago)
