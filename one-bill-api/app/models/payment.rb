# == Schema Information
#
# Table name: payments
#
#  id                    :integer          not null, primary key
#  amount_cents          :integer          default(0), not null
#  amount_currency       :string(255)      default("ILS"), not null
#  account_id            :integer          not null
#  user_id               :integer
#  payment_method_type   :string(255)
#  payment_method_id     :integer
#  payment_source_id     :integer          not null
#  processing_status     :integer
#  payment_processor_id  :integer
#  processor_request_uid :string(255)
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#

class Payment < ApplicationRecord
  belongs_to :account
  belongs_to :user, optional: true
  belongs_to :payment_method, polymorphic: true, optional: true
  belongs_to :payment_source
  belongs_to :processor, :class_name => "PaymentProcessor", :foreign_key => "payment_processor_id", optional: true

  has_many :payment_applications

  enum processing_status: [ :pending, :failure, :success ]

  monetize :amount_cents

  validates_presence_of :amount_cents
end
