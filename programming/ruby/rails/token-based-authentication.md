## Token-based authentication with Ruby on Rails 5 API
[Reference](https://www.pluralsight.com/guides/ruby-ruby-on-rails/token-based-authentication-with-ruby-on-rails-5-api)

- Benefits
  - CORS/cross-domain. Able to make AJAX calls to any server, on any domain.
  - Stateless. No need to keep a session store since the token is an entity.
  - Decoupling: API can be called from anywhere with a single authenticated command.
  - Mobile ready.
  - CSRF:
  - Performance: Network round trip (finding a session in the database) will take longer than calculating code.
- JWT token contains:
  - Header: Contains the type of token and the type of encryption algorithm encoded in base-64.
  - Payload: Contains information about the user and role.
  - Signature: Identifies the thing.
- They use `simple_command` with the command pattern.
