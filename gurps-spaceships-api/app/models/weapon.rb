class Weapon < ApplicationRecord
    has_many :weapon_mounts
    has_many :systems, through: :weapon_mounts
end
