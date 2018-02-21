class CreatePhysicalAddresses < ActiveRecord::Migration[5.1]
  def change
    create_table :physical_addresses do |t|
      t.references :city, foreign_key: true, null: false
      t.references :street, foreign_key: true, null: false
      t.integer :house_number, null: false
      t.string :entrance
      t.integer :apartment_number

      t.timestamps
    end
  end
end
