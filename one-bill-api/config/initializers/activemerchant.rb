if Rails.env == "development"
  ActiveMerchant::Billing::FirstdataE4Gateway.wiredump_device = File.open(Rails.root.join("log","active_merchant.log"), "a+")
  ActiveMerchant::Billing::FirstdataE4Gateway.wiredump_device.sync = true
  ActiveMerchant::Billing::Base.mode = :test

  login = ENV['FIRSTDATA_LOGIN_TEST']
  password = ENV['FIRSTDATA_PASSWORD_TEST']
elsif Rails.env == "production"
  login = ENV['FIRSTDATA_LOGIN']
  password = ENV['FIRSTDATA_PASSWORD']
end

GATEWAY = ActiveMerchant::Billing::FirstdataE4Gateway.new({
      login: login,
      password: password
})
