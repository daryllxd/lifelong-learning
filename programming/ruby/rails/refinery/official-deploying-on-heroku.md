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

## Own Bug Fixing

#### [How to set up RefineryCMS with Heroku and Amazon AWS assets](http://stackoverflow.com/questions/20037952/how-to-set-up-refinerycms-with-heroku-and-amazon-aws-assets)

Basically follow the answer. 

Run the refinery initialisation script, with Heroku option

refinerycms myapp --heroku
From http://refinerycms.com/guides/heroku

The output should give you a new heroku app and its name listed in the output:

"Creating Heroku app.. run heroku create --stack cedar from "." Creating ... done, stack is cedar http://[your heroku app].herokuapp.com/ | git@heroku.com:[your heroku app].git Git remote heroku added"

Create bucket on Amazon AWS…

Should be self-explanatory.

Set connection info for Amazon in the Heroku environment

We need both sets of credentials.

AWS_* and FOG_* is for Heroku (and the rails precompile, I believe).
S3_* stuff is for Refinery to be able to upload images etc.
heroku config:add AWS_ACCESS_KEY_ID="<your key>" AWS_SECRET_ACCESS_KEY="<your secret>" FOG_DIRECTORY="<your bucket name>" FOG_PROVIDER="AWS" FOG_REGION="<your aws region>"

heroku config:add S3_BUCKET="<your bucket name>" S3_KEY="<your key>" S3_REGION="<your aws region>" S3_SECRET="<your secret>"

Add required gems to your Gemfile

gem 'globalize3', '0.3.0'
From refinerycms not working when adding page

gem 'unf' 
(fixes some warnings)

gem 'rails_12factor'
From Why is the rails_12factor gem necessary on Heroku?

gem 'asset_sync'
From https://github.com/rumblelabs/asset_sync. This gem seems the only way to get the assets pushed up to the cloud... Although perhaps you can make do without it; perhaps someone else can confirm.

ruby '2.0.0' 
      [ place this at the end of the Gemfile. (Needed to clear Heroku warnings) ]
Add asset_sync asset host path in config/environments/production.rb

config.action_controller.asset_host = "//#{ENV['FOG_DIRECTORY']}.s3.amazonaws.com"
From https://github.com/rumblelabs/asset_sync

Set the site name in config/initializers/refinery/core.rb

config.site_name = <your site name>
Set the s3_backend in the config/environments/production.rb

Refinery::Core.config.s3_backend = true
From https://github.com/refinery/refinerycms/issues/1879

Configure database details

Remove sqlite3 in config/database.yml and setting postgresql instead: this is optional but recommended by Heroku and others

For adapter:

sqlite3 => postgresql
For database name:

db/foo.sqlite3 => <sitename>_foo
Set user-env-precompile settings

heroku labs:enable user-env-compile -a myapp
From https://devcenter.heroku.com/articles/labs-user-env-compile

Run the Bundler

bundle install
Note: First of all, I had to run, as prompted:
1. rvm use 2.0.0 in order to match the version we're using in Gemfile 2. bundle update globalize3

From refinerycms not working when adding page

Create (local) production database

RAILS_ENV=production rake db:create
Set environment variables needed before asset precompile can work

(this is for *nix, do whatever you need to on your platform)

export FOG_DIRECTORY="<your bucket name>"
export FOG_PROVIDER="AWS"
export AWS_SECRET_ACCESS_KEY="<your secret>"
export AWS_ACCESS_KEY_ID="<your key>"
Precompile the assets (???)

NOTE: This MAY NOT be required... (I did do this step each time but cannot be sure whether it's required. The next steps suggest to me it's not necessary to manually precompile: we need to change the "initialize_on_precompile" to false, run a git push to heroku (i.e. without assets), then set the "initialize_on_precompile" back to true for future pushes. Not sure why we need to do this, and it may be an issue only with Rails 3.* (see: https://devcenter.heroku.com/articles/rails-asset-pipeline)

RAILS_ENV=production bundle exec rake assets:precompile
Set precompile false in config/application.rb

config.assets.initialize_on_precompile = false
From http://refinerycms.com/guides/heroku…

This setting is required the first time you git push to heroku, because otherwise the precompile step of git push heroku master always fails with:

Connecting to database specified by DATABASE_URL rake aborted! could not connect to server: Connection refused Is the server running on host "127.0.0.1" and accepting TCP/IP connections on port 5432?

NOTE: The reference is not clear on this (although setting intially to false then true is mentioned elsewhere).

Check in files to git and commit changes

Note: add the Gemfile.lock along with all the other changes.

Push to heroku

git push heroku master
Set precompile option back to true in config/application.rb

config.assets.initialize_on_precompile = true
From http://refinerycms.com/guides/heroku…

Add config/application.rb to git and commit (!!)

... if you don't, the next push will fail

Push to heroku (Demonstrates that this time it succeeds)

git push heroku master
Migrate and seed on the Heroku database

heroku run rake db:migrate
heroku run rake db:seed
From http://refinerycms.com/guides/heroku

Ready to go!

Hopefully from here you have access to your RefineryCMS page, with all the Refinery CSS and images displaying correctly (both on the admin screens and when 'viewing website' but still logged in.

If you add an image using the Refinery menu you should subsequently be able to see that image added to your AWS bucket. I don't have thumbnails working yet.

#### After this shit

You then have to remove the globalize3 (= 0.3.0) in the gemfile. [From here.](https://groups.google.com/forum/#!msg/refinery-cms/3doWQdDKjGo/UaKaBU1hfTcJ)

Then if there is a problem in heroku for the home page after creating a page, make it so 









