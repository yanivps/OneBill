# == Schema Information
#
# Table name: physical_addresses
#
#  id               :integer          not null, primary key
#  city_id          :integer          not null
#  street_id        :integer          not null
#  house_number     :integer          not null
#  entrance         :string(255)
#  apartment_number :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class PhysicalAddress < ApplicationRecord
  belongs_to :city
  belongs_to :street
  has_one :account

  validates_presence_of :house_number
end
