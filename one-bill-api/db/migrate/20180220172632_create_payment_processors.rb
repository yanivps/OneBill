class CreatePaymentProcessors < ActiveRecord::Migration[5.1]
  def change
    create_table :payment_processors do |t|
      t.string :name, null: false

      t.timestamps
    end
    add_index :payment_processors, :name, unique: true
  end
end
