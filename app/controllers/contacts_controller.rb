class ContactsController < ApplicationController

  def new
    @contact = Contact.new()
  end

  def create
    @contact = Contact.new(params[:contact])
    @contact.request = request
    if @contact.deliver
      flash.now[:error] = nil
      redirect_to root_path, notice: 'Thank you for your message. We will contact you soon!'
    else
      flash.now[:error] = 'Cannot send message'
      # render :new
      redirect_to (:back), notice:'Cannot send message'
    end
  end

end
