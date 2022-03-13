# frozen_string_literal: true

class StepsController < ApplicationController
  skip_before_action :check_logged_in, only: :create
  skip_before_action :check_logged_in, only: :show
  def create
    pp 'stepsのcreateだよー'
    # binding.pry
    steps = params.require(:_json)
    steps.each do |st|
      step = Step.new(
        route_id: 1,
        distance_value: st[0],
        polyline_points: st[1],
        end_location_lat: st[2],
        end_location_lng: st[3]
      )
      pp(step[:distance_value])
      # step.save
      # ルートを付け加えたくなったらSaveのコメントアウトを外す
    end
  end

  def show
    pp 'stepsのshowだよー'
    step = Step.select('id', 'polyline_points', 'distance_value')
    gon.steps = step
    # pp gon.steps   OK,通ってる
  end
end
