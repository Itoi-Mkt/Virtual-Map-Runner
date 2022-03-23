# frozen_string_literal: true

class RouteController < ApplicationController
  # skip_before_action :check_logged_in, only: :create
  def new
  end

  def create
    routes = params.require(:_json)
    route = Route.new
    redirect_to root_path
  end
end
