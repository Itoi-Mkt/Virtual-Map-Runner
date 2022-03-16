# frozen_string_literal: true

class UsersController < ApplicationController
  skip_before_action :check_logged_in, only: :index
  def index; end
end
