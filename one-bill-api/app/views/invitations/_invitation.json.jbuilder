json.(invitation, :id, :phone_number, :used_at, :created_at)
json.account invitation.account, :id, :account_number
json.invited_user_id @invited_user ? @invited_user.id : nil
