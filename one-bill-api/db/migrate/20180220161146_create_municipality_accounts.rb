class CreateMunicipalityAccounts < ActiveRecord::Migration[5.1]
  def change
    create_table :municipality_accounts do |t|
      t.string :municipality_account_number, null: false
      t.references :account, foreign_key: true, null: false
      t.references :category, foreign_key: true, null: false

      t.timestamps
    end
    add_index :municipality_accounts, [:account_id, :municipality_account_number], unique: true, name: "index_municipality_accounts_on_account_id_and_account_number"
  end
end
