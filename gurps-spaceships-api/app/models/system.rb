class System < ApplicationRecord
    serialize :modifiers, Hash
    serialize :cost, Hash
    serialize :endurance, Hash
    serialize :delta_v, Hash
    has_many :placements
    has_many :habitat_spaces
    has_many :weapon_mounts
    has_many :habitats, through: :habitat_spaces
    has_many :weapons, through: :weapon_mounts
    has_many :hulls, through: :placements
end
