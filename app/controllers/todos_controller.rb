class TodosController < ApplicationController

  before_action :set_todo!, only: [ :show, :edit, :update, :destroy, :switch, :update_todo, :todo_active, :index ]
  respond_to :json

  def index
    case params[:sort]
      when 'active'
        @todos = current_user.todos.where(todo_valid: true).order(:id)
      when 'inactive'
        @todos = current_user.todos.where(todo_valid: false).order(:id)
      else
        @todos = current_user.todos.order(:id)
    end
    respond_to do |format|
      format.html
      format.json { render json: @todos }
    end
  end

  def create
    @todo = current_user.todos.new(todo_params)
    if @todo.save
      render json: @todo
      flash[:notice] = 'Example has been created!'
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @todo = Todo.find_by(id: params[:id])
    flash[:success] = 'You delete your todo and you sent a message!'
    @todo.destroy if @todo
    author = current_user
    UserMailer.delete_todo(author).deliver_now
    respond_to do |format|
      # format.html
      format.json { render json: @todos }
    end
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
  #
  # def show
  #   respond_with assign_todo
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
