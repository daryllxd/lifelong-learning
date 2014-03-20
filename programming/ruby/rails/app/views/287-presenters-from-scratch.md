## Presenter from Scratch

Whenever you are in a profile to go, you go with a presenter. *It has knowledge of the view and model.*

New folder presenters, add user_presenter.rb

class UserPresenter
	def initialize(user, template) # Because you have both view and model.
		@user = user
		@template = template
	end

	def show
		@user = User.find(params[:id])
	end

end

>show.html.erb

<% present @user do |user_presenter| %>

	<-- stuff -->

<% end %>


>application_helper.rb

module ApplicationHelper
	def present(object, klass = nil) 						# Second object klass to define what presenter to use.
		klass ||= "#{object.class}Presenter".constantize	# Interpolate presenter class if klass is nil, turn to a class if not
		
		presenter = klass.new(object, self)
		yield presenter if block_given?
		presenter

	end
end





In draper, they 
