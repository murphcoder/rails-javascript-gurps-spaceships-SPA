class CreateHulls < ActiveRecord::Migration[6.0]
  def change
    create_table :hulls do |t|
      t.string :section
      t.belongs_to :spaceship

      t.timestamps
    end
  end
end
