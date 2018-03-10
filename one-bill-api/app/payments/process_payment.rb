class ProcessPayment
  def initialize(payment_processor_attributes)
    @payment_processor = Processors::FirstData.new(payment_processor_attributes)
    @account = payment_processor_attributes[:account]
    @credit_card = payment_processor_attributes[:credit_card]
    @store_card = payment_processor_attributes[:store_card]
  end

  def call
    if @credit_card
      @payment_processor.process_with_credit_card_token(@credit_card)
    else
      @payment_processor.process(store_card: @store_card)
    end
  end
end
