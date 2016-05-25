## Deploy your Rails App to AWS
[link](https://www.sitepoint.com/deploy-your-rails-app-to-aws/web)

    $ Basic rails app
    $ rails new contractbook -d postgresql
    $ cd contactbook
    $ rails g scaffold Contact name:string address:string
    $ rake db:create && rake db:migrate
    $ rails s

Puma--application server, Capistrano--deployment tool. Capistrano provides integration for Puma and RVM, so add gems to the Gemfile. Figaro--to save application configuration, such as the production database password and secret key.

    gem 'figaro'
    gem 'puma'
    group :development do
      gem 'capistrano'
      gem 'capistran3-puma'
      gem 'capistrano-rails', require: false
      gem 'capistrano-bundler', require: false
      gem 'capistrano-rvm'
    end

    $ bundle install
    $ cap install STAGES=production # creates configuration files for Capistrano (config/deploy.rb, config/deploy/production.rb)

Capfile

    require 'capistrano/bundler'
    require 'capistrano/rvm'
    require 'capistrano/rails/assets'
    require 'capistrano/rails/migrations'
    require 'capistrano/puma'

deploy.rb

    lock '3.4.0'

    set :application, 'contactbook'
    set :repo_url, 'git@github.com:devdatta/contactbook.git'
    set :branch, :master
    set :deploy_to, 'home/deploy/contactbook'
    set :pty, true
    set :linked_files, %w{config/database.yml config/application.yml}
    set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system public/uploads
    set :keep_releases, 5
    set :rvm_type, :user
    set :rvm_ruby_version, 'jruby-1.7.19'


