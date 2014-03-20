## 1 Creating an Application Layout

require_self
require_normalize

Don't put logo in the `<h1>` tag because it isn't a header.

li{
	border-right: ???
	&:last-child{
	border: none;
	}
}

Aside: An element that supports your main thing. A sidebar is a `<section` tag, then you style the content inside.

Sidebar: Check out `content_for` to create this shit.


>artflow/layout/app/helpers/navigation_helper.rb

This is to know what the nav is at the moment.

	def nav_tab(title, url, options = {})
		current_tab = options.delete(:current)
		options[:class] = (current_tab == title) ? 'active' : 'inactive' content_tag(:li, link_to(title, url), options)
	end

Breadcrumbs function?

Notices/alerts: We can do the

	flash[:notice]
	flash[:alert]

	<% if notice %>
		<p class="notification notice">
		<% notice %>
		</p>
	<% end %>

## 2: Improving Readability

- Make sure you standardize if erb or haml.
- No hard tabs. Spaces.2

Helperes are easier to test in isolation than templaates.

Better to simplify access to associations anyway. We can also make things such as client name like this:

	def creation_client_nme(creation = @creation)
		creation.project.client.name
	end

#### Conditional Content

Instead of the super dami na if admin then show else if user then show echos, we can do this?

>creations_helper.rb

	def controls_for_creation(creation)
		if current_user.manages?(creation)
			partials = controls_partial_for_creaton(creation)
			contents = render(partial: partial, locals: {creation: creation})
			content_tag(:ul, contents, class: 'controls')
		end
	end

	def controls_partial_for_creation(creation)
		if current_user.admin?
			'creations/controls/admin'
		elsif current_user.editor?
			'creations/controls/editor'
		elsif current_user.authors?(creation)
			'creations/controls/author'
		elsif current_user.shares?(creation)
			'creations/controls/collaborator'
		end
	end

##### Naming your Conditions

Instead of embedded ifs, we can split it into:

>creations_helper.rb

	def show_preview?(creation)
		creation.thumbnail &&
			current_user.can_view?(creation) &&
				expanded_view?
	end

	def expanded_view?
		session[:view] == 'expanded'
	end

>_preview.html.erb

<% if show_preview?(creation) %>
	<%= image_tag creation.file.url(:thumbnail), class: 'thumbnail' %>
<% end %>

#### Adding in-place editing

ALmost always, it would be better to not do this:

	<li id="creation-<%= creation.id %>" class='<% creation.file_type %>'>

It would be better to do this:

	<%= content_tag_for :li, creation, 'class' => creation.file_type,
		'data-id' => creation.id do %>
		... stuff inside the li
	<% end %>

- This is good because we don't need to figure out a scheme for the ID attribute. Rails will select an ID.
- It is also easier to read. We aren't putting a tag inside another tag, which sucks.
- JavaScript `data-` thingie.

>app/helpers/creations_helper.rb

	def switching_creation_tag_for(creation, &block)
		content_tag_for(:li, creation, class: creation.file_type, &block)
	end

## Adding Cascading Style Sheets

Avoid require_tree because it is alphabetically thingie. 

The `require_self` directive takes the styles defined in the file itself and inserts them at this point. We can use this to add ad hoc styles to our application.css that we don’t necessarily want to rip out into a separate file. The fact that we can put `require_self` before or after the other directives gives us the flexibility to control in exactly what order the content is inserted, which is important when it comes to the precedence of the CSS rules.

Rails ships with an assets:precompile Rake task that will handle generating static files for you.a You can either run this locally (if you don’t want to go through the bother of installing some dependencies on your server) and ship the files during deployment, or you can have the task run on the server immediately after deployment (e.g., for Capistrano, after "deploy:update_code").

`&`: Instead of adding the selector as a child of the enclosing selector, it replaces the `&` with the name of the enclosing selector. `&.client` becomes `li.client`.

Flexible mixins

	@mixin popout($inside: #ccc, $surrounding: #ddd){
		background-color: $inside;
		border-top: lighten($inside, 80%) 1px solid;
		border-bottom: darken($surrounding, 20%) 1px solid;
	}

#### Referencing Images from SCSS: Use image-path.

	.notice{
		background{
			color: #006302;
			image: url(image-path('notification_check.png'))
		}
	}

##### Sprites: [TODO]

## Adding JavaScript

#### Using jQuery UJS

>show.html.erb

	<p>
		<%= link_to "Remove Creation", @creation, method: 'delete',
		confirm: "Are you sure you want to remove this creation?" %>
	</p>


<%= semantic_form_for [@creation, Comment.new] do |f| %> 
	<%= f.inputs :body, label: false %>
	<%= f.buttons do %>
		<%= f.commit_button 'Add Comment' %> 
	<% end %>
<% end %>

	<ul id='comments'>
		<%= render @creation.comments %>
	</ul>
	<h3>Add Comment</h3>
	<%= render 'comments/form' %>

>artflow/js/app/views/comments/create.js.erb

	$('#comments').append("<%=j raw(render(@comment)) %>");

`j()` helper is a syntactic sugar for `escape_javascript()`, which takes the string and cleans it up so that it can be safely inserted into JS.

#### Testing Ajax

