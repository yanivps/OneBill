# == Schema Information
#
# Table name: invitations
#
#  id           :integer          not null, primary key
#  account_id   :integer          not null
#  phone_number :string(255)
#  token        :string(255)      not null
#  expires_at   :datetime         not null
#  used_at      :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Invitation < ApplicationRecord
  belongs_to :account

  # TODO: Change to format validation with phone number regex
  validates :phone_number, presence: true

  validates_presence_of :token
  validates_presence_of :expires_at
end
