Rails.application.routes.draw do

  devise_for :users, :controllers => { registrations: 'registrations' }
  root 'todos#index'

  # devise_for :users, controllers: { sessions: 'users/sessions' }

  get 'users/index'


  resources :todos do
    member do
      put :switch, :update_todo

    end
   

  end

  resources :users


end
