# frozen_string_literal: true

Rails.application.routes.draw do
  root 'home#index'
  get 'top' => 'home#top'
  get 'privacypolicy' => 'home#privacy_policy'
  get 'termsofservice' => 'home#terms_of_service'
  get 'map' => 'map#show'
  get 'steps' => 'steps#show'
  post 'steps' => 'steps#create'
  get 'terminals/index' => 'terminals#index'
  get 'user' => 'users#index'
  post 'distances' => 'distances#create'
  post 'route' => 'route#create'
  post 'paths' => 'paths#create'
end
