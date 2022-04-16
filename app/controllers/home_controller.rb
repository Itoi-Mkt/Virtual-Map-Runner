# frozen_string_literal: true

class HomeController < ApplicationController
  def top
  end
  def redirect
    redirect_to root_path
  end
end
