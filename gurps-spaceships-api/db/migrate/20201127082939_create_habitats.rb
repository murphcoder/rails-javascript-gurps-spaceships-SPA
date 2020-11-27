class CreateHabitats < ActiveRecord::Migration[6.0]
  def change
    create_table :habitats do |t|
      t.string :name
      t.integer :size
      t.integer :tech_level
      t.boolean :superscience, :default => false
      t.text :modifiers
      t.text :description
      t.text :cost

      t.timestamps
    end
  end
end
