class System < ApplicationRecord
    serialize :modifiers, Hash
    serialize :cost, Hash
    serialize :endurance, Hash
    serialize :delta_v, Hash
    has_many :placements
    has_many :hulls, through: :placements
end
