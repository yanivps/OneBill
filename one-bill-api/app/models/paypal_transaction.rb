# == Schema Information
#
# Table name: paypal_transactions
#
#  id                           :integer          not null, primary key
#  token                        :string(255)
#  payer                        :string(255)
#  processor_authorization_code :string(255)
#  user_id                      :integer
#  account_id                   :integer
#  unique_id                    :string(255)      not null
#  created_at                   :datetime         not null
#  updated_at                   :datetime         not null
#

class PaypalTransaction < ApplicationRecord
  include PaymentMethod

  belongs_to :user
  belongs_to :account
end
