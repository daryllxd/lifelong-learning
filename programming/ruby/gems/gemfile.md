## Bundler: What does `require: false` in a Gemfile mean?
[link](http://stackoverflow.com/questions/4800721/bundler-what-does-require-false-in-a-gemfile-mean)

- This means install the gem, but do not call `require` when you start Bundler. So you will need to manually call `require "whenever"` if you want to use the library.
- `gem 'whenever', require: 'however'` will make Bundler download that gem, but call `require 'howeaver'` (you use this if the name of the library to require is different than the same of the gem.
- There are some gems that you don't want to load them into every process. If a rake task would need certain gems that the rest of the application doesn't need, then you can `require: false` and explicitly `require 'the_gem'` from the rake task.
- `require: false` will not affect:
    - `bundle install`: The gem will get installed regardless
    - The `require` search path setup by bundler.
    - When you run `bundle exec`, you run `Bundler.require`, which requires all the gems in the Gemfile
- When Rails runs on startup, it wil run:
    - `config/boot.rb` (sets up the Bundler require path)
    - `config/application.rb` (actually requires the gems)
-You can use `require: false` for anything that you need to run from the command line, but don't need within your code.
