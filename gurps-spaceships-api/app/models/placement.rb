class Placement < ApplicationRecord
    belongs_to :hull
    belongs_to :system
    has_many :habitat_spaces
    has_many :weapon_mounts
    has_many :habitats, through: :habitat_spaces
    has_many :weapons, through: :weapon_mounts
    accepts_nested_attributes_for :habitat_spaces
    accepts_nested_attributes_for :weapon_mounts
end
