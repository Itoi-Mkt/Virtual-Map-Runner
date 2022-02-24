class Test < ApplicationRecord
    root "tests#index"
    resources :tests, only: [:index, :create]
end
