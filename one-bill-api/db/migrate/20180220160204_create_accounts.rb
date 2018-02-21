class CreateAccounts < ActiveRecord::Migration[5.1]
  def change
    create_table :accounts do |t|
      t.string :account_number, null: false
      t.string :owner_name
      t.string :owner_phone
      t.references :physical_address, foreign_key: true, null: false

      t.timestamps
    end
    add_index :accounts, :account_number, unique: true
  end
end
