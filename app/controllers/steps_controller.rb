# frozen_string_literal: true

class StepsController < ApplicationController
  # skip_before_action :check_logged_in, only: :show

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

    # binding.pry

  end

  def show
    # users = { id:1, nickname: "Saiga", age: 22 }
    @steps = Step.all
    # render json: @steps


    respond_to do |format|
      # リクエストされるフォーマットがHTML形式の場合
      format.html 

      # リクエストされるフォーマットがJSON形式の場合
      format.json { render json: @steps } 
      # @usersをjson形式のデータへ変換して返す
    end
  end



end
