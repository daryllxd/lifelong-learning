# Component-based Architectures in Ruby and Rails
[link](http://www.confreaks.com/videos/2350-mwrc2013-component-based-architectures-in-ruby-and-rails)

Rails doesn't have a namespace, and gems have a namespace. Try namespacing everything next time. *Give yourself a box so you can start thinking outside of it. At least you can now see which things fit in the box and which things don't.*

*The secret to building large apps is never build large apps. Break your applications into small pieces. Then, assemble those testable, bite-sized pieces into your big application.*

- 1: Same like Rails, no structure.
- 2: Modules/folders.
- 3: Gem component app. The tests are inside the gem. (Create gem folder)

    gem 'annoyance', path: 'gems/annoyance' # Put this in the Gemfile so you can use it.

*Choose modules that tell the story of the system and contain a cohesive set of concepts.* We are now able to prove that the concepts inside the gem are independent of each other.

- 4: Rails component app. If I have dependencies towards anything Rails-ish, I need a provable structure for Rails, and that is the engine. *Engines are not just for pagination/admin, and authentication.* Some of the engines have assets/controllers/views, some a re just models. As for specs, we can have a shell script for testing the apps according to engine.

- 5: Clearer responsibilities.
- 6: Service-oriented app. Reduce surface areas over methods. ActiveRecord classes never state what it is all about.
- 7: The ecosystem app. `gem build event_counter`, put it out as a gem.
- 8: The HTTP SOA app. Since we already extracted an engine, we can turn it into a mini-app (Sinatra?) and supply an endpoint.

