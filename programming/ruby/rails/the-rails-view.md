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




































