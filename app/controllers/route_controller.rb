# frozen_string_literal: true

class RouteController < ApplicationController
  
  def new
  end

  def create
    routes = params.require(:_json)
    route = Route.new
    redirect_to root_path
  end
end
