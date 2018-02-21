class CreatePayments < ActiveRecord::Migration[5.1]
  def change
    create_table :payments do |t|
      t.monetize :amount, null: false
      t.references :account, foreign_key: true, null: false
      t.references :user, foreign_key: true
      t.references :payment_method, polymorphic: true
      t.references :payment_source, foreign_key: true, null: false
      t.integer :processing_status
      t.references :payment_processor, foreign_key: true
      t.string :processor_request_uid

      t.timestamps
    end
  end
end
