class CreatePayments < ActiveRecord::Migration[5.1]
  def change
    create_table :payments do |t|
      t.monetize :amount, null: false
      t.references :account, foreign_key: true, null: false
      t.references :user, foreign_key: true
      t.references :payment_method, polymorphic: true
      t.references :payment_source, foreign_key: true, null: false
      t.integer :status, null: false

      t.timestamps
    end
    add_index :payments, :status
  end
end
