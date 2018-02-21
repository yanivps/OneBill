class CreateCreditCardTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :credit_card_types do |t|
      t.string :name, null: false

      t.timestamps
    end
    add_index :credit_card_types, :name, unique: true
  end
end
