class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
  
      t.string :phoneNumber
      t.string :eMail
      t.float :longitude
      t.float :latitude
      t.boolean :status

      t.timestamps
    end
  end
end
