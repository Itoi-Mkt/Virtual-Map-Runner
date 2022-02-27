class CreatePaths < ActiveRecord::Migration[5.2]
  def change
    create_table :paths do |t|
      t.bigint :step_id
      t.decimal :lat, precision: 20, scale: 17
      t.decimal :lng, precision: 20, scale: 17
      t.timestamps
    end
  end
end
