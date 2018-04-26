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
  # TODO: remove Base.mode = :test when working in real production environment
  ActiveMerchant::Billing::Base.mode = :test
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




# ActiveMerchant SSL Patch (For Heroku)
module ActiveMerchant
  class Connection
    def configure_ssl(http)
      return unless endpoint.scheme == "https"

      http.use_ssl = true

      if verify_peer
        http.verify_mode = OpenSSL::SSL::VERIFY_PEER
        # Fix SSLv3 failure
        # http.ca_file     = File.dirname(__FILE__) + '/../../certs/cacert.pem'
      else
        http.verify_mode = OpenSSL::SSL::VERIFY_NONE
      end
    end
  end
end
