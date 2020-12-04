class Spaceship < ApplicationRecord
    has_many :hulls
    has_many :spaceship_features
    has_many :spaceship_switches
    has_many :features, through: :spaceship_features
    has_many :switches, through: :spaceship_switches
    has_many :placements, through: :hulls
    has_many :systems, through: :placements
    has_many :weapon_mounts, through: :placements
    has_many :habitat_spaces, through: :placements
    accepts_nested_attributes_for :hulls
    accepts_nested_attributes_for :spaceship_features
    accepts_nested_attributes_for :spaceship_switches

    def front
        self.hulls.select {|hull| hull.section == "front"}.first
    end

    def center
        self.hulls.select {|hull| hull.section == "center"}.first
    end

    def rear
        self.hulls.select {|hull| hull.section == "rear"}.first
    end

end
