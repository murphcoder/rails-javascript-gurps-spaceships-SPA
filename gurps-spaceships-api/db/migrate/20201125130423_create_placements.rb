class CreatePlacements < ActiveRecord::Migration[6.0]
  def change
    create_table :placements do |t|
      t.integer :location
      t.belongs_to :hull
      t.belongs_to :system
      t.belongs_to :supplies, :class_name => "Placement", :optional => true

      t.timestamps
    end
  end
end
