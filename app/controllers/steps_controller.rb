# frozen_string_literal: true

class StepsController < ApplicationController

  def new
  end

  def create
    dis = params.require(:distance)
    dis.each do |element|
      dis_value = element[0]
      poly_points = element[1]
      @step = Step.new(
        route_id: 1,
        distance_value: dis_value,
        polyline_points: poly_points
      )
      # @step.save
    end
  end

  def show
    @steps = Step.all
    respond_to do |format|
      format.html 
      format.json { render json: @steps } 
    end
  end

end
