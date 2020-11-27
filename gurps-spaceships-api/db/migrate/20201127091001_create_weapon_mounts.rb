class CreateWeaponMounts < ActiveRecord::Migration[6.0]
  def change
    create_table :weapon_mounts do |t|
      t.string :type

      t.timestamps
    end
  end
end
