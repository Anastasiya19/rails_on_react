class TodosController < ApplicationController

  before_action :set_todo, only: [ :update]


  def index
    @todos = current_user.todos.all
  end

  def create
    @todo = current_user.todos.new(todo_params)

    if @todo.save
      render json: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  def update
    @todo = assign_todo
    if @todo.update todo_params
      respond_to do |format|
        format.json { render json: @todo }
      end
    end

    @todo.update_attributes(:todo_valid => true)
    save
  end

  def switch

    @todo = Todo.find(id: params[:id])
  end


  def assign_todo
    Todo.find params[:id => current_user.id]
  end

  private

  def todo_params
    params.require(:todo).permit([:todo], :todo_valid, :user_id)
  end

  def set_todo!
    @todo = Todo.find_by(id: params[:id])
  end

end
