# 2.x from the beginning (Official Capistrano docs)
[link](https://github.com/capistrano/capistrano/wiki/2.x-From-The-Beginning)

You have a domain name, found hosting, and did some reading on deploying Rails applications.

## Decision List

1. Web server: Apache, Lighttpd, nginx. If shared host, then this is already made for you.
2. Database: MySQL/PostgreSQL/Oracle/SQLite.
3. Ruby: JRuby, MRI Ruby?
4. Application Layer: The part that actually runs your application. Mongrel/Thin/Passenger.
5. Source Control: Subversion, Git.

## Steps

    $ capify . # Create the Capfile, which loads config/deploy.rb You usally leave the Capfile alone and tweak config/deploy.rb

Deployment Directory Structure: A successful deployment with Capistrano will result in something like this:

    deploy_to/releases
    deploy_to/releases/20080819001122
    deploy_to/shared
    deploy_to/shared/logs

Roles:

- `web`: Where your web server runs. Requests form the web go straight here. For sites with lots of traffic, you might have two or three web servers running behind a load balancer.
- `app`: This is where the app layer runs. You might need only a single web server, and have it send requests to any of 4-5 different app servers, via a load balancer.
- `db`: This is where migrations are run. Some prefer to not actually run code on the server where the database lives, so you can just set this to one of the app servers if you prefer. Capistrano will deploy your application to servers in this role. The `:primary => true` bit just says that this is our "primary" database server.

## Setting up the Server

    $ cap deploy:setup # Log into your server and do some mkdirs. Make sure the permissions to deploy are okay.
    $ cap deploy:check # Check both local and remote servers for stuff. If any of the  dependencies are not met, you'll get an error message indicating what the problems are.

Database: You need the DBMS and the actual database itself. You also need `production` in your `config/database.yml` file.

Pushing the code: `cap deploy:update` to copy the source code to the server, and update the "current" symlink to point to it, but it doesn't actually try to start your application layer.

    $ cap deploy:restart # Restart the application layer

# Deploying with Capistrano
[link](http://guides.beanstalkapp.com/deployments/deploy-with-capistrano.html)

In its simplest form, Capistrano allows you to copy code from your source control to your server via SSH, and perform pre and post-deploy functions like restarting a web server, busting cache, renaming files, running database migrations, and so on.

    $ gem install capistrano
    $ gem install capistrano-ext # Contains some tools to make your deployments even easier.

Preparing your project for Capistrano

    $ capify . # Project root, creates the Capfile and a template deployment recipe at config/deploy.rb in your Rails project.

## Capistrano Recipes

    set :application, "fancy_shoes"
    set :scm, :git
    set :repository, "git@account.git.beanstalkapp.com:/account/repository.git"
    set :scm_passphrase, ""

    set :user, "server-user-name" # The user we want Capistrano to run commands with

If you can't connect to the repository, neither can Capistrano. We can use the Capistrano Multistage function to set up one recipe to deploy your code to more than one location (such as staging and production).

    require 'capistrano/ext/multistage'

    set :stages, ["staging", "production"]
    set :default_stage, "staging" # Default is staging because it is more likely that you push there.

> `production.rb`

    server "my_fancy_server.com", :app, :web, :db, :primary => true
    set :deploy_to, "/var/www/fancy_shoes"

The difference between production and staging is the different `deploy_to` directory variables. In reality, you might want to use different servers too.

## Validating your Recipe

    $ cap deploy:setup # Cap will SSH to your server, enter the directory you specified, and create a special directory structure required for Cap to work properly.
    $ cap deploy:check # This makes sure that everything is set up correctly on the server from the setup command.

## Deploy

    $ cap deploy # This will perform a deployment to your default stage, which is staging
    $ cap production deploy # Deploy to prod

## Tips/Tricks

Improve performance with Remote Cache.

    set :deploy_via, :remote_cache

Add custom deploy hooks. You can configure events and command to run after the copying of files completes, such as restarting a web server, or running a custom script. Capistrano calls these "tasks".

    namespace :deploy do
      task :restart, :roles => :web do
        run "touch #{ current_path }/tmp/restart.txt"
      end

      task :restart_daemons, :roles => :app do
        sudo "monit restart all -g daemons"
      end
    end

`restart` task is built into Capistrano and will be executed by Capistrano automatically after your deployment is complete. We use the `touch tmp/restart.txt` technique that's common to modern Rails applications powered by Passenger, but your web server may require a different command.


