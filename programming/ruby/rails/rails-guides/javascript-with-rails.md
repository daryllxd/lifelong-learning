* Before you actually do the Ajax thing, ask yourself why are you doing Ajax? It's not possible to redirect from 
* Difference between format.js and format.json: format.js is for internal use, format.json is for api stuffies.
* Okay to do this, you need to fix: In the view, set `remote: true` in the form. In the view-specific JS, do client-side stuffies. In the controller, set `respond_to do |format| to send responses out.`

## Working with JavaScript in Rails

#### Unobtrusive JavaScript

We'll add a data-* attribute to our link, and then bind a handler to the click event of every link that has that attribute:

	$ ->
	  $("a[data-background-color]").click ->
	    backgroundColor = $(this).data("background-color")
	    textColor = $(this).data("text-color")
	    paintIt(this, backgroundColor, textColor)

	<a href="#" data-background-color="#990000">Paint it red</a>
	<a href="#" data-background-color="#009900" data-text-color="#FFFFFF">Paint it green</a>
	<a href="#" data-background-color="#000099" data-text-color="#FFFFFF">Paint it blue</a>

We call this 'unobtrusive' JavaScript because we're no longer mixing our JavaScript into our HTML. We've properly separated our concerns, making future change easy. We can easily add behavior to any link by adding the data attribute. 

The Rails team strongly encourages you to write your CoffeeScript (and JavaScript) in this style, and you can expect that many libraries will also follow this pattern.

#### Built-in Helpers

`form_for`: Use this for specific models

`form_tag`: Use this to create a basic form

	<%= form_for(@post, remote: true) do |f| %> # this will be submitted via AJAX remote
	  ...
	<% end %>

	$(document).ready ->
	  $("#new_post").on("ajax:success", (e, data, status, xhr) ->
	    $("#new_post").append xhr.responseText
	  ).bind "ajax:error", (e, xhr, status, error) ->
	    $("#new_post").append "<p>ERROR</p>"

`link_to`: Use `:remote` option to create the data-remote thingie.

	<%= link_to "a post", @post, remote: true %>
	<a href="/posts/1" data-remote="true">a post</a>
	<%= link_to "Delete post", @post, remote: true, method: :delete %>

Add coffee:

	$ ->
	  $("a[data-remote]").on "ajax:success", (e, data, status, xhr) ->
	    alert "The post was deleted."

`button_to`: Create buttons with a remote option.

	<%= button_to "A post", @post, remote: true %>
	<form action="/posts/1" class="button_to" data-remote="true" method="post">
	  <div><input type="submit" value="A post"></div>
	</form>

####  Server-Side Concerns (Need to return JSON)

You have to modify some parts of your controller to allow AJAX (and returning JSON).

Old controller:

	class UsersController < ApplicationController
	  def index
	    @users = User.all
	    @user = User.new
	end

Index view (`app/views/users/index.html.erb`)

	<b>Users</b>
	 
	<ul id="users">
	<%= render @users %>
	</ul>
	 
	<br>
	 
	<%= form_for(@user, remote: true) do |f| %>
	  <%= f.label :name %><br>
	  <%= f.text_field :name %>
	  <%= f.submit %>
	<% end %>

` app/views/users/_user.html.erb`:

	<li><%= user.name %></li>

This becomes:

	# app/controllers/users_controller.rb
	# ......
	def create
	  @user = User.new(params[:user])
	 
	  respond_to do |format|
	    if @user.save
	      format.html { redirect_to @user, notice: 'User was successfully created.' }
	      format.js   {}
	      format.json { render json: @user, status: :created, location: @user }
	    else
	      format.html { render action: "new" }
	      format.json { render json: @user.errors, status: :unprocessable_entity }
	    end
	  end
	end

Then you can actually generate the JS code that will be sent and executed on the client side. :)

	$("<%= escape_javascript(render @user) %>").appendTo("#users");

#### Turbolinks

Rails 4 ships with the Turbolinks gem. This gem uses Ajax to speed up page rendering in most applications.

Turbolinks attaches a click handler to all a elements on the page. If your browser supports PushState, Turbolinks will make an Ajax request for the page, parse the response, and replace the entire body of the page with the body of the response. It will then use PushState to change the URL to the correct one, preserving refresh semantics and giving you pretty URLs.

The only thing you have to do to enable Turbolinks is have it in your Gemfile, and put //= require turbolinks in your CoffeeScript manifest, which is usually app/assets/javascripts/application.js.

To disable:

	<a href="..." data-no-turbolink>No turbolinks here</a>.






















