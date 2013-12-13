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
- Inline JS blocks loading and rendering the page. No to inline!
- Fewer `script` tags you use, the faster your pages will load. Each script tag has to be parsed by the browser.
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














