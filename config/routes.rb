# frozen_string_literal: true

Rails.application.routes.draw do
  root 'home#index'

  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'log_out', to: 'sessions#destroy', as: 'log_out'

  resources :sessions, only: %i[create destroy]

  get 'map', to: 'map#show'
  post 'distances' => 'distances#create'
  post 'route' => 'route#create'
  post 'steps' => 'steps#create'
  post 'paths' => 'paths#create'
  get 'steps' => 'steps#show'
end
