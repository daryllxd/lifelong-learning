# Important:

Add this (`#!/usr/bin/env ruby`) to top of Guardfile so syntax highlighting is enabled for the Guardfile.

## Railscasts Guard
- Tedious to run rake command always
- Guard is a generic way to watch files.
- Guard-rspec, guard-cucumber
- Need the `rb-fsevent, platform: /darwin/i` gem to use guard in OS X
- Install growl if you want notification support.

Watching left = right executes

    watch('spec/spec_helper.rb')                       { "spec" }
      watch('config/routes.rb')                          { "spec/routing" }
      watch('app/controllers/application_controller.rb') { "spec/controllers" }
      watch(%r{^spec/.+_spec\.rb})
      watch(%r{^app/(.+)\.rb})                           { |m| "spec/#{m[1]}_spec.rb" }
      watch(%r{^lib/(.+)\.rb})                           { |m| "spec/lib/#{m[1]}_spec.rb" }
      watch(%r{^app/controllers/(.+)_(controller)\.rb})  { |m| ["spec/routing/#{m[1]}_routing_spec.rb", "spec/#{m[2]}s/#{m[1]}_#{m[2]}_spec.rb", "spec/requests/#{m[1]}_spec.rb"] }
      watch(%r{^app/views/(.+)/})                        { |m| "spec/requests/#{m[1]}_spec.rb" }

The official docs says to require all 3 gems (Linux, OS X and Windows). The gem will know which one to use.

    ruby
    group :development do
        gem 'rb-inotify', :require => false
        gem 'rb-fsevent', :require => false
        gem 'rb-fchange', :require => false
    end

## Official Docs

Guard shows a Pry console whenever it has nothing to do and comes with some Guard specific Pry commands:

    ↩, a, all: Run all plugins.
    h, help: Show help for all interactor commands.
    c, change: Trigger a file change.
    n, notification: Toggles the notifications.
    p, pause: Toggles the file listener.
    r, reload: Reload all plugins.
    o, scope: Scope Guard actions to plugins or groups.
    s, show: Show all Guard plugins.
    e, exit: Stop all plugins and quit Guard

The all and reload commands supports an optional scope, so you limit the Guard action to either a Guard plugin or a Guard group like:

    [1]  guard(main)> all rspec
    [2]  guard(main)> all frontend

#### Guardfile DSL

    guard :coffeescript, input: 'coffeescripts', output: 'javascripts'
    watch('Gemfile')    

String watch patterns are matched with String#==. You can also pass a regular expression to the watch method:

    guard :jessie do
      watch(%r{^spec/.+(_spec|Spec)\.(js|coffee)})
    end

This instructs the jessie plugin to watch for file changes in the spec folder, but only for file names that ends with _spec or Spec and have a file type of js or coffee.

    guard :rspec do
      watch(%r{^lib/(.+)\.rb$}) { |m| "spec/lib/#{m[1]}_spec.rb" }
    end

#### Guard Shell

To run everything on start pass `:all_on_start` to #guard:

    guard :shell, :all_on_start => true { }

Notifications:

    guard :shell do
      watch /.*/ do |m|
        n m[0], 'File Changed'
      end
    end

- First arg: Body of the message
- Second: Title for notification
- Third: Image to use( `:success`, `:pending`, `:failed`)
