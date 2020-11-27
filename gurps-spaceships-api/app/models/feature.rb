class Feature < ApplicationRecord
    serialize :modifiers, Hash
    serialize :cost, Hash
    has_many :spaceship_features
    has_many :spaceships, through: :spaceship_features
end
