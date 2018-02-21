# == Schema Information
#
# Table name: payment_applications
#
#  id              :integer          not null, primary key
#  amount_cents    :integer          default(0), not null
#  amount_currency :string(255)      default("ILS"), not null
#  payment_id      :integer          not null
#  bill_id         :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class PaymentApplication < ApplicationRecord
  belongs_to :payment
  belongs_to :bill

  monetize :amount_cents

  validates_presence_of :amount_cents
end
