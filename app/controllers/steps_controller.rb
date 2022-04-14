# frozen_string_literal: true

class StepsController < ApplicationController

  def new
  end

  def create
  end

  def show
    r_id = params[:route_id]
    @steps = Step.where(route_id: r_id)
    respond_to do |format|
      format.html 
      format.json { render json: @steps } 
    end
  end

end
