# frozen_string_literal: true

require 'test_helper'

class MapControllerTest < ActionDispatch::IntegrationTest
  test 'should get show' do
    get map_path
    assert_response :success
  end
end
