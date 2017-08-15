class TodosController < ApplicationController

  before_action :set_todo!, only: [ :show, :edit, :update, :destroy, :switch, :update_todo, :todo_active, :index ]
  respond_to :json

  def index
    # byebug
    # @todo = Todo.find_by(todo_valid: params[:todo_valid])
    # @todos = current_user.todos.order(:id)
    # # render json: @todo
    #
    # @todo = assign_todo
    @todo = Todo.find_by(id: params[:id])

    if params[:todo_valid] == "true"
      @todos = current_user.todos.order(:id)
      render json: @todo
    else
      @todos = current_user.todos.order(:id)
      # render json: @todo
    end
  end

  def new
    @todos = Todos.new
  end

  def todo_active
    # byebug
    # Todo.find params[:id => current_user.id]
    # if params[:todo_valid] == 'true'
      @todo = Todo.find_by(todo_valid: params[:todo_valid] == 'false')
      # @todos = current_user.todos.order(:id)
    # else
    # end
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

  def update_todo
    @todo.update_attribute('todo', params[:todo])
    render json: @todo
  end

  def switch
    @todo.update_attribute('todo_valid', !@todo.todo_valid)
    render json: @todo
  end

  def show
    respond_with assign_todo
  end

  # def assign_todo
  #   Todo.find params[:id => current_user.id]
  # end

  private

  def todo_params
    params.require(:todo).permit(:todo, :todo_valid, :user_id)
  end

  def set_todo!
    @todo = Todo.find_by(id: params[:id])
  end

  def assign_todo
    Todo.find params[:id]
  end

end
