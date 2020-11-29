class SwitchesController < ApplicationController

    def index
        switches = Switch.all
        render json: switches.to_json(except: [:description, :created_at, :updated_at])
    end

    def show
        switch = Switch.find(params[:id])
        render json: switch.to_json(except: [:created_at, :updated_at])
    end

end
