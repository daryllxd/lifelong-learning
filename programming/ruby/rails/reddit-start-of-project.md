    rails new NAME_OF_APP -m https://raw.github.com/RailsApps/rails-composer/master/composer.rb

    create controller
    rails g controller Users

    create static pages controller
    rails g controller Pages

    fix routes
    get "/faq", to: 'pages#faq', as: 'faq'
    get "/about", to: 'pages#about', as: 'about'

    add devise
    gem devise, bla bla bla

    create model
    rails g model User

    run migrations both to development and test
    rake db:migrate
    rake db:test:prepare

    Typus?


- Switch db adapter
- Add dev gems: `better_errors`, `binding_of_caller`, `thin`, `pry`, `quiet_assets`, git repo
- Consider if I'll be using hstore for postgres and add a migration to serve it.
- Models/routes.
- No staged version of the app until schema, routes, controllers are set up enough to provide a working system with core functionality.
- Rails composer, suspenders, railsbricks
- `exception_notification`. Absolute bloody life-saver.
- slim and sass, get bourbon installed
- Guard and Rspec and start writing some tests.

Use a Rails template and keep it updated with all the best stuff you find and love to use.
