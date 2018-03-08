module PaymentMethod
  extend ActiveSupport::Concern

  included do
    has_one :payment, :inverse_of => :payment_method, :foreign_key => :payment_method_id, as: :payment_method

    before_create :set_unique_id
  end

  def set_unique_id
    config = Rails.configuration.x.payment_transactions.unique_ids_initial_values[self.class.name]
    raise "Could not find Rails.configuration.payment_transactions.unique_ids_initial_values[#{self.class.name}]" unless config
    last_transaction = self.class.last
    tran_id = last_transaction ? last_transaction.id : 0
    self.unique_id = config[:prefix] + (config[:initial_value] + tran_id + 1).to_s
  end
end
