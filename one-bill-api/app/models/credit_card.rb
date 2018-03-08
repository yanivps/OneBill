# == Schema Information
#
# Table name: credit_cards
#
#  id                  :integer          not null, primary key
#  credit_card_type_id :integer          not null
#  last_4              :string(4)        not null
#  token               :string(255)
#  expires_at          :date             not null
#  user_id             :integer
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

class CreditCard < ApplicationRecord
  belongs_to :card_type, :class_name => "CreditCardType", :foreign_key => "credit_card_type_id"
  belongs_to :user, optional: true

  validates :last_4, presence: true, length: { is: 4 }
  validates_presence_of :expires_at
end
