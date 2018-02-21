# == Schema Information
#
# Table name: cities
#
#  id         :integer          not null, primary key
#  code       :integer
#  name       :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class City < ApplicationRecord
  has_many :streets

  validates_presence_of :name
end
