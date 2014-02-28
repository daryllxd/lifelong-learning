## General
- Don't duplicate the functionality of a built-in library.
- Don't "fail silently".
- Don't write code that guesses future functionality.
- Exceptions: Only do it when you REALLY have to. Ex: Files. If a file "should have been there", then yes throw one. If it doesn't seem exceptional if you can't find a file, then return an error.
- Prefer simple to easy.

## OOD
- Avoid global variables, long parameter lists.
- Limit collaborators of an object (entities an object depends on).
- Limit an object's dependencies (entities that depend on the object).
- Prefer composition over inheritance.
- Small methods (1-5 lines).
- < 100 lines.
- TELL DON'T ASK.

## HTML/CSS
- Don't use a reset button for forms.
- Prefer cancel links to cancel buttons.
- Use `image-url` and `font-url`, not `url`, so asset pipeline will re-write the correct paths to assets.
- Don't support clients w/o JS.
- Don't support IE6 or IE7.

## Ruby
- AVOID OPTIONAL PARAMETERS.
- Avoid monkey-patching.
- Prefer classes to modules when designing functionality that is shared by multiple models.
- Use `protected` only for comparison methods.

## Rails
- Avoid bypassing validations like `save(validate: false)`, `update_attribute`, and `toggle`.
- Avoid instantiating more than one object in controllers.
- `dev:prime` rake task for development environments seed data.
- __Don't reference a model class from the view.__
- __Don't use instance variables in partials. Pass local variables to partials from view templates.__
- User `_url` suffixes for named routes in mailer views and redirects. Use `_path` suffixes for named routes everywhere else.
- Validate the associated column `belongs_to` the object (`user`), not the column (`user_id`).
- Use SQL and not AR models in migrations.
- Don't change a migration after it has been merged into master if the change can be solved with another migration.
- Don't use SQL outside of models.
- `db/seeds.rb` for data required in all environments.

## Testing
- Use a single level of abstraction with scenarios.
- Avoid `its`, `let`, `let!`, `specify`, `before`, and `subject` in Rspec.
- Avoid using instance variables in tests.
- Don't test private methods.
- Use an `it` example or test method for each execution path through the method.

## Testing (read this part)
- Use assertions about state for incoming messages.
- Use stubs and spies to assert you sent outgoing messages.
- Use stubs and spies (not mocks) in isolated tests.
- Use a `Fake` to stub requests to external services.
- Test background jobs with `Delayed::Job` matcher.
- Avoid `any_instance` in rspec-mocks and mocha.

## Postgres
- Avoid multicolumn indexes in PG.
- Consider a partial index for queries on booleans.
- Constain most columns as NOT NULL.
- Index foreign keys.

## Ruby Gems
- Dependencies in `<PROJECT_NAME>.gemspec` file.
- Reference the `gemspec` in the `Gemfile`.
- Appraisal to test the gem against multiple versions of gem dependencies.
- Bundler to manage dependencies.
- Travis CI for CI.

## Background Jobs
- Store IDs, not AR objects for cleaner serialization, then refind the AR object in the `perform` method.

## Email
- Use SendGrid or Amazon SES to deliver email in staging/production environments.
- Use Mailview to look at each created or update mailer view before merging.

## Shell

## Bash
