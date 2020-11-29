class RemoveSuppliesFromPlacements < ActiveRecord::Migration[6.0]
  def change
    remove_column :placements, :supplies_id, :integer
  end
end