Together, Cucumber and Capybara make an impressive acceptance testing framework that will help us make sure all the pieces of our application work correctly for our users.

	gem 'capybara'
	gem 'cucumber-rails'
	gem 'launchy'
	gem 'database_cleaner'
	gem 'factory_girl'

	$ cucumber:install
	$ rake cucumber #0 scenarios and 0 steps

	Scenario: Designer can sign in
	Given I am designer "Lindsay Bluth" with an account 
	And I sign in
	Then I should see "Welcome, Lindsay Bluth"

>Opening and showing the actual page at that time

	Then /^show me the page$/ 
		do save_and_open_page
	end

#### Manual Testing with Selenium IDE

Selenium: Firefox extension.

When we click Add Creation, it calls a function called clickAndWait(), which does exactly what a user would do: it clicks a link and waits for it to load. The parameter of link= is what is called a locator, and it lets us select a block of text and act upon it, in this case, by clicking it.

One of the other powers of Selenium is its ability to work with a third-party solution, like SauceLabs’ OnDemand offering,15 which uses Selenium Remote Control and Selenium Grid,16 to test multiple browsers at once. 

*We don’t start with generalized CSS classes; we work toward them as we notice commonalities appear in various places throughout our application.*

## Forms

#### Building Custom Form Builders

	<%= form_for @creation, html: {multipart: true} do |f| %>
	<% end %>

Meet ActionView::Helpers::FormBuilder. It might just be the best friend you never knew you had. 

The FormBuilder instance yielded to our block knows all about the object the form is handling (in our case, @creation) and has access to the template so that it can generate and insert tags. It can check for errors, create labels and inputs for attributes, and even change a portion of a form to handle a completely different object (using f.fields_for).

	<%= text_area_tag 'comment[body]', @comment.body %> #form_tag
	<%= f.text_area :body %> #form_for

#### Defining a Form Builder

>lib/application_form_builder.rb

	class ApplicationFormBuilder < ActionView::Helpers::FormBuilder
	end

Autoloading is a facility that Rails uses to automatically require() files when it encounters a constant that it doesn’t recognize in an attempt to resolve the constant. It does this by a simple naming convention, looking under a whitelist of direc- tories.

New in Rails 3, lib/ has been removed from that list. Since we’re going to conform to the naming conventions (putting modules in subdirectories, etc.), we’ll tell Rails it’s really okay to allow autoloading from lib/. We modify our config/application.rb and set the following:

>artflow/forms/config/application.rb

	config.autoload_paths += %W(#{config.root}/lib)

>_form.html.erb

<%= f.field_item :name do %>
	<%= f.text_field :name %>
<% end %>

[TODO] Read on the form helper construction thingie.

Formtastic?

## Using Presenters

Presenters are custom classes that simplify access to a model or other aggregation of information and know how to get at (or build) the information we need to display.

First we’ll look at how we can use presenters in templates to help us more easily display information about model records, and then we will see how we can use presenters from controllers for data serialization.

Think of our presenter as a super-powered helper—a helper object.

>lib/designer_status.rb

	class DesignerStatus
		def initialize(designer)
			@designer = designer
		end
	end

The data we need to pull together for the view is pulled from some associations on the designer.

	def active_projects_count
		active_projects.count
	end

	def pending_approvals_count
		active_creationgs.pending_approval.count
	end

	def approved_count
		active_creations.approved.count
	end

	def active_hours
		active_projects.total_hours
	end

	def hours_per_project
		active_projects.inject({}) do |memo, project|
			memo[project] = project.total_hours
			memo
		end
	end

	private

	def active_projects
		@designer.projects.active
	end

	def active_creations
		@designer.creations.active
	end

Our presenter only displays information on the active projects and creations for the designer, so we’ve created a couple of private methods, active_projects() and active_creations(), that handle getting that information for us. This way we won’t need to have the same method chaining repeated in the methods we’ll be calling from our template.

[READ Presenters later when rearchitecting the shit.] 
[TODO]

## Handling Mobile Views [TODO]

## Working with Email Templates [TODO]

## Optimizing Performance

Either *technical efficiency* or *business interests*.

#### A/B Testing with Vanity

	$ brew install redis
	gem 'vanity'
	$ mkdir -p experiments/metrics

[TODO]

#### Performance Testing and Maintenance

- Testing CSS Declarations: Firefox Dust Me Selectors. Also, Google's PageSpeed tool. Deadweight gem.
- ImageOptim to optimize the file sizes. (ImageOptim saved us so much space by converting any image with under 256 colors to a PNG8+alpha format. Photoshop doesn’t support this format, so therefore “Save for Web” only gives us 24-bit when we want true alpha transparency.)
- SVG Graphics?
- Check if gzip compressed, and check for Google's mod_pagespeed.
- Make sure everything is cached.
	- Page caching [TODO]
	- Action caching [TODO]
	- Fragment caching [TODO]

#### DevOps

- Load balancing: Making sure the db servers replicate each other.
- Query Times: Add indexes to the database tables or look at using `find_by_sql()` method and calling the data by hand. Or Memcached.
- Static Assets and CDNs: Akamai and Cloudfront.
- RAM caching:  Varnish cache































