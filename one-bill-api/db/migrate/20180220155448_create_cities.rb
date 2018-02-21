class CreateCities < ActiveRecord::Migration[5.1]
  def change
    create_table :cities do |t|
      t.integer :code
      t.string :name, null: false

      t.timestamps
    end
    add_index :cities, :code, unique: true
    add_index :cities, :name, unique: true
  end
end
