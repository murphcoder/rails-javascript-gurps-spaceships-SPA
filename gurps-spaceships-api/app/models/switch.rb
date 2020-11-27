class Switch < ApplicationRecord
    serialize :modifiers, Hash
    has_many :spaceship_switches
    has_many :spaceships, through: :spaceship_switches
end
