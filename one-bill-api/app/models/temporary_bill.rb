# == Schema Information
#
# Table name: temporary_bills
#
#  id                          :integer          not null, primary key
#  physical_address_id         :integer
#  city                        :string(255)
#  street                      :string(255)
#  house_number                :integer
#  entrance                    :string(255)
#  apartment_number            :integer
#  municipality_account_number :string(255)
#  bill_number                 :string(255)
#  period_start                :date
#  period_end                  :date
#  category_id                 :integer
#  amount_cents                :integer          default(0), not null
#  amount_currency             :string(255)      default("ILS"), not null
#  pay_until                   :date
#

class TemporaryBill < ApplicationRecord
  belongs_to :physical_address, optional: true
  belongs_to :category

  monetize :amount_cents
end
