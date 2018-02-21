# == Schema Information
#
# Table name: payment_processors
#
#  id         :integer          not null, primary key
#  name       :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class PaymentProcessor < ApplicationRecord
  validates_presence_of :name
end
