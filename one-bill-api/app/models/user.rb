class User < ApplicationRecord
  # encrypt password
  has_secure_password

  # validations
  validates_presence_of :name, :email, :password_digest, :password_confirmation
  validates :email, uniqueness: { scope: :provider }
  validates :uid, uniqueness: { scope: :provider }
  validates :password, length: { minimum: 6 }, allow_nil: true

  # callbacks
  before_create :default_uid_with_email

  def default_uid_with_email
    self.uid ||= self.email
  end
end
