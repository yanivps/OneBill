# == Schema Information
#
# Table name: credit_card_types
#
#  id         :integer          not null, primary key
#  name       :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class CreditCardType < ApplicationRecord
  validates_presence_of :name
end
