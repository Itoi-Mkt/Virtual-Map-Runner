# frozen_string_literal: true

class CreateDistances < ActiveRecord::Migration[5.2]
  def change
    create_table :distances do |t|
      t.date :walking_day
      t.decimal :walking_distance, precision: 8, scale: 2

      t.timestamps
    end
  end
end
