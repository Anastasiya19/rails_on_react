class Contact < MailForm::Base

  attribute :name,      :validate => true
  attribute :message


  # Declare the e-mail headers. It accepts anything the mail method
  # in ActionMailer accepts.
  def headers
    {
        :subject => "My Contact Form",
        :to => "anastasiya.kovaleva@dunice.net",
        :from => %("#{name}")
    }
  end
end