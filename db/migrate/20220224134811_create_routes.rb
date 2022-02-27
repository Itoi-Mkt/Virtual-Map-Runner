class CreateRoutes < ActiveRecord::Migration[5.2]
  def change
    create_table :routes do |t|
      t.string :name
      t.decimal :start_lat, precision: 10, scale: 7
      t.decimal :start_lng, precision: 10, scale: 7
      t.decimal :end_lat, precision: 10, scale: 7
      t.decimal :end_lng, precision: 10, scale: 7
      t.string :route_lit
      t.timestamp :updated_at
      t.timestamps
    end
  end
end
