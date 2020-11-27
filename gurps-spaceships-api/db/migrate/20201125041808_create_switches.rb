class CreateSwitches < ActiveRecord::Migration[6.0]
  def change
    create_table :switches do |t|
      t.string :name
      t.boolean :superscience, :default => false
      t.text :modifiers
      t.text :description

      t.timestamps
    end
  end
end
