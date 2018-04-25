Rails.application.routes.draw do

  # User credentials login route
  post 'auth/login', to: 'authentication#authenticate'
  get 'auth/refresh_token', to: 'authentication#refresh_token'

  # OAuth login routes
  OAUTH_PROVIDERS.keys.each do |oauth_provider|
    post "auth/#{oauth_provider}", to: "authentication##{oauth_provider}_oauth"
  end

  # User credentials signup
  resources :users, only: [:create], defaults: {format: :json}
  post '/users/verify', to: 'users#verify'
  post '/users/send_verification_code_sms', to: 'users#send_verification_code_sms'

  post 'accounts/:account_id/generate_paypal_link', to: 'account_paypal_transactions#generate_paypal_link'

  resources :accounts, only: [:index, :show], defaults: {format: :json} do
    # /accounts/:account_id/users
    resources :users, only: [:index, :destroy], controller: 'account_users', defaults: {format: :json}

    # /accounts/:account_id/payments
    resources :payments, only: [:index], controller: 'account_payments', defaults: {format: :json}

    # /accounts/:account_id/credit_card_transactions
    resources :credit_card_transactions, only: [:create], controller: 'account_credit_card_transactions', defaults: {format: :json}

    # /accounts/:account_id/paypal_transactions
    resources :paypal_transactions, only: [:create], controller: 'account_paypal_transactions', defaults: {format: :json}
  end
  post 'accounts/users', to: 'account_users#create_from_invitation'

  resources :invitations, only: [:create], defaults: {format: :json}
  get 'invitations/', to: 'invitations#show', defaults: {format: :json}

  resources :payments, only: [:index], defaults: {format: :json}

  resources :credit_cards, only: [:index, :destroy], defaults: {format: :json}

  resources :temporary_bills, only: [:index, :create, :destroy], defaults: {format: :json}
  get 'temporary_bills/addresses', to: 'temporary_bills#addresses'

  post 'files/bill', to: 'file_uploader#upload_bill', defaults: {format: :json}

end
