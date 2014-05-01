# Philosophy
  
- Tests should be reliable.
- Tests should be easy to write.
- Tests should be easy to understand.
- We do not focus on speed.
- We do not focus on being overtly DRY.

## Gems:

`rspec-rails`: Rails wrapper for Rspec.
`factory_girl_rails`: Replaces fixtures with factories.
`faker`: Generates names, emails addresses, other placeholders for factories.
`capybara`: Makes it easy to programmatically simulate your users' interactions with your web application.
`database_cleaner`: Helps make sure each spec run in RSpec begins with a clean state
`launchy`: Opens your default web browser on demand to show you what your application is rendering.
`selenium_webdriver`: Lets you do JavaScript-based browser interactions with Capybara.

`rspec-rails` and `factory_girl_rails` are used in both the development and test environments, specifically by generators. The others are only used when you actually run your specs, so they're not necessary to load in development.

This also ensures that gems used solely for generating code or running tests aren't installed in your production environment when you deploy to your server.

To make sure there is a database to talk to: `$ bundle exec rake db:create:all`.

#### Installing RSpec

    $ bundle exec rails generate rspec:install

#### Generators

Thanks to the beauty of Railsties, just by loading `rspec-rails` and `factory_girl_rails`, Rails' stock generators will no longer generate the default Test::Unit files in tests, they'll generate RSpec files in `spec`.

You can manually specify settings for Rails' stock generators:

> config/application.rb

    config.generators do |g|
      g.test_framework :rspec,

> Generate a fixture for each model, using a Factory Girl factory

        fixtures: true,

> Skip generating view specs (we use feature specs in this book)

        view_specs: false,

> Skip helper specs

        helper_specs: false,

> Skip routing specs (for simple applications this is okay)

        routing_specs: false,
        controller_specs:true,

> We skip integration tests in spec/requests for now

        request_specs: false

> Generate factories instead of fixtures.

      g.fixture_replacement :factory_girl, dir: "spec/factories"
    end

#### Always be cloning

Every time you use `rake db:migrate`, you need to mirror that change in your database with `rake:db:test:clone`. Unknown db error = you haven't cloned yet.

This is chainable with rake `db:migrate:db:test:clone` or you can use the shortcut `rmigc` to run a migration and clone the database with a single command.
