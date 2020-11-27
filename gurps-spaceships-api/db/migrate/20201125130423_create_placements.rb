class CreatePlacements < ActiveRecord::Migration[6.0]
  def change
    create_table :placements do |t|
      t.integer :section
      t.belongs_to :hull
      t.belongs_to :system
      t.belongs_to :supplies, :class_name => "System"

      t.timestamps
    end
  end
end
