# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  def delete_todo
    UserMailer.delete_todo(User.first)
  end
end
