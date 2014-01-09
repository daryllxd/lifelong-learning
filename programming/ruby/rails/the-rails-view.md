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

#### Conditional Contnet

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
- Java


































