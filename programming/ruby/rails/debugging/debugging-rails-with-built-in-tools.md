# Debugging Rails With Built-in Tools
[link](http://www.jackkinsella.ie/2014/06/06/debugging-rails-with-built-in-tools.html)

Compiler checks. Editor plugins like `Syntastic` run the syntax check on saving a file, displaying any resulting errors within Vim.

Gemfile.lock. When troubleshooting, figure out the exact version by referring to the Gemfile.lock.

Middleware lister. (`$ rake middleware`) Use this to ensure that custom middleware you added was picked up by the Rails application and placed in the right place.

View application routes. (`localhost:3000/rails/info/routes/`)

SQL database access. (`$ rails dbconsole`)

Rake tasks. (`$ rake -T `)

`better_errors/frames`. Use `better_errors` and `binding_of_caller`.

# Debugging Rails with Pry Console
[link](http://www.jackkinsella.ie/2014/06/06/debugginging-rails-with-pry-console.html)

Replace the typical Rails console with the `pry` console.

- `ls`: Wrapper to check: methods, instance variables, constants, local variables, instance methods, class variables.
- `ls -G`: Filters that.
- `cd`

# Debugging Rails with Pry Debugger
[link](http://www.jackkinsella.ie/2014/06/06/debugging-rails-with-pry-debugger.html)

[TODO]: THIS

# Debugging Rails with Git
[link](http://www.jackkinsella.ie/2014/06/06/debugging-rails-with-git.html)

    $ git log -Gturbolinks --pretty=oneline # Returns all git commits which added or removed "turbolinks", whether a method name, code comment, or part of the documentation.
    $ git diff 9ce85 --config/routes.rb # Compares the state of the config/routes.rb file with the state at the commit 9ce85.
    $ git bisect # Solves a problem of "where is the bug" by marking a commit where you know that the code is working, another commit where the code is not working, and checking out different versions between the two makred commits for you to test whether the bug is present.

# Debugging Rails with Online or Third Party Tools
[link](http://www.jackkinsella.ie/2014/06/06/debugging-rails-with-online-or-third-party-tools.html)

- New Relic: Information about Ruby exceptions raised, application uptime, and application speed (web requests, database calls, external service calls, browser rendering times). Production is focused on post-facto reporting and the development tool on in-depth debugging.
- To use the development New Relic tool, load the app locally using a "caching on" environment to simulate caching on requests. Visit `/newrelic`, perform a slow action in another tab, and refresh. New Relic will display a breakdown of the SQL statements and the Ruby methods that generated these statements.

# Debugging Rails with Logs
[link](http://www.jackkinsella.ie/2014/06/06/debugging-rails-with-logs.html)

*Manage your log tab with Linux.* You can do:

    $ tail -f log/development.log | ag Rendered

To display the lines containing the string "Rendered"

Logs are separated by a line of white space, so check these out.

*Intentional logging.* It is always faster to throw a `binding.pry` rather that intentionally logging things. Intentional logging is used in production for bugs that are difficult or impossible to reproduce in your development environment.

*Logging in as a particular user.* Sometimes what you can do is to download the production database freshly to your development machine, find the user experiencing bugs in the console, and reset the user password to something generic.

