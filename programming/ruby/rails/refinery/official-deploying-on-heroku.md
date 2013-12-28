## 1 Creating a new Refinery application on Heroku
	
	# Need Git
	$ gem install refinerycms
	$ gem install heroku			# gems I needed to install
	$ gem install fog 				# gems I needed to install
	$ gem install excon				# gems I needed to install
	$ refinerycms myapp --heroku

You need to see:

	Creating Heroku app..
	Running: cd /path/to/app/myapp && heroku create
	Creating random-site-name..... done
	Created http://random-site-name.herokuapp.com/

## 2 Deploying an existing local Refinery application

Gemfile: Remove sqlite. Use pg on both.

	$ app_name="your-app-name"
	$ heroku create $app_name --stack cedar
	$ git push heroku master
	# Inside config/application.rb, set config.assets.initialize_on_precompile = true
	$ heroku labs:enable user-env-compile

To set up db on Heroku

	$ heroku run rake db:migrate
	$ heroku run rake db:seed
	$ heroku open

Copy your data from your local database to the Heroku app

	gem install taps
	heroku db:push

## 3 Adding Amazon S3 Support

If you want to use Refinery’s image and resource support you’ll need to setup storage, too. Heroku does not persist your app’s local filesystem, so to store uploaded files, you need to store them “in the cloud”. 

	group :production do
	  gem 'fog'
	end

	$ heroku config:add S3_KEY=123key S3_SECRET=456secret S3_BUCKET=my_app_production




















