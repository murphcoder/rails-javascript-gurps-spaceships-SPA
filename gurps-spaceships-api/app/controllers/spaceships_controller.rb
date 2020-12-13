class SpaceshipsController < ApplicationController

    def index
        spaceships = Spaceship.all
        render json: SpaceshipSerializer.new(spaceships).serialized_json
    end

    def show
        spaceship = Spaceship.find(params[:id])
        render json: SpaceshipSerializer.new(spaceship).serialized_json
    end

    def create
        spaceship = Spaceship.create(spaceship_params)
        render json: SpaceshipSerializer.new(spaceship).serialized_json
    end

    def update
        spaceship = Spaceship.find(params[:id])
        spaceship.update(spaceship_params)
        render json: SpaceshipSerializer.new(spaceship).serialized_json
    end

    def destroy
        spaceship = Spaceship.find(params[:id])
        spaceship.weapon_mounts.each {|weapon| weapon.destroy}
        spaceship.habitat_spaces.each {|habitat| habitat.destroy}
        spaceship.placements.each {|placement| placement.destroy}
        spaceship.spaceship_features.each {|feature| feature.destroy}
        spaceship.spaceship_switches.each {|switch| switch.destroy}
        spaceship.hulls.each {|hull| hull.destroy}
        spaceship.destroy
        spaceships = Spaceship.all
        render json: SpaceshipSerializer.new(spaceships).serialized_json
    end

    private

    def spaceship_params
        params.require(:spaceship).permit(
            :id,
            :name,
            :tech_level,
            :streamlined,
            :superscience,
            :size,
            :created_at,
            :updated_at,
            spaceship_switches: [:switch_id],
            spaceship_features: [:feature_id],
            hulls_attributes: [
                :id,
                :section,
                :spaceship_id,
                placements_attributes: [
                    :id,
                    :location,
                    :system_id,
                    :fuel,
                    :hull_id,
                    weapon_mounts_attributes: [
                        :id,
                        :weapon_id,
                        :kind,
                        :placement_id
                    ],
                    habitat_spaces_attributes: [
                        :id,
                        :habitat_id,
                        :placement_id
                    ]
                ]
            ]
        )
    
    end

end
