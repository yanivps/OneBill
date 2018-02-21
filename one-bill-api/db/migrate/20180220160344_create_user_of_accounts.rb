class CreateUserOfAccounts < ActiveRecord::Migration[5.1]
  def change
    create_table :user_of_accounts do |t|
      t.references :user, foreign_key: true
      t.references :account, foreign_key: true
      t.boolean :is_removed, null: false, default: false

      t.timestamps
    end
    add_index :user_of_accounts, [:account_id, :user_id], unique: true
  end
end
