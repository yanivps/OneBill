class CreatePaymentSources < ActiveRecord::Migration[5.1]
  def change
    create_table :payment_sources do |t|
      t.string :name, null: false

      t.timestamps
    end
    add_index :payment_sources, :name, unique: true
  end
end
