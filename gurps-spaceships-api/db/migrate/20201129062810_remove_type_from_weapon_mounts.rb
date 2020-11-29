class RemoveTypeFromWeaponMounts < ActiveRecord::Migration[6.0]
  def change
    remove_column :weapon_mounts, :type, :string
  end
end
