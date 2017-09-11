class UserMailer < ApplicationMailer

  # default from: 'notifications@example.com'

  def delete_todo(user)
    @user = user
    mail(from: "anastasiya.kovaleva@dunice.net", to: @user.email, subject: 'Welcome to My Awesome Site')
  end

end
