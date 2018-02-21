# == Schema Information
#
# Table name: bills
#
#  id                      :integer          not null, primary key
#  municipality_account_id :integer          not null
#  bill_account_number     :string(255)      not null
#  amount_cents            :integer          default(0), not null
#  amount_currency         :string(255)      default("ILS"), not null
#  service_date            :date
#  days_of_service         :integer
#  due_date                :date
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#

class Bill < ApplicationRecord
  belongs_to :municipality_account
  has_many :payment_applications

  monetize :amount_cents

  validates_presence_of :bill_account_number
  validates_presence_of :amount_cents

  alias_attribute :period_start_date, :service_date
  def period_end_date
    period_start_date + self.days_of_service
  end

  def amount_due
    self.amount - payment_applications.sum(&:amount)
  end
end
