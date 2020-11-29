class SystemsController < ApplicationController

    def index
        systems = System.all
        render json: systems.to_json(except: [:description, :created_at, :updated_at])
    end

    def show
        system = System.find(params[:id])
        render json: system.to_json(except: [:created_at, :updated_at])
    end

end
