## [Form Helpers](http://guides.rubyonrails.org/form_helpers.html)

Most basic: `form_tag`. It creates a `<form>` tag which will POST to the current page.

	<%= form_tag do %>
	  Form contents
	<% end %>

	<form accept-charset="UTF-8" action="/home/index" method="post">
	  <div style="margin:0;padding:0">
	    <input name="utf8" type="hidden" value="&#x2713;" />
	    <input name="authenticity_token" type="hidden" value="f755bb0ed134b76c432144748a6d4b7a7ddf2b71" />
	  </div>
	  Form contents
	</form>

A `div` is created: first input name enforces browsers to respect the form's character encoding. Second input element is generated for all forms whether GET or POST, and is an `authenticity_token`, a security feature of rails for CSRF. 

#### 1.1 A Generic Search Form

	<%= form_tag("/search", method: "get") do %>
	  <%= label_tag(:q, "Search for:") %> # q becomes the CSS ID
	  <%= text_field_tag(:q) %>
	  <%= submit_tag("Search") %>
	<% end %>

	<form accept-charset="UTF-8" action="/search" method="get">
	  <label for="q">Search for:</label>
	  <input id="q" name="q" type="text" />
	  <input name="commit" type="submit" value="Search" />
	</form>

#### 1.2 Multiple Hashes in Form Helper Calls

Skip bugs by making the first argument a hash, if you want the actions to be in a different controller/action.

	form_tag({controller: "people", action: "search"}, method: "get", class: "nifty_form")
	# => '<form accept-charset="UTF-8" action="/people/search" method="get" class="nifty_form">'

#### 1.3 Helpers for Generating Form Elements

The first parameter to these is always the name of the input. When the form is submitted, the name will be passed along with the form data, and will make its way to the params hash in the controller with the value entered by the user for that field. For example, if the form contains <%= text_field_tag(:query) %>, then you would be able to get the value of this field in the controller with params[:query].

_Checkboxes_

	<%= check_box_tag(:pet_dog) %>
	<%= label_tag(:pet_dog, "I own a dog") %>
	<%= check_box_tag(:pet_cat) %>
	<%= label_tag(:pet_cat, "I own a cat") %>

	<input id="pet_dog" name="pet_dog" type="checkbox" value="1" />
	<label for="pet_dog">I own a dog</label>
	<input id="pet_cat" name="pet_cat" type="checkbox" value="1" />
	<label for="pet_cat">I own a cat</label>

_Radio Buttons_

	<%= radio_button_tag(:age, "child") %>
	<%= label_tag(:age_child, "I am younger than 21") %>
	<%= radio_button_tag(:age, "adult") %>
	<%= label_tag(:age_adult, "I'm over 21") %>

	<input id="age_child" name="age" type="radio" value="child" />
	<label for="age_child">I am younger than 21</label>
	<input id="age_adult" name="age" type="radio" value="adult" />
	<label for="age_adult">I'm over 21</label>

#### 1.4 Other Helpers of Interest (Some must be Rails 4)

	<%= text_area_tag(:message, "Hi, nice site", size: "24x6") %>
	<%= password_field_tag(:password) %>
	<%= hidden_field_tag(:parent_id, "5") %>
	<%= search_field(:user, :name) %>
	<%= telephone_field(:user, :phone) %>
	<%= date_field(:user, :born_on) %> 								# Doesn't work for FF
	<%= datetime_field(:user, :meeting_time) %>						# Doesn't work for FF
	<%= datetime_local_field(:user, :graduation_day) %>
	<%= month_field(:user, :birthday_month) %>
	<%= week_field(:user, :birthday_week) %>
	<%= url_field(:user, :homepage) %>
	<%= email_field(:user, :address) %>
	<%= color_field(:user, :favorite_color) %>
	<%= time_field(:task, :started_at) %>

## 2 Dealing with Model Objects

#### 2.1 Model Object Helpers

While the `*_tag` helpers can certainly be used for this task they are somewhat verbose as for each tag you would have to ensure the correct parameter name is used and set the default value of the input appropriately. Rails provides helpers tailored to this task. These helpers lack the `_tag` suffix, for example `text_field`, `text_area`.

For these helpers the first argument is the name of an instance variable and the second is the name of a method (usually an attribute) to call on that object. Rails will set the value of the input control to the return value of that method for the object and set an appropriate input name. If your controller has defined @person and that person's name is Henry then a form containing:

	<%= text_field(:person, :name) %>

becomes

	<input id="person_name" name="person[name]" type="text" value="Henry"/>

Upon form submission the value entered by the user will be stored in `params[:person][:name]`. The params[:person] hash is suitable for passing to Person.new or, if @person is an instance of Person, @person.update.

#### 2.2 Binding a Form to an Object

This is for less repetition, focused on an object. Assume we have a controller for dealing with articles `app/controllers/articles_controller.rb`:

	def new
	  @article = Article.new
	end

The corresponding view app/views/articles/new.html.erb using form_for looks like this:

	<%= form_for @article, url: {action: "create"}, html: {class: "nifty_form"} do |f| %>
	  <%= f.text_field :title %>
	  <%= f.text_area :body, size: "60x12" %>
	  <%= f.submit "Create" %>
	<% end %>

