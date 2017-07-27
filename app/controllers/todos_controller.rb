class TodosController < ApplicationController

  before_action :set_todo!, only: [ :show, :edit, :update, :destroy, :switch, :update_todo ]

  def index
    @todos = current_user.todos.order(:id)
  end

  def new
    @todos = Todos.new
  end

  def create
    @todo = current_user.todos.new(todo_params)

    if @todo.save
      render json: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @todo = Todo.find_by(id: params[:id])
    @todo.destroy if @todo

  end

  def update

    @todo = assign_todo
    if @todos.update todo_params
      respond_to do |format|
        format.json { render json: @todo }
      end
    end

  end

  def  update_todo
    @todo.update_attribute('todo', params[:todo])
    render json: @todo
  end

  def switch

    @todo.update_attribute('todo_valid', !@todo.todo_valid)
    render json: @todo
  end

  def assign_todo
    Todo.find params[:id => current_user.id]
  end

  private

  def todo_params
    params.require(:todo).permit(:todo, :todo_valid, :user_id)
  end

  def set_todo!
    @todo = Todo.find_by(id: params[:id])
  end

end
