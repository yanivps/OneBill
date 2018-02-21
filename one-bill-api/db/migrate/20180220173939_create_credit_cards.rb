class CreateCreditCards < ActiveRecord::Migration[5.1]
  def change
    create_table :credit_cards do |t|
      t.references :credit_card_type, foreign_key: true, null: false
      t.string :last_4, limit: 4, null: false
      t.string :token
      t.date :expires_at, null: false
      t.references :user, foreign_key: true, null: false

      t.timestamps
    end
  end
end
