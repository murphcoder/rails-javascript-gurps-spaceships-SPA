class Spaceship < ApplicationRecord
    belongs_to :user
    has_many :hulls
    has_many :spaceship_features
    has_many :spaceship_switches
    has_many :features, through: :spaceship_features
    has_many :switches, through: :spaceship_switches
    has_many :systems, through: :hulls
    accepts_nested_values_for :hulls
    accepts_nested_values_for :spaceship_features
    accepts_nested_values_for :spaceship_switches

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
