class CreateHabitatSpaces < ActiveRecord::Migration[6.0]
  def change
    create_table :habitat_spaces do |t|
      t.belongs_to :habitat
      t.belongs_to :placement

      t.timestamps
    end
  end
end
