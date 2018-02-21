# == Schema Information
#
# Table name: streets
#
#  id            :integer          not null, primary key
#  code          :integer
#  name          :string(255)      not null
#  official_code :integer
#  city_id       :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Street < ApplicationRecord
  belongs_to :city

  validates_presence_of :name
end
