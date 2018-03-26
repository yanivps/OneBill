module AuthenticateUserCommand
  def call
    u = user
    JsonWebToken.encode({ user_id: u.id, name: u.name, verified: u.is_verified }) if u
  end
end
