# Important:

Add this (`#!/usr/bin/env ruby`) to top of Guardfile so syntax highlighting is enabled for the Guardfile.

## Guard
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
