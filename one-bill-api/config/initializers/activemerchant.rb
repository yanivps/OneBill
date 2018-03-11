if Rails.env == "development"
  ActiveMerchant::Billing::FirstdataE4Gateway.wiredump_device = File.open(Rails.root.join("log","active_merchant.log"), "a+")
  ActiveMerchant::Billing::FirstdataE4Gateway.wiredump_device.sync = true
  ActiveMerchant::Billing::Base.mode = :test

  login = ENV['FIRSTDATA_LOGIN_TEST']
  password = ENV['FIRSTDATA_PASSWORD_TEST']

  paypal_login = ENV['PAYPAL_USERNAME_TEST']
  paypal_password = ENV['PAYPAL_PASSWORD_TEST']
  paypal_signature = ENV['PAYPAL_SIGNATURE_TEST']
elsif Rails.env == "production"
  login = ENV['FIRSTDATA_LOGIN']
  password = ENV['FIRSTDATA_PASSWORD']

  paypal_login = ENV['PAYPAL_USERNAME']
  paypal_password = ENV['PAYPAL_PASSWORD']
  paypal_signature = ENV['PAYPAL_SIGNATURE']
end

FIRST_DATA_GATEWAY = ActiveMerchant::Billing::FirstdataE4Gateway.new({
      login: login,
      password: password
})


PAYPAL_GATEWAY = ActiveMerchant::Billing::PaypalExpressGateway.new({
      login: paypal_login,
      password: paypal_password,
      signature: paypal_signature
})
