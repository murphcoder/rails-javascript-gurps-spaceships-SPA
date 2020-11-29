class FeaturesController < ApplicationController

    def index
        features = Feature.all
        render json: features.to_json(except: [:description, :created_at, :updated_at])
    end

    def show
        feature = Feature.find(params[:id])
        render json: feature.to_json(except: [:created_at, :updated_at])
    end

end
