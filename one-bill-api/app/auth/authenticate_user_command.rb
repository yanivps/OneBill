module AuthenticateUserCommand
  def call
    u = user
    JsonWebToken.encode(AuthenticateUserCommand.auth_token_data(u)) if u
  end

  def self.auth_token_data(u)
    { user_id: u.id, name: u.name, verified: u.is_verified, admin: u.is_admin }
  end
end
