# frozen_string_literal: true

class RemoveUpdatedAtFromRoutes < ActiveRecord::Migration[5.2]
  def change
    remove_column :routes, :start_lat, :decimal
    remove_column :routes, :start_lng, :decimal
    remove_column :routes, :end_lat, :decimal
    remove_column :routes, :end_lng, :decimal
    remove_column :routes, :route_lit, :varchar

    add_column :routes, :thumbnail, :binary
    add_column :routes, :other, :text
  end
end
