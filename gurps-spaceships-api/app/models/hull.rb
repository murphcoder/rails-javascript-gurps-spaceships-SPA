class Hull < ApplicationRecord
    belongs_to :spaceship
    has_many :placements
    has_many :systems, through: :placements
    accepts_nested_attributes_for :placements
    validate :section_names

    private

    def section_names
        sections = ["front", "center", "rear"]
        if !sections.include?(self.section)
            self.errors[:hull] << "section must be Front, Center, or Rear."
        end
    end
end
