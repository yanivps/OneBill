class CreateCreditCardTransactions < ActiveRecord::Migration[5.1]
  def change
    create_table :credit_card_transactions do |t|
      t.references :payment_processor, foreign_key: true, null: false
      t.string :processor_authorization_code
      t.references :credit_card, foreign_key: true
      t.string :unique_id, null: false

      t.timestamps
    end
    add_index :credit_card_transactions, :unique_id, unique: true
  end
end
