class Todo < ApplicationRecord
  belongs_to :user

  validates :todo, presence: true

  def todo_todo_valid
    byebug
    self.create(:todo_valid => true) and return true unless self.url.present?
  end

  def todo_act
    # if @todo.todo_valid => params[:todo_valid]
    #   @todos
    # end
  end

end
