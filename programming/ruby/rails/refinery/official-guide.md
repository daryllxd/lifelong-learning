## 2 What is Refinery CMS?

Refinery CMS, often shortened to Refinery, is an open source content management system written in Ruby as a Ruby on Rails web application with JQuery used as the JavaScript library. Refinery runs on Rails 3.2.

Refinery differs from similar projects by targeting a non-technical end user and allowing the developer to create a flexible website rapidly by staying as close as possible to the conventions of the Ruby on Rails framework.

The Refinery philosophy includes several guiding principles:

“The Rails Way” where possible – Refinery embraces conventions used in Rails, allowing any Rails programmer to leverage existing knowledge to get up and running quickly.
End user focused interface – Refinery’s user interface is simple, bright and attractive so end users feel invited and not overwhelmed.
Awesome developer tools – Refinery makes it easy for developers to add functionality and change the front end look and feel.
Encourage and Help Others – Refinery has an active community on Google Groups and IRC. If you ever have a question there is someone able and willing to assist.

2.1 Refinery’s architecture

Refinery is comprised of several Rails Engines. Each extension acts like a mini Rails application with its own routes and views. Refinery is architected like this so that it keeps out of the way of any custom development you will do in the /app directory.

2.2 Core extensions

The extensions Refinery comes with are:

- Authentication – manages users and sessions within Refinery.
- Core – contains default layouts, views, javascripts and CSS. This extension also has an extension API for extending Refinery and everything Refinery needs to hook into Rails.
- Dashboard – shows you what’s recently been updated.
- Images – handles image upload, insertion and processing images using Dragonfly.
- Pages – allows you to manage pages including the structure of your site displayed in the front end.
- Resources – handles file upload and storage.

#### 3.2 Creating a Refinery application

	$ refinerycms rickrockstar

## 4 Hello, Refinery!

	$ rails s # fires up WEBrick
	> Go to http://localhost:3001/refinery to register your first user.
	> Go to config/initializers/refinery/core.rb and edit the site name (config.site_name = "Company Name").

## 5 Customizing the Design

By default: Refinery has some views already. Override them if you want to, using your own layout and design. 

We start with `pages_controller`, and the view for this action is located in `app/vies/refinery/pages/show.html.erb`, which you won't see because Refinery is providing it for you.

To override the first view, use `refinery:override`, which allows you to copy files out of Refinery and into your own application to change.

	$ rake refinery:override view=refinery/pages/show

>app/views/refinery/pages/show.html.erb, new file created

	<%= render '/refinery/content_page' %>

Every view in Refinery has an instance variable called @page available.

Modify `show.html.erb`

>app/views/refinery/pages/show.html.erb modified

	<section id='body'>
	  <%=raw @page.content_for(:body) %>
	</section>
	<section id='side_body'>
	  <%=raw @page.content_for(:side_body) %>
	</section>

When you go to the associated pages at `http://localhost:3000/refinery/pages` you'll find out there are two tabs now.

To style the views, check out `app/assets/stylesheets/application.css.scss.

For specific parts of the body, you have to append `-page`, so for `hotel`, you have `hotel-page.css.scss`.

## Extending Refinery with your First Engine

Think of a Refinery extension as a miniature Rails application running in your vendor/extensions directory. Each extension specifies its own routes in its config directory and has its own views and controllers in its own app directory. Engines can even serve up their own images, stylesheets and javascripts by utilizing the asset pipeline, which got introduced in Rails 3.1.

	$ rails generate refinery:engine singular_model_name attribute:type [attribute:type ...]

















