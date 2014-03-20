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

`image_tag`

	<%= image_tag "header.png" %> # specify extension of the image
	<%= image_tag "icons/delete.gif" %>
	<%= image_tag "icons/delete.gif", {height: 45} %>
	<%= image_tag "home.gif", alt: "Home" %>

`video_tag`

	<%= video_tag "movie.ogg" %> # loaded from public/videos by default
	<%= video_tag ["trailer.ogg", "movie.ogg"] %> #multiple videos

`audio tag`

	<%= audio_tag "music.mp3" %>
	<%= audio_tag "music.mp3", autoplay: true, controls: true, autobuffer: true %>


## Understanding `yield`

Within the context of a layout, yield identifies a section where content from the view should be inserted. The simplest way to use this is to have a single yield, into which the entire contents of the view currently being rendered is inserted.

To render content into a named yield, use the `content_for` method.

	<html>
		<head>
		<%= yield :head %>
		</head>
		<body>
		<%= yield %>
		</body>
	</html>

	<% content_for :head do %>
	  <title>A simple page</title>
	<% end %>

#### Using Partials

Partial templates - usually just called "partials" - are another device for breaking the rendering process into more manageable chunks.

Partials have an underscore to distinguish them from regular views, even though they are referred to without the underscore.

	<%= render "menu" %> # This will render a file named _menu.html.erb at that point within the view being rendered.
	<%= render "shared/menu" %> # Other folder

	<%= render partial: "link_area", layout: "graybar" %> # Partials with layouts

You can also pass local variables inside.

new.html.erb

	<h1>New zone</h1>
	<%= error_messages_for :zone %>
	<%= render partial: "form", locals: {zone: @zone} %>

edit.html.erb

	<h1>Editing zone</h1>
	<%= error_messages_for :zone %>
	<%= render partial: "form", locals: {zone: @zone} %>

_form.html.erb

	<%= form_for(zone) do |f| %>
	  <p>
	    <b>Zone name</b><br />
	    <%= f.text_field :name %>
	  </p>
	  <p>
	    <%= f.submit %>
	  </p>
	<% end %>

Each partials also has a local variable with the same name as the partial.

	<%= render partial: "customer", object: @new_customer %>
	<%= render @customer %> # If the model's instance is the same as the partial.

Rendering Collections: Once you pass a colleciton to a partial via the `:collection` option, the partial will be inserted once for each member in the collection.

index.html.erb

	<h1>Products</h1>
	<%= render partial: "product", collection: @products %>

_product.html.erb

	<p>Product Name: <%= product.name %></p>

Since singular, then each of the products can access only itself.

If we go with plural

	<h1>Products</h1>
	<%= render @products %>

Rails determines the name of the partial to use by looking at the model name in the collection. In fact, you can even create a heterogeneous collection and render it this way, and Rails will choose the proper partial for each member of the collection:

index.html.erb

	<h1>Contacts</h1>
	<%= render [customer1, employee1, customer2, employee2] %>

customers/_customer.html.erb

	<p>Customer: <%= customer.name %></p>

employees/_employee.html.erb

	<p>Employee: <%= employee.name %></p>

Provide alternative content when there is nothing

	<h1>Products</h1>
	<%= render(@products) || "There are no products available." %>

Local variables

	<%= render partial: "product", collection: @products, as: :item %>

With this change, you can access an instance of the @products collection as the item local variable within the partial.

Arbitrary locals

	<%= render partial: "products", collection: @products, as: :item, locals: {title: "Products Page"} %>

*Rails also makes a counter variable available within a partial called by the collection, named after the member of the collection followed by _counter. @products creates product_counter.*

Spacer template

	<%= render partial: @products, spacer_template: "product_ruler" %>

Collection Partial Layouts

	<%= render partial: "product", collection: @products, layout: "special_layout" %>






























