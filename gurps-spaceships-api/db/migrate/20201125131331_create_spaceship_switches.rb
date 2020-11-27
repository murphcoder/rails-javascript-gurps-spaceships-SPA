class CreateSpaceshipSwitches < ActiveRecord::Migration[6.0]
  def change
    create_table :spaceship_switches do |t|
      t.belongs_to :spaceship
      t.belongs_to :switch

      t.timestamps
    end
  end
end
