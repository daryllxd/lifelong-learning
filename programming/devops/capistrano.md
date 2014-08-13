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


