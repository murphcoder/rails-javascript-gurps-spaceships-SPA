class RemoveFieldSuppliesIdIdFromPlacements < ActiveRecord::Migration[6.0]
  def change
    remove_column :placements, :supplies_id_id, :integer
  end
end
