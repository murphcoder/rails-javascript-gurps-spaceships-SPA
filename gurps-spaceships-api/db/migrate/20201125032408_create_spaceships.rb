class CreateSpaceships < ActiveRecord::Migration[6.0]
  def change
    create_table :spaceships do |t|
      t.string :name
      t.integer :tech_level
      t.integer :size
      t.boolean :streamlined
      t.boolean :superscience

      t.timestamps
    end
  end
end
