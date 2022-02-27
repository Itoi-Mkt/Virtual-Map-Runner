class CreateSteps < ActiveRecord::Migration[5.2]
  def change
    create_table :steps do |t|
      t.integer :route_id
      t.string :distance_text
      t.integer :distance_value
      t.text :polyline_points

      t.decimal :end_location_lat, precision: 20, scale: 17 
      t.decimal :end_location_lng, precision: 20, scale: 17
      t.decimal :start_location_lat, precision: 20, scale: 17
      t.decimal :start_location_lng, precision: 20, scale: 17
      t.string :encode_lat_lngs
      t.text :other
      t.timestamps
    end
  end
end