# == Schema Information
#
# Table name: accounts
#
#  id                  :integer          not null, primary key
#  account_number      :string(255)      not null
#  owner_name          :string(255)
#  owner_phone         :string(255)
#  physical_address_id :integer          not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

class Account < ApplicationRecord
  has_many :municipality_accounts
  has_many :bills, through: :municipality_accounts
  has_many :payments

  has_many :user_of_accounts, -> { where is_removed: false }
  has_many :users, :through => :user_of_accounts

  belongs_to :physical_address

  validates_presence_of :account_number

  def amount_due
    bills.preload(:payment_applications).sum(&:amount_due)
  end
end
