# == Schema Information
#
# Table name: users
#
#  id                :integer          not null, primary key
#  name              :string(255)
#  email             :string(255)
#  password_digest   :string(255)
#  provider          :string(255)      default("email"), not null
#  uid               :string(255)      not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  phone_number      :string(255)      not null
#  is_verified       :boolean
#  verification_code :string(255)
#

class User < ApplicationRecord
  # encrypt password
  has_secure_password

  has_many :user_of_accounts
  has_many :accounts, :through => :user_of_accounts
  has_many :payments
  has_many :credit_cards

  # validations
  validates_presence_of :name, :email, :password_digest
  validates :email, uniqueness: { scope: :provider }, email: true
  validates :uid, uniqueness: { scope: :provider }
  validates :password, length: { minimum: 6 }, allow_nil: true

  # callbacks
  before_create :default_uid_with_email

  def default_uid_with_email
    self.uid ||= self.email
  end
end
