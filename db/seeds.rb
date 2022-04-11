# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require "csv"

# CSV.foreach('db/seeds/csv/steps.csv', headers: true) do |row|
#   Step.create(
#     route_id: 1,
#     distance_value: row['distance_value'],
#     polyline_points: row['polyline_points'],
#     created_at: row['created_at'],
#     updated_at: row['updated_at']
#   )
# end

CSV.foreach('db/seeds/csv/second_route.csv', headers: true) do |row|
  Step.create(
    route_id: 2,
    distance_value: row['distance_value'],
    polyline_points: row['polyline_points'],
    created_at: row['created_at'],
    updated_at: row['updated_at']
  )
end

CSV.foreach('db/seeds/csv/third_route.csv', headers: true) do |row|
  Step.create(
    route_id: 3,
    distance_value: row['distance_value'],
    polyline_points: row['polyline_points'],
    created_at: row['created_at'],
    updated_at: row['updated_at']
  )
end