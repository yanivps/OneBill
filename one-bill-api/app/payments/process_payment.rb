class ProcessPayment
  def initialize(payment_processor_attributes)
    @payment_processor = Processors::FirstData.new(payment_processor_attributes)
    @account = payment_processor_attributes[:account]
    @credit_card = payment_processor_attributes[:credit_card]
    @store_card = payment_processor_attributes[:store_card]

    validate_amount(payment_processor_attributes[:amount])
  end

  def call
    if @credit_card
      @payment_processor.process_with_credit_card_token(@credit_card)
    else
      @payment_processor.process(store_card: @store_card)
    end
  end

  private
    def validate_amount(amount)
      if Money.from_amount(amount) <= 0
        raise ExceptionHandler::InvalidOperation, Message.invalid_min_payment_amount(0)
      end

      if Money.from_amount(amount) > @account.amount_due_with_pending_payments
        raise ExceptionHandler::InvalidOperation, Message.invalid_max_payment_amount(@account.amount_due.format)
      end
    end
end
