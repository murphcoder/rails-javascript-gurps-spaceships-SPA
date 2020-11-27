class CreateFeatures < ActiveRecord::Migration[6.0]
  def change
    create_table :features do |t|
      t.string :name
      t.integer :tech_level
      t.text :modifiers
      t.text :description
      t.boolean :superscience, :default => false
      t.text :cost
      t.integer :size_min, :default => 5
      t.integer :size_max, :default => 15

      t.timestamps
    end
  end
end
