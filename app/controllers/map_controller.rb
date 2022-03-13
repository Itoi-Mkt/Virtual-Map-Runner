# frozen_string_literal: true

class MapController < ApplicationController
  skip_before_action :check_logged_in, only: :show
  GOOGLE_API_KEY = ENV['API_KEY']
  def show; end
end
