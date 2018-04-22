class CreateTemporaryBill < ActiveRecord::Migration[5.1]
  def change
    create_table :temporary_bills do |t|
      t.references :physical_address, foreign_key: true
      t.string :city
      t.string :street
      t.integer :house_number
      t.string :entrance
      t.integer :apartment_number
      t.string :municipality_account_number
      t.string :bill_number
      t.date :period_start
      t.date :period_end
      t.references :category, foreign_key: true
      t.monetize :amount
      t.date :pay_until
    end
  end
end
