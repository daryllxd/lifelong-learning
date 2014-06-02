# Building a tested, documented, and versioned JSON API using Rails 4
[link](http://www.emilsoman.com/blog/2013/05/18/building-a-tested/)
Use `rails-api` to remove the stuff that you don't need for an API. No more view layer that renders and HTML view for every request.

Cucumber for integration tests, to test the API and also for documenting them. Devise for authentication. Version APIs as per best practices.

## Rails-API

- Gemfile `rails-api`
- `ApplicationController` should inherit from `ActionController::Api`.

## Devise for authentication

Devise doesn't work out of the box for a Rails app built on `rails-api`. We need to add this to `ApplicationController`:

    include ActionController::MimeResponds
    include ActionController::StrongParameters

Create `CustomDevise::SessisonsController` which inherits from `Devise::SessionsController` to override the `create` method.

## Token-based Authentication

Base URI
Media type
HTTP methods/verbs
HATEOAS gonna hate

 You want only one entry point
