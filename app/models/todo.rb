class Todo < ApplicationRecord
  belongs_to :user

  validates :todo, presence: true

  def todo_todo_valid
    self.create(:todo_valid => true) and return true unless self.url.present?


  end
end
