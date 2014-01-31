## Bundler

When we create a new Rails application `bundle install` or `bundle` is run so that all the gems the application depends on are installed. This includes all the gems listed in the gemfile and their dependencies.

When we add a gem to the gemfile we don’t need to specify a version number. If we omit the version number Bundler will use the latest released version by default. If we run bundle install again later after a new version of a gem has been installed the version that was first installed will stay. The reason for this is that the version number of the installed version for each gem in the application is stored in a Gemfile.lock file.

    gem 'capistrano', '~> 2.11.2'

The ~ means only update cap if the last number is changed.

    gem 'rails', :git => 'git://github.com/rails/rails.git'

Install from git, not gem.

    gem 'rails', path: '~/code/rails'

If the project in the local system, we specify a path and this will be used.

#### Groups

Groups help control when a gem should be installed or loaded. We can make as many groups as we want but Rails has some default behaviour for certain groups.

The `assets` group is loaded in both the test and development environments but not in production. We can see this behaviour if we take a look at the config/application.rb file.

    if defined?(Bundler)
      # If you precompile assets before deploying to production, use this line
      Bundler.require(*Rails.groups(:assets => %w(development test)))
      # If you want your assets lazily compiled in production, use this line
      # Bundler.require(:default, :assets, Rails.env)
    end

The Rails.groups method is a way of saying that Bundler should only load the gems in the assets group in the development and test environments. We can control exactly which groups Bundler loads here.

When we run bundle install it installs gems from all groups by default. We can customize this behaviour by passing in various options which we can see by running bundle help install. The options listed include a without option that we can use to exclude groups that we don’t want to be included in the installation. If we use Capistrano for deployment we don’t have to worry about this too much in production as it will automatically.

#### Bundle exec

Some gems provide an executable that we can run from the command line, rake being one of the most common.  If we prefix the call to rake with bundle exec it will force the version to the version on which our application depends.