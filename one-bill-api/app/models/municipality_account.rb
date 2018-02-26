# == Schema Information
#
# Table name: municipality_accounts
#
#  id                          :integer          not null, primary key
#  municipality_account_number :string(255)      not null
#  account_id                  :integer          not null
#  category_id                 :integer          not null
#  created_at                  :datetime         not null
#  updated_at                  :datetime         not null
#

class MunicipalityAccount < ApplicationRecord
  belongs_to :account
  has_many :bills
  belongs_to :category

  validates_presence_of :municipality_account_number

  def amount_due
    bills.preload(:payment_applications).sum(&:amount_due)
  end
end
