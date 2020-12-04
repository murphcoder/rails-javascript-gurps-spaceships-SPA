class SpaceshipSerializer

    def initialize(spaceship)
        @spaceship = spaceship
    end

    def serialized_json
        options = {
            :include => {
                :hulls => {
                    :include => {
                        :placements => {
                            :include => {
                                :habitat_spaces => {:except => [:created_at, :updated_at]}, 
                                :weapon_mounts => {:except => [:created_at, :updated_at]}
                            },
                            :except => [:created_at, :updated_at]
                        }
                    }, :except => [:created_at, :updated_at]
                }, 
                :features => {:only => [:id]}, :switches => {:only => [:id]}
            }
        }
        @spaceship.to_json(options)
    end

end