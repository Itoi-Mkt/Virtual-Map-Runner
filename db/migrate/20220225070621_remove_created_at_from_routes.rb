class RemoveCreatedAtFromRoutes < ActiveRecord::Migration[5.2]
  def change
    remove_column :routes, :updated_at, :datetime
    remove_column :routes, :created_at, :datetime
    add_column :routes, :updated_at, :datetime
    add_column :routes, :created_at, :datetime
  end
end
