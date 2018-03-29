# == Schema Information
#
# Table name: invitations
#
#  id           :integer          not null, primary key
#  account_id   :integer          not null
#  phone_number :string(255)      not null
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

  def self.create_invitation(account, phone_number)
    token = SecureRandom.urlsafe_base64(32, false)
    expires_at = 1.month.from_now
    invitation = Invitation.create!(phone_number: phone_number, account_id: account.id, token: token, expires_at: expires_at)

    invited_user = User.find_by_phone_number(phone_number)
    if invited_user
      SmsSender.login_to_new_account_invitation(invitation.phone_number, invitation)
    else
      SmsSender.register_invitation(invitation.phone_number, invitation)
    end
  end
end
