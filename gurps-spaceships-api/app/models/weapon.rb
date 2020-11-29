class Weapon < ApplicationRecord
    has_many :weapon_mounts
    has_many :placements, through: :weapon_mounts
end
