class WeaponsController < ApplicationController

    def index
        weapons = Weapon.all
        render json: weapons.to_json(except: [:description, :created_at, :updated_at])
    end

    def show
        weapon = Weapon.find(params[:id])
        render json: weapon.to_json(except: [:created_at, :updated_at])
    end
end
