class Placement < ApplicationRecord
    belongs_to :hull
    belongs_to :system
    has_many :habitat_spaces
    has_many :weapon_mounts
    has_many :habitats, through: :habitat_spaces
    has_many :weapons, through: :weapon_mounts
    accepts_nested_attributes_for :habitat_spaces
    accepts_nested_attributes_for :weapon_mounts
    validates_uniqueness_of :location, scope: :hull_id
    before_validation :remove_old_record

    def remove_old_record
        if Placement.all.any? {|p| p.location == self.location && p.hull_id == self.hull_id}
            old_p = Placement.find_by(hull_id: self.hull_id, location: self.location)
            self.id = old_p.id
            old_p.destroy
        end
    end

end
