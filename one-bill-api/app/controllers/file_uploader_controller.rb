class FileUploaderController < ApplicationController
  def upload_bill
    if TemporaryBill.count == 0
      raise ExceptionHandler::InternalError, { message: :internal_error, description: 'Internal OCR error' }.to_json
    end

    begin
      TemporaryBill.transaction do
        temp_bill = TemporaryBill.first
        if temp_bill.physical_address_id.present?
          account = Account.find_by_physical_address_id temp_bill.physical_address_id
        else
          city = City.create!(code: City.last.code + 1, name: temp_bill.city)
          street_code = Street.last.code + 1
          street = Street.create!(code: street_code + 1, name: temp_bill.street, official_code: street_code, city_id: city.id)

          address = PhysicalAddress.create!(
            city: city, street: street,
            house_number: temp_bill.house_number, entrance: temp_bill.entrance, apartment_number: temp_bill.apartment_number)
          account = Account.new(
            account_number: Account.last.id + 1, physical_address: address)
          account.save!
        end
        if account.users.where(:id => current_user.id).blank?
          account.users << current_user
          account.save!
        end

        municipality_account = MunicipalityAccount.new(
          municipality_account_number: temp_bill.municipality_account_number,
          account: account, category: Category.find(temp_bill.category_id))
        municipality_account.bills.build(bill_account_number: temp_bill.bill_number,
          amount: temp_bill.amount, service_date: temp_bill.period_start, days_of_service: (temp_bill.period_end - temp_bill.period_start).to_i,
          due_date: temp_bill.pay_until)

        municipality_account.save!
        temp_bill.destroy
      end
    rescue Exception => e
      puts e
      raise e
    end

  end
end
