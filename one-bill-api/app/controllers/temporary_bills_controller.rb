class TemporaryBillsController < ApplicationController
  before_action :verify_admin

  # GET /accounts
  def index
    @temporary_bills = TemporaryBill.all
    json_response(@temporary_bills.map(&:as_json).map(&:camelize_recursive))
  end

  def destroy
    TemporaryBill.find(params[:id]).destroy
    head :no_content
  end

  def create
    category = Category.find(temporary_bills_params[:category])
    temporary_bill = TemporaryBill.create!(temporary_bills_params.merge({category: category}))
    json_response(temporary_bill.as_json.camelize_recursive, :created)
  end

  # GET /accounts/1
  def addresses
    @addresses = PhysicalAddress.preload([:city, :street]).all.map do |addr|
      {key: addr.id, value: "#{addr.street.name} #{addr.house_number}, #{addr.city.name}"}
    end
    json_response(@addresses)
  end

  private
    def verify_admin
      raise ExceptionHandler::Forbidden, Message.not_allowed unless current_user.is_admin
    end

    def temporary_bills_params
      params.permit(:physical_address_id, :city, :street, :house_number, :entrance, :apartment_number, :municipality_account_number, :bill_number, :period_start, :period_end, :category, :amount, :pay_until)
    end
end
