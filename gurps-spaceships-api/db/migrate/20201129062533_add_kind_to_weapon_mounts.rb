class AddKindToWeaponMounts < ActiveRecord::Migration[6.0]
  def change
    add_column :weapon_mounts, :kind, :string
  end
end
