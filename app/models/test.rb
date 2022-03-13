# frozen_string_literal: true

class Test < ApplicationRecord
  root 'tests#index'
  resources :tests, only: %i[index create]
end
