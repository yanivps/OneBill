class AddFieldsToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :phone_number, :string, null: false
    add_column :users, :is_verified, :boolean
    add_column :users, :verification_code, :string
    add_index :users, :phone_number, unique: true
  end
end
