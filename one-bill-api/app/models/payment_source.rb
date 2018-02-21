# == Schema Information
#
# Table name: payment_sources
#
#  id         :integer          not null, primary key
#  name       :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class PaymentSource < ApplicationRecord
  validates_presence_of :name
end
