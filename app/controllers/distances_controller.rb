# frozen_string_literal: true

class DistancesController < ApplicationController
  # skip_before_action :check_logged_in, only: :create

  def new
    # @distance = Distance.new
  end

  def create
    pp 'distanceのcreateアクション'
    pp params
    redirect_to root_path
  end
end
