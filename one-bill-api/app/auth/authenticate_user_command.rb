module AuthenticateUserCommand
  def call
    u = user
    JsonWebToken.encode({ user_id: u.id, name: u.name }) if u
  end
end
