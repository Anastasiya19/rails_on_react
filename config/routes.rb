Rails.application.routes.draw do
  get 'todos/index'

  resources :todos


  root 'todos#index'

end
