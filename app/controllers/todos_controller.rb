class TodosController < ApplicationController


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
    if @todo.update resource_params
      respond_to do |format|
        format.json { render json: @todo }
      end
    end
  end


  def assign_todo
    Todo.find params[:id => current_user.id]
  end


  private

  def todo_params
    params.require(:todo).permit([:todo])
  end

end
