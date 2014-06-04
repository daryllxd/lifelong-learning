# 10 Most Common Mistakes that Rails Programmers Make
[link](http://www.toptal.com/ruby-on-rails/top-10-mistakes-that-rails-programmers-make)

1. Controller

- Session/cookie handling.
- Model selection. Logic for finding the right model object given the parameters passed in from the request. This should be a call to a single find method setting an instance variable to be used later to render the response.
- Request parameter management. Gather request parameters and call the model method to persist.
- Rendering/redirecting. Rendering or redirecting as appropriate.

2. View - user presenters/decorators/partials/layouts.
3. Model - don't put stuff like email notifications, interfacing the external services, converting to other data formats. Add POROs. In the model:

- AR configuration (relations and validations)
- Simple mutation methods to encapsulate updating a handful of attributes and saving them in the database
- Access wrappers to hide internal model information (`full_name`)
- Sophisticated queries: Use `where` or other query-building methods like it.

4. Ignoring logs. Check the query and see if you can do eager loading (N+1 problem).
5. Blocking on calls to external services. Use Delayed Job/Resque/Sidekiq.
6. When migrations have gotten out of hand and take too long to run, clear out the old migrations, dump a new schema, and continue on from there. `rake db:schema:load`, not `rake db:migrate`.
