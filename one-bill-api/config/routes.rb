Rails.application.routes.draw do

  # User credentials login route
  post 'auth/login', to: 'authentication#authenticate'

  # OAuth login routes
  OAUTH_PROVIDERS.keys.each do |oauth_provider|
    post "auth/#{oauth_provider}", to: "authentication##{oauth_provider}_oauth"
  end

  # User credentials signup
  post 'signup', to: 'users#create'

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

  resources :payments, only: [:index], defaults: {format: :json}

  resources :credit_cards, only: [:index, :destroy], defaults: {format: :json}

end
