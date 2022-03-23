# frozen_string_literal: true

class DistancesController < ApplicationController

  def new
  end

  def create
    pp 'distanceのcreateアクション'
    pp params
    redirect_to root_path
  end
end
