class CreatePaypalTransactions < ActiveRecord::Migration[5.1]
  def change
    create_table :paypal_transactions do |t|
      t.string :token
      t.string :payer
      t.string :processor_authorization_code
      t.references :user, foreign_key: true
      t.references :account, foreign_key: true
      t.string :unique_id, null: false

      t.timestamps
    end
    add_index :paypal_transactions, :token, unique: true
    add_index :paypal_transactions, :unique_id, unique: true
  end
end
