class CreateSystems < ActiveRecord::Migration[6.0]
  def change
    create_table :systems do |t|
      t.string :name
      t.integer :tech_level
      t.string :hull_placement, :default => "any"
      t.text :description
      t.text :modifiers
      t.integer :size_min, :default => 5
      t.integer :size_max, :default => 15
      t.text :cost
      t.boolean :wspaces, :default => true
      t.boolean :superscience, :default => false
      t.integer :high_energy, :default => 0
      t.integer :power_points, :default => 0
      t.string :fuel
      t.text :endurance
      t.boolean :suppliable, :default => false
      t.boolean :volatile, :default => false
      t.text :delta_v

      t.timestamps
    end
  end
end
