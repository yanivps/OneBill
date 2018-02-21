class CreateStreets < ActiveRecord::Migration[5.1]
  def change
    create_table :streets do |t|
      t.integer :code
      t.string :name, null: false
      t.integer :official_code
      t.references :city, foreign_key: true, null: false

      t.timestamps
    end
    add_index :streets, [:city_id, :code], unique: true
    add_index :streets, :code
  end
end
