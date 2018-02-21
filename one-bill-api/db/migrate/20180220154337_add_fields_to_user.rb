class AddFieldsToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :phone_number, :integer
    add_column :users, :is_verified, :boolean
    add_column :users, :verification_code, :string
  end
end
