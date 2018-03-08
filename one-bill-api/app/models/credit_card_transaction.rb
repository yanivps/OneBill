# == Schema Information
#
# Table name: credit_card_transactions
#
#  id                           :integer          not null, primary key
#  payment_processor_id         :integer          not null
#  processor_authorization_code :string(255)
#  credit_card_id               :integer
#  processing_status            :integer          not null
#  unique_id                    :string(255)      not null
#  created_at                   :datetime         not null
#  updated_at                   :datetime         not null
#

class CreditCardTransaction < ApplicationRecord
  include PaymentMethod

  belongs_to :payment_processor
  belongs_to :credit_card, optional: true
end
