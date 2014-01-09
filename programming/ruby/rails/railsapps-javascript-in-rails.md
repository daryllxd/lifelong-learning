## [RailsApps](http://railsapps.github.io/rails-javascript-include-external.html)
[TODO]

#### Rules of Thumb
- Logically organize your site-wide scripts in the app/assets/javascripts folder.
- Copy external JS libraries to the vendor assets/javascripts folder.
- Let Rails asset pipeline combine them into one minimized `application.js` file.
- List scripts in the `app/assets/javascripts/applications.js` manifest.

In almost all applications, there is no need to add external JavaScript libraries directly in a view template. Use the Rails asset pipeline, even for JavaScript used on just one page (page-specific JavaScript). Copy external scripts to your application and you’ll gain the performance benefits of the Rails asset pipeline and avoid complexity.

#### Principles for Performance
- JS is single-threaded, either execute JS or render UI
- DL files longer than executing browser code, even with parallel DL/caching
- CDN help only in first DL or once a file is cached. CDN for popular JS libraries no adv if visitor has library cached from other site.
- CDN set up from Cloudfront.
- Inline JS blocks the browser from loading and rendering the page. No to inline!
- The fewer `script` tags you use, the faster your pages will load. Each script tag has to be parsed by the browser.
- Concat scripts to minimize dl time.
- External JS libs can be copied and concat. Make your own copy of an ext lib when ur app requires a specific version.
- Some JS lib introduce secur vulnebs (CC processing). Include external script in app.js through dynamic loading.
- No need to "place JS at the bottom".

For a deeper and more detailed look at recommended practices for using JavaScript in a web application, look to advice from web performance optimization experts such as Steve Souders and Nicholas C. Zakas.

#### Rails and the Asset Pipeline

Sprockets also performs preprocessing so you can write JavaScript as CoffeeScript or include Ruby code as an ERB file. Order of execution is still important; a manifest file must list each JavaScript file in dependent order.

#### Where to Stick Your JavaScript

Three locations:

	app/assets/javascripts for JavaScript you create for your application.
	lib/assets/javascripts or scripts that are shared by many applications (but use a gem if you can).
	vendor/assets/javascripts for copies of jQuery plugins, etc., from other developers.

#### Mysterious Manifests

The default app/assets/javascripts/application.js file is a manifest file. It’s a manifest file because it contains directives:

	//= require jquery
	//= require jquery_ujs
	//= require_tree .

Directives tell Sprockets which files should be combined to build a single JavaScript script. Each file that contains manifest directives becomes a single JavaScript script with the same name as the original manifest file. Thus the app/assets/javascripts/application.js manifest file becomes the application.js script.

#### Site-wide, Page-specific Scripts

- Put the site-wide shit into the `sitewide/` directory and `require_tree` that shit.
- "They only become available site-wide because they are contatenated into the application.js script."
- Paloma gem?
- Better to use gemified versions of JS because this gives you the advantage of RubyGems as a package manager.
- Some external scripts such as GAnalytics are cached by the browser. 
- GAnalytics (.js.erb), put the <% if Rails.env == 'production' %> at the top.
- Namespacing assets: You can do `<body class="projects">` and shit. Or you can do `<body class="<%= controller_name %> <%= action_name %>">`














## [A Simple Pattern to Namespace and Selectively Execute Certain Bits of JavaScript Depending on Which Rails Controller and Action are Active](http://blog.jerodsanto.net/2012/02/a-simple-pattern-to-namespace-and-selectively-execute-certain-bits-of-javascript-depending-on-which-rails-controller-and-action-are-active/)

#### 1) Create an application object

The first step is to create a top-level JavaScript object named after our application.

>app/assets/javascripts/elijah.js.coffee

	this.Elijah ?= {}

All controller-level objects will be namescaped inside this object, so it must be specified first in the application manifest. Edit app/assets/javascripts/application.js like so:

>app/assets/javascripts/application.js 

	//= require jquery
	//= require elijah
	//= require_tree .

#### 2) Add a JavaScript controller for each Rails controller

Each Rails controller will have a matching JavaScript controller to manage code executed on the Rails controller’s actions. Elijah has a `TemperaturesController`.

>app/assets/javascripts/temperatures.js.coffee

	class TemperaturesController
	    init: ->
	        console.log "temps init!"

	    index: ->
	        console.log "temps index!"

	this.Elijah.temperatures = new TemperaturesController

The init method is where to put any setup code that will be executed on before all actions for a given controller. Each action can optionally have its own method which will be executed on it and no other actions owned by the controller.

#### 3) Embed the current controller and action in the HTML

we have to let our Elijah JavaScript object know which controller/action pair are active for a given page request. 

	<body data-controller="<%= controller.controller_path %>" data-action="<%= controller.action_name %>">

#### 4) Auto-execute the matching controller/action JavaScript

	// - snipped -
	//= require_tree .

	(function($, undefined) {
	  $(function() {
	    var $body = $("body")
	    var controller = $body.data("controller").replace(/\//g, "_");
	    var action = $body.data("action");

	    var activeController = Elijah[controller];

	    if (activeController !== undefined) {
	      if ($.isFunction(activeController.init)) {
	        activeController.init();
	      }

	      if ($.isFunction(activeController[action])) {
	        activeController[action]();
	      }
	    }
	  });
	})(jQuery);

It extracts the embedded controller/action combo and executes the matching JavaScript controller’s init method followed by the action method. Ruby controller namespaces need to be replaced by underscores in JavaScript. For example, an Admin::UsersController will require a JavaScript object called Elijah.admin_users.


ZipMatch

One call to action, clean/simple. One focused image only. SEO shit is below the fold. Top page optimized for conversion, bottom page optimized for SEO.

It's diff to make a solid sales team in the Philippines? Why can't we find leads for brokers and developers?

Content strategy: We interview a senator which has a .gov and .edu which links back to us. It's a key strategy to the content. We right content not for keywords, but for value.

Lead conversion is necc. Conversion leads can also be optimized via the design. As a startup we have to build quick. 

header-url-meta desc-3x 























