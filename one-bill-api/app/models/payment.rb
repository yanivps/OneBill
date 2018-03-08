# == Schema Information
#
# Table name: payments
#
#  id                  :integer          not null, primary key
#  amount_cents        :integer          default(0), not null
#  amount_currency     :string(255)      default("ILS"), not null
#  account_id          :integer          not null
#  user_id             :integer
#  payment_method_type :string(255)
#  payment_method_id   :integer
#  payment_source_id   :integer          not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

class Payment < ApplicationRecord
  scope :non_failed, -> { where.not(status: :failure) }

  belongs_to :account
  belongs_to :user, optional: true
  belongs_to :payment_method, polymorphic: true, optional: true
  belongs_to :payment_source

  has_many :payment_applications, dependent: :destroy

  monetize :amount_cents

  enum status: [ :pending, :failure, :success ]

  validates_presence_of :amount_cents

end
