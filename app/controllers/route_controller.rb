# frozen_string_literal: true

class RouteController < ApplicationController
  skip_before_action :check_logged_in, only: :create
  def new
    # @distance = Distance.new
  end

  def create
    pp 'routeのcreateだよー'
    # binding.pry
    routes = params.require(:_json)
    route = Route.new
    # walking_day: wday,
    # walking_distance: wdis

    # @route.save
    # binding.pry
    # ここから地図に入る？
    redirect_to root_path
  end
end
