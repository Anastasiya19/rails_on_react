Rails.application.routes.draw do


  devise_for :users, :controllers => { registrations: 'registrations' }
  root 'todos#index'

  get 'users/index'


  resources :todos do
    member do
      put :switch, :update_todo
    end
      get :todo_active
      put :todo_active
  end

  resources :users

end
