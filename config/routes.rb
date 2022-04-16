# frozen_string_literal: true

Rails.application.routes.draw do
  root 'home#top'
  get 'top' => 'home#top'
  get 'privacypolicy' => 'home#privacy_policy'
  get 'termsofservice' => 'home#terms_of_service'
  get 'map' => 'map#show'
  get 'steps/:route_id' => 'steps#show'
  get '*path' => 'home#redirect'
end
