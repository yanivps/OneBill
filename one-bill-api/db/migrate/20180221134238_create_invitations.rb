class CreateInvitations < ActiveRecord::Migration[5.1]
  def change
    create_table :invitations do |t|
      t.references :account, foreign_key: true, null: false
      t.string :phone_number
      t.string :token, null: false
      t.date :expires_at, null: false

      t.timestamps
    end
    add_index :invitations, :token, unique: true
  end
end
