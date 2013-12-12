## Creating Responses

#### Rendering by Default: Convention over Configuration

	class BooksController < ApplicationController
	end

	# synergizes with (routes.rb)
	resources :books

	# and (app/views/books/index.html.erb)
	<h1>Books are coming soon!</h1>

The rule is that if you do not explicitly render something at the end of a controller action, Rails will automatically look for the action_name.html.erb template in the controller's view path and render it.

	class BooksController < ApplicationController
	def index
	    @books = Book.all
	  end
	end

	#leads to
	<% @books.each do |book| %>
	  <tr>
	    <td><%= book.title %></td>
	    <td><%= book.content %></td>
	    <td><%= link_to "Show", book %></td>
	    <td><%= link_to "Edit", edit_book_path(book) %></td>
	    <td><%= link_to "Remove", book, method: :delete, data: { confirm: "Are you sure?" } %></td>
	  </tr>
	<% end %>

#### Using `render`

	render nothing: true #lol

	# different template within the same controller
	render "edit" # you can also use
	render :edit

	# rendering an action's template from another controller
	render "products/slow"

	# rendering from outside the app
	render "u/apps/warehouse_app/current/app/views/products/show"

	# render inline erb (wtf)
	render inline: "<% producs.each do |p| %> <p> p.name </p> <% end %>"

	# render plain text (ajaxy)
	render text: "OK"

	#render json/xml/js
	render json: @product
	render xml: @product
	render js: "alert('hello world')"

#### Options for `render`

`:content_type`

	render file: filename, content_type: "application/rss"

`:layout`

	render layout: "special_layout"
	render layout: false # no layout at all

`:location`

	render xml: photo, location: photo_url(photo)

`:status`

	render status: 500
	render status: :forbidden

#### `redirect_to`

Key difference: `render` tells Rails which view to use in constructing a response. `redirect_to` literally tells the browser to send a request for a different URL. (An HTTP 302 status code is sent.)

	# Unsafe
	if @book.nil?
	  render action: "index"
	end

	# Fixed. Downside: You redirect back to the browser, which is slower.
	if @book.nil?
	  redirect_to action: :index
	end

	redirect_to photos_url

Special redirect for moving back:
	
	redirect_to :back

Status code:

	redirect_to photos_path, status: 301

#### Using `head` To Build Header-Only Responses

	head :bad_request # to send a 400 Bad Request
	head :created, location:photo_path(@photo) # to send a 201 Created

## Structuring Layouts

	auto_discovery_link_tag # for browsers and newsreaders
	javascript_include_tag
	stylesheet_link_tag
	image_tag
	video_tag
	audio_tag

`javascript_include_tag`

	<% javascript_include_tag "main", "columns" %>
	<% javascript_include_tag "main", "photos/columns" %>

`stylesheet_include_tag`
	
	<%= stylesheet_link_tag "http://example.com/main.css" %>
	<%= stylesheet_link_tag "main_print", media: "print" %>






















