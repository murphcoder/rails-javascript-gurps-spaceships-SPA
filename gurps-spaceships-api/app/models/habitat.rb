class Habitat < ApplicationRecord
    has_many :habitat_spaces
    has_many :systems, through: :habitat_spaces
    serialize :modifiers, Hash
    serialize :cost, Hash
end
