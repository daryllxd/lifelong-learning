# Dry-Validation as a schema validation layer for Ruby on Rails API
[Reference](https://mensfeld.pl/2017/03/dry-validation-as-a-schema-validation-layer-for-ruby-on-rails-api/)

- ActiveRecord::Validations? They work, but they aren't designed as a protection layer for ensuring incoming data schema consistency. The external world and its data won't always resemble your internal application structure.
- Integrating with Rails:
  - No more strong parameters.
  - Schema testing in isolation, not in the controller request!
  - Model validations that focus only on the core details.
  - Less coupling in your business logic.
  - Safer extending and replacing of endpoints.
  - More DRY.
  - Nested structures validation.
- Non-obstructing data schema, you can do a `before_action`. Lol.

## Comments

- AR::V is used for validating DB records, the input your app receives often doesn't match what you store in the database. That's the fundamental problem with AR::Validations.
- The problem with self-validating objects is that it mixes "data" with the object's state.
- Self-validating objects means that it's allowed for a domain object to be an invalid state. (So you need to check that too?)
