# == Schema Information
#
# Table name: user_of_accounts
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  account_id :integer
#  is_removed :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class UserOfAccount < ApplicationRecord
  belongs_to :user
  belongs_to :account
end
