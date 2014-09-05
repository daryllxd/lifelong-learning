# Deploying with Capistrano

- V3 uses the Rake DSL instead of a specialized Capistrano one; this makes writing Capistrano tasks exactly like writing rake tasks.
- It uses SSHkit for lower level functions around connecting and interacting with remote machines. This makes writing convenience tasks like streaming logs or checking processes much easier.

    gem 'capistrano'
    gem 'capistrano-rails'
    gem 'capistrano-bundler'
    gem 'capistrano-rbenv'

    bundle exec cap install

    Capfile
    config
      deploy
        production.rb
        staging.rb
      deploy.rb
    lib
      capistrano
        tasks

Capistrano is like working with Rake but with additional functionality specific to deployment work flows. The Capfile is just a Rakefile.

When setting variables which are to be used across Capistrano tasks, we use the `set` and `fetch` methods provided by Capistrano. We can set a configuration value in `deploy.rb` and in our stage files with:

    set :key_name, "value"
    get :key_name

    set :tests, ["spec"] # Run which specs should be run before deployment is allowed to continue

## Hooks

    namespace :deploy do
      before :deploy

      # make sure we're deploying what we think we're deploying
      before :deploy, "deploy:check_revision"

      # only allow a deploy with passing tests to be deployed
      before :deploy, "deploy:run_tests"

      # compile assets locally then rsync
      after 'deploy:symlink:shared', 'deploy:compile_assets_locally'
      after :finishing, 'deploy:cleanup'
    end

## Setting up Stages

A stage is a single standalone environment that an application runs in. Stages are defined in `config/deploy/`. We invoke Capistrano tasks in the format:

    cap stage_name task # stage_name is the name of a .rb file in config/deploy. (This means we can have several stages, not just staging and production.)

In the sample configuration, the production stage looks like this:

    set :stage, :production
    set :branch, "master"
    server 'hostname.tld', user:'user_person', roles: %w{web app db}, primary: true
    set :deploy_to, "/home/coffeego/staging"
    set :rails_env, :production
    set :unicorn_worker_count, 5
    set :enable_ssl, false
