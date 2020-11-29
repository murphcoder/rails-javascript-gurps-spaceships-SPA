class HabitatsController < ApplicationController

    def index
        habitats = Habitat.all
        render json: habitats.to_json(except: [:description, :created_at, :updated_at])
    end

    def show
        feature = Habitat.find(params[:id])
        render json: habitat.to_json(except: [:created_at, :updated_at])
    end

end
