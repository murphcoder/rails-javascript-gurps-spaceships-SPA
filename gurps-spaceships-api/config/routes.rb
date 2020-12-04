Rails.application.routes.draw do
  resources :weapons, only: [:index, :show]
  resources :habitats, only: [:index, :show]
  resources :switches, only: [:index, :show]
  resources :features, only: [:index, :show]
  resources :systems, only: [:index, :show]
  resources :spaceships
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
