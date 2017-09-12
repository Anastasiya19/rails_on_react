class CreateContacts < ActiveRecord::Migration[5.1]
  def change
    create_table :contacts do |t|
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.string "name"
      t.string "surname"
      t.integer "age", default: 0
      t.string "category"
      t.integer "num_phon"
      t.string "message"
      t.timestamps
    end
  end

end
