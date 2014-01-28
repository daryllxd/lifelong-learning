## The Rails Command Line

    rails n
    rails s # launches a small web server named WEBrick which is bundled with Ruby
    rails s –e production –p 4000 # environment production, port 4000
    rails g controller NAME [action action] [options] # generates a controller with specific actions.

    rails g model NAME [field[:type][:index] field[:type][:index]] [options]
    rails g scaffold HighScore game:string score:integer # a full set of model, database migration, controller, view, test suite

    rails c staging # set the environment
    rails c –sandbox # no data is changed

    rails dbconsole # figures out what db you are using and goes to its CLI

    rails runner “Model.long_method” # runs Ruby code in the context of Rails non-interactively

    rails d model # DESTROYYYY

## Rake

    $ rake --tasks
    $ rake about                # Lists versions of Rails frameworks
    $ rake assets:clean         # Remove compiled assets
    $ rake assets:precompile    # Compile shit
    $ rake db:create            # Create db from config/database.yml
    $ rake log:clear            # No more logs
    $ rake middleware           # Print middleware stack
    $ rake tmp:clear            # Clear session, cache, socket files
    $ rake tmp:create           # Creates tmp directories for sessions, cache, sockets and pids

    $ rake doc:app              # Generate docu in doc/app
    $ rake doc:guides           # Generate guides in doc/guides
    $ rake doc:rails            # Generate API documentation
    $ rake notes                # Look for comments with FIXME, OPTIMIZE, TODO
    $ rake routes               # List all defined routes
    $ rake test                 # Thingie
    $ rake tmp:clear            # Clear cache?

Custom Rake Tasks: Add a `.rake` extension and place them in `Rails.root/lib/tasks`.
k
