Rails.application.routes.draw do

  devise_for :users, :controllers => { registrations: 'registrations' }

  # devise_for :users, controllers: { sessions: 'users/sessions' }

  get 'users/index'

  get 'todos/index'

  resources :todos
  resources :users

  root 'todos#index'

end
