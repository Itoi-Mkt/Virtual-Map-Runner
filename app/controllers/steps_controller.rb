# frozen_string_literal: true

class StepsController < ApplicationController
  skip_before_action :check_logged_in, only: :create

  def new
    # @distance = Distance.new
  end

  def create
    pp 'stepsのcreateだよー'
    pp params
    # binding.pry
    
    dis = params.require(:distance)
    dis.each do |element|
      p "test"
      
      dis_value = element[0]
      poly_points = element[1]
      @step = Step.new(
        route_id: 1,
        distance_value: dis_value,
        polyline_points: poly_points
      )
      # @step.save
    end


    
    # @step.save
    # binding.pry
    # ここから地図に入る？
    # redirect_to root_path
  end
end
