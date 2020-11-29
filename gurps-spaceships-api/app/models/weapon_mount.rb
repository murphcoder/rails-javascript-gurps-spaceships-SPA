class WeaponMount < ApplicationRecord
    belongs_to :weapon
    belongs_to :placement
end
