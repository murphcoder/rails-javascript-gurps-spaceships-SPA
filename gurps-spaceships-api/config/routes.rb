Rails.application.routes.draw do
  resources :habitat_spaces
  resources :weapon_mounts
  resources :weapons
  resources :habitats
  resources :spaceship_switches
  resources :spaceship_features
  resources :placements
  resources :switches
  resources :features
  resources :systems
  resources :hulls
  resources :users
  resources :spaceships
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
