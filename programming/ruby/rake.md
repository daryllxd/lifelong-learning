## Use `bundle exec rake` or just `rake`?
[link](http://stackoverflow.com/questions/8275885/use-bundle-exec-rake-or-just-rake)

`bundle exec` executes a command in the context of your bundle. That means it uses the gems specified in your `Gemfile`. *Using `bundle exec` guarantees that the program is run with the environment specified in the `Gemfile`, which hopefully means it is the environment that the creators of the program want it to be run in, which means it should run correctly no matter what weird setup you have in your computer.*

`bundle exec rake db:migrate` will use the version of rake specified in the Gemfile (if none, the one in Gemfile.lock). `rake db:migrate` will use the system command listed in your PATH environment variable.

To see which version do `which rake` or `which bundle exec rake`.