HTML:

	<form accept-charset="UTF-8" action="/articles/create" method="post" class="nifty_form">
	  <input id="article_title" name="article[title]" type="text" />
	  <textarea id="article_body" name="article[body]" cols="60" rows="12"></textarea>
	  <input name="commit" type="submit" value="Create" />
	</form>

You can create a similar binding without actually creating <form> tags with the fields_for helper. This is useful for editing additional model objects with the same form. For example if you had a Person model with an associated ContactDetail model you could create a form for creating both like so:

	<%= form_for @person, url: {action: "create"} do |person_form| %>
	  <%= person_form.text_field :name %>
	  <%= fields_for @person.contact_detail do |contact_details_form| %>
	    <%= contact_details_form.text_field :phone_number %>
	  <% end %>
	<% end %>

HTML:

	<form accept-charset="UTF-8" action="/people/create" class="new_person" id="new_person" method="post">
	  <input id="person_name" name="person[name]" type="text" />
	  <input id="contact_detail_phone_number" name="contact_detail[phone_number]" type="text" />
	</form>

#### 2.3 Relying on Record Identification

The Article model is directly available to users of the application, so — following the best practices for developing with Rails — you should declare it a resource:

	resources :articles


[TODO]

#### 2.4 How do forms with PATCH, PUT, or DELETE methods work?

The Rails framework encourages RESTful design of your applications, which means you'll be making a lot of "PATCH" and "DELETE" requests (besides "GET" and "POST"). However, most browsers don't support methods other than "GET" and "POST" when it comes to submitting forms.

Rails works around this issue by emulating other methods over POST with a hidden input named "_method", which is set to reflect the desired method:

	form_tag(search_path, method: "patch")

	<form accept-charset="UTF-8" action="/search" method="post">
	  <div style="margin:0;padding:0">
	    <input name="_method" type="hidden" value="patch" />
	    <input name="utf8" type="hidden" value="&#x2713;" />
	    <input name="authenticity_token" type="hidden" value="f755bb0ed134b76c432144748a6d4b7a7ddf2b71" />
	  </div>

## 3 Making Select Boxes with Ease

	<%= select_tag(:city_id, '<option value="1">Lisbon</option>...') %>

	<%= options_for_select([['Lisbon', 1], ['Madrid', 2], ...], 2) %>

_The second argument to options_for_select must be exactly equal to the desired internal value. In particular if the value is the integer 2 you cannot pass "2" to options_for_select — you must pass 2. Be aware of values extracted from the params hash as they are all strings._

Third param: options (`:include_blank`, `prompt`).

Arbitrary attributes:

	<%= options_for_select([['Lisbon', 1, {'data-size' => '2.8 million'}], ['Madrid', 2, {'data-size' => '3.2 million'}]], 2) %>

	<option value="1" data-size="2.8 million">Lisbon</option>
	<option value="2" selected="selected" data-size="3.2 million">Madrid</option>

#### 3.2 Select Boxes for Dealing with Models

	# controller:
	@person = Person.new(city_id: 2)

	# view:
	<%= select(:person, :city_id, [['Lisbon', 1], ['Madrid', 2], ...]) %>

	[TODO]

## 4 Using Date and Time Form Helpers

## 5 Uploading Files

A common task is uploading some sort of file, whether it's a picture of a person or a CSV file containing data to process. The most important thing to remember with file uploads is that the rendered form's encoding MUST be set to "multipart/form-data". If you use form_for, this is done automatically. If you use form_tag, you must set it yourself, as per the following example.

	<%= form_tag({action: :upload}, multipart: true) do %>
	  <%= file_field_tag 'picture' %>
	<% end %>
	 
	<%= form_for @person do |f| %>
	  <%= f.file_field :picture %>
	<% end %>

Rails provides the usual pair of helpers: the barebones file_field_tag and the model oriented file_field. The only difference with other helpers is that you cannot set a default value for file inputs as this would have no meaning. As you would expect in the first case the uploaded file is in params[:picture] and in the second case in `params[:person][:picture]`.

#### 5.1 What Gets Uploaded

The object in the params hash is an instance of a subclass of IO. Depending on the size of the uploaded file it may in fact be a StringIO or an instance of File backed by a temporary file. In both cases the object will have an original_filename attribute containing the name the file had on the user's computer and a content_type attribute containing the MIME type of the uploaded file. The following snippet saves the uploaded content in #{Rails.root}/public/uploads under the same name as the original file (assuming the form was the one in the previous example).

	def upload
	  uploaded_io = params[:person][:picture]
	  File.open(Rails.root.join('public', 'uploads', uploaded_io.original_filename), 'wb') do |file|
	    file.write(uploaded_io.read)
	  end
	end

Once a file has been uploaded, there are a multitude of potential tasks, ranging from where to store the files (on disk, Amazon S3, etc) and associating them with models to resizing image files and generating thumbnails. 

#### 5.2 Dealing with Ajax: `remote: true`

## 6 Customizing Form Builders

## 7 Understanding Parameter Naming Conventions

For example in a standard create action for a Person model, params[:person] would usually be a hash of all the attributes for the person to create. The params hash can also contain arrays, arrays of hashes and so on.
