module Processors
  module PaymentProcessorCommon
    extend ActiveSupport::Concern

    included do
      attr_accessor :amount
      attr_accessor :account_id
      attr_accessor :user_id
    end

    private
      def create_payment_for_transaction(transaction)
        Payment.transaction do
          validate_amount
          transaction.save!
          Payment.create!(account_id: account_id, user_id: user_id, amount: amount, status: :pending,
            payment_method: transaction, payment_source: PaymentSource.find_by_name(:manual))
        end
        transaction.reload.payment
      end

      def validate_amount
        raise ExceptionHandler::InvalidOperation, Message.invalid_min_payment_amount(0) if amount <= 0

        account = Account.lock.find(account_id)
        Account.uncached do
          account_amount_due_with_pending_payments = account.amount_due_with_pending_payments
          if amount > account_amount_due_with_pending_payments
            raise ExceptionHandler::InvalidOperation, Message.invalid_max_payment_amount(account_amount_due_with_pending_payments.format)
          end
        end
      end
  end
end
