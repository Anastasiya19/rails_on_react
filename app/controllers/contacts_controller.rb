class ContactsController < ApplicationController

  def new
    @contact = Contact.new()
  end

  def create
    @contact = Contact.new(contact_params)
    @contact.request = request
    if @contact.deliver
      flash.now[:error] = nil
      redirect_to new_contact_url , notice: 'Thank you for your message. We will contact you soon!'
    else
      flash.now[:error] = 'Cannot send message'
      # render :new
      redirect_to (:back), notice:'Cannot send message'
    end
  end

  def contact_params
    params.require(:contact).permit([:name, :message])
  end

end
