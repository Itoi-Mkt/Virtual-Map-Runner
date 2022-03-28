# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include SessionsHelper

  def check_logged_in
    return if current_user
    redirect_to root_path
  end
end
