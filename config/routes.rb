# frozen_string_literal: true

Rails.application.routes.draw do
  root 'home#top'
  get 'top' => 'home#top'
  get 'privacypolicy' => 'home#privacy_policy'
  get 'termsofservice' => 'home#terms_of_service'
  get 'map' => 'map#show'
  get 'terminals/index' => 'terminals#index'
  get 'steps/:route_id' => 'steps#show'
  post 'steps' => 'steps#create'
  get 'user' => 'users#index'
  post 'distances' => 'distances#create'
  post 'route' => 'route#create'
  post 'paths' => 'paths#create'
end
