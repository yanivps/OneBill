class CreatePaymentApplications < ActiveRecord::Migration[5.1]
  def change
    create_table :payment_applications do |t|
      t.monetize :amount, null: false
      t.references :payment, foreign_key: true, null: false
      t.references :bill, foreign_key: true, null: false

      t.timestamps
    end
  end
end
