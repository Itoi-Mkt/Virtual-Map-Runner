class RemoveDistanceTextFromsteps < ActiveRecord::Migration[5.2]
  def change
    remove_column :steps, :distance_text, :string
    remove_column :steps, :end_location_lat, :decimal
    remove_column :steps, :end_location_lng, :decimal
    remove_column :steps, :start_location_lat, :decimal
    remove_column :steps, :start_location_lng, :decimal
    remove_column :steps, :encode_lat_lngs, :string
    remove_column :steps, :other, :text
  end
end
