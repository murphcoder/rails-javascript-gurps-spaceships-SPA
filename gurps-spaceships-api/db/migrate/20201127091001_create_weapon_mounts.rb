class CreateWeaponMounts < ActiveRecord::Migration[6.0]
  def change
    create_table :weapon_mounts do |t|
      t.string :kind
      t.belongs_to :weapon
      t.belongs_to :placement

      t.timestamps
    end
  end
end
