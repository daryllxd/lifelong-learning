	app/						Contains the controllers, models, views, helpers, mailers, and assets for your application.
	bin/						Contains the rails script that starts your app.
	config/					Configure your application’s runtime rules, routes, database, and more.
	config.ru				Rack configuration for Rack-based servers used to start the application.
	db/							Schema
	Gemfile					Specifies which gem dependencies are needed for your Rails application.
	lib/						Extended modules for your application.
	log/						Application log files.
	public					Only folder seen to the world.
	Rakefile				Locates and loads tasks that can be run from the command line.
	README.rdoc			Instruction manual for the application.
	test/						Unit tests, fixtures, and other test apparatus.
	tmp/						Temp files (cache, pid, session)
	vendor/					Third-party code. (Ruby gems, Rails src)
	vendor/assets		Third-party assets.
	README.rdoc			App description
	Rakefile				Utility tasks available via rake
	Gemfile					Gem requirements
	Gemfile.lock		Ensures all copies of the app use the same gem
	config.ru				Used for Rack middleware


	$ rails new sample_app --skip-test-unit

> Asset pipeline compatibility. `config/application.rb`

		module SampleApp
		  class Application < Rails::Application
		    .
		    .
		    .
		    config.assets.precompile += %w(*.png *.jpg *.jpeg *.gif)
		  end
		end

Uniqueness caveat: When you click twice at the same time, you can careate 2 user records. You have to create database indices on the email column, then require that te

Password digest - due to `bcrypt-ruby`.

`debug(params)` if Rails.env.development? for debug goodies.

Paperclip or carrierwave.

		$ rails generate controller Sessions --no-test-framework
		$ rails generate integration_test authentication_pages

		match '/signin',  to: 'sessions#new',         via: 'get'
		match '/signout', to: 'sessions#destroy',     via: 'delete' # via delete so DELETE request

By default, all helpers are available in the views but not in the controllers.

Cool helperz.
		
		5.years.from.now
		5.megabytes

Assignment functions - read!