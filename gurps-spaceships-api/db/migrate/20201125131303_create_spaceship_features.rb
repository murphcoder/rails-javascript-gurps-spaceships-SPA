class CreateSpaceshipFeatures < ActiveRecord::Migration[6.0]
  def change
    create_table :spaceship_features do |t|
      t.belongs_to :spaceship
      t.belongs_to :feature

      t.timestamps
    end
  end
end
