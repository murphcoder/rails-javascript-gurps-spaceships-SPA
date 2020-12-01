class SpaceshipsController < ApplicationController

    def index
        user = User.find(params[:user_id])
        spaceships = user.spaceships
        render json: spaceships.to_json(only: [:id, :name, :superscience, :tech_level, :created_at, :updated_at])
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
        redirect_to _spaceships_path
    end

    private

    def spaceship_params
        params.require(:spaceship).permit(
            :name,
            :tech_level,
            :streamlined,
            :superscience,
            :size,
            :user_id,
            spaceship_switches_attributes: [:switch_id],
            spaceship_features_attributes: [:feature_id],
            hulls_attributes: [
                :section,
                placements_attributes: [
                    :location,
                    :system_id,
                    :fuel,
                    weapon_mount_attributes: [
                        :weapon_id,
                        :kind,
                    ],
                    habitat_spaces_attributes: [
                        habitat_id
                    ]
                ]
            ]
        )
    end

end
