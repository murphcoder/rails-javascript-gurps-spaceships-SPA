class CreateWeapons < ActiveRecord::Migration[6.0]
  def change
    create_table :weapons do |t|
      t.string :name
      t.string :kind
      t.boolean :superscience, :default => false
      t.integer :tech_level
      t.text :description
      t.boolean :high_energy, :default => true

      t.timestamps
    end
  end
end
