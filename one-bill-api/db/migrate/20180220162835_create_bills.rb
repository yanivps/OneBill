class CreateBills < ActiveRecord::Migration[5.1]
  def change
    create_table :bills do |t|
      t.references :municipality_account, foreign_key: true, null: false
      t.string :bill_account_number, null: false
      t.monetize :amount, null: false
      t.date :service_date
      t.integer :days_of_service
      t.date :due_date

      t.timestamps
    end
    add_index :bills, [:municipality_account_id, :bill_account_number], unique: true
  end
end
