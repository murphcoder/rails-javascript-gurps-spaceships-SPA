class AddFuelToPlacements < ActiveRecord::Migration[6.0]
  def change
    add_column :placements, :fuel, :string
  end
end
