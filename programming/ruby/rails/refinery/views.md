## Overriding Views

To override the views:

	$ rake refinery:override view=refinery/_footer.html
	$ rake refinery:override view=refinery/pages/show

Only override when you need to?

## Extending Controllers with Decorators

Extending a view is common, but for controllers/models, upgrading to future versions would be more difficult. You'll want a controller or model to act exactly as it has already been defined.

[TODO] this when I need to put the blog entries in.

## Overriding JavaScripts

>application.js

	//= require jquery
	//= require jquery_ujs

Additional files:

	<% content_for :javascripts do %>
		<%= javascript_include_tag "jquery-cycle.min" %>
	<% end %>

## Google Analytics: Check out `config/initializers/refinery/core.rb`, modify `config.google_analytics_page_code`.

## Using Custom View or Layout Templates

When developing a site, you might stumble into an issue where you need to change the structure of the output page to accommodate a different look or a necessary DOM modification that cannot be achieved through the reordering of page parts. In these cases, it is nice to be able to quickly draft a second template and swap.

Refinery utilises a separate view file for the home page (refinery/pages/home.html.erb). In all other circumstances, by default, Refinery uses the show action of the Refinery::PagesController to render page content. That means overriding and editing refinery/pages/show.html.erb to change the structure. By default, that template is largely blank—it contains a reference to the refinery/_content_page partial, which utilises a complex series of classes beginning with the ContentPagePresenter.

#### Using Custom View Templates











## Additional Menus

Reconfiguring `Refinery::Pages::MenuPresenter`.