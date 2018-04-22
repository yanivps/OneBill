require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
# require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module OneBillApi
  class Application < Rails::Application
    config.autoload_paths << "#{Rails.root}/app/auth/providers"
    config.autoload_paths << "#{Rails.root}/app/payments/processors"
    config.autoload_paths << "#{Rails.root}/app/lib/core_extensions"

    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true

    Jbuilder.key_format camelize: :lower

    config.x.payment_transactions.unique_ids_initial_values = {
      "CreditCardTransaction" => { prefix: '1', initial_value: 1000 },
      "PaypalTransaction" => { prefix: '2', initial_value: 1000 }
    }

    if Rails.env.production?
      config.x.invitation_urls = {
        register: "https://yanivps.github.io/OneBill/invitation/signup/",
        login: "https://yanivps.github.io/OneBill/invitation/"
      }
    else
      config.x.invitation_urls = {
        register: "http://localhost:4200/invitation/signup/",
        login: "http://localhost:4200/invitation/"
      }
    end
  end
end
