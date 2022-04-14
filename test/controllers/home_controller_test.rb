# frozen_string_literal: true

require 'test_helper'

class HomeControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get root_path
    assert_response :success
  end
  test 'should get privacypolicy' do
    get privacypolicy_path
    assert_response :success
  end
  test 'should get termsofservice' do
    get termsofservice_path
    assert_response :success
  end

end
