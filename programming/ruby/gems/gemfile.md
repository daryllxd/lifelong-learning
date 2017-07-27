## Bundler: What does `require: false` in a Gemfile mean?
[link](http://stackoverflow.com/questions/4800721/bundler-what-does-require-false-in-a-gemfile-mean)

- This means install the gem, but do not call `require` when you start Bundler. So you will need to manually call `require "whenever"` if you want to use the library.
- `gem 'whenever', require: 'however'` will make Bundler download that gem, but call `require 'howeaver'` (you use this if the name of the library to require is different than the same of the gem.
- There are some gems that you don't want to load them into every process. If a rake task would need certain gems that the rest of the application doesn't need, then you can `require: false` and explicitly `require 'the_gem'` from the rake task.
- `require: false` will not affect:
    - `bundle install`: The gem will get installed regardless
    - The `require` search path setup by bundler.
    - When you run `bundle exec`, you run `Bundler.require`, which requires all the gems in the Gemfile
- When Rails runs on startup, it will run:
    - `config/boot.rb` (sets up the Bundler require path)
    - `config/application.rb` (actually requires the gems)
-You can use `require: false` for anything that you need to run from the command line, but don't need within your code.

## What is a Gemfile
[Reference](http://tosbourn.com/what-is-the-gemfile/)

- Gemfile is evaluated as Ruby code. When it is evaluated by Bundler the context it is allows us access to certain methods that we will use to explain our gem requirements.
- `source https://rubygems.org`: While we usually set Ruby Gems to be the source for gems, we can define a path for a local gem or a git path for a gem hosted somewhere like Github.
- You can call `#source` as a block:

``` ruby
source "https://my_awesome_source.com" do
  gem "my_gem"
  gem "my_other_gem"
end
```

- `bundle config my_gem_source.com my_username:my_password`.
- Set up Ruby information: `ruby "1.9.3", :patchlevel => "247", :engine => "jruby", :engine_version => "1.6.7"`
- Pessimistic inclusion: `~> 2.0`, allow any version of 2.x to be installed, but nothing from version 3.x.
- In `config/application.rb`, `Bundler.require(:default, Rails.env)` means require all the gems that have been assigned a group of the same name as your Rails environment.
- Requiring gems:
  - `gem 'my_gem', require: false` to not load this when `Bundler.require` is called.
  - `gem 'my_gem', require: 'my_gem/...'` to not manually require all functionalities of the gem.
  - `group :development, optional: true { ... }`, to install these gems the user has to do `bundle install --with development`.
- Gem platforms: `ruby`, `mri`, `jruby`, `mswin`. You can do `platforms :jruby do ... end`.
- Git: `gem 'my_gem', git: 'ssh@github.com/tosbourn/my_gem'`, preferred to SSH to install the gem.
- If you are storing your gem in a repository it should contain at least one file at the root of the directory with a `.gemspec` extension. This should contain a valid gem specification.
- Conditionally installing gems:

``` ruby
install_if -> { RUBY_PLATFORM =~ /darwin/ } do
  gem "my_osx_gem"
end
```
