# Gang of Four Design Patterns in Ruby Facade

Facade = Super important.

    class ProductController
      attr_reader :product
      def show(id)
        @product = ProductFinder.find(id) # ProductFinder does the lifting, but the product controller is a facade to the one doing the job.
      end
    end

    class ProductFinder
      def self.find(id)
        PRODUCT
      end
    end

This is what you also do when you say "Rails is a front-end".

## Facade
[Link](http://robots.thoughtbot.com/sandi-metz-rules-for-developers)

*Only instantiate one object in the controller.*

Often, we needed more than one type of thing on a page. Ex: A homepage needed both an activity feed and a notification counter.

We solved this using a Facade Pattern.

> `app/facades/dashboard.rb`:

    class Dashboard
      def initialize(user)
        @user = user
      end

      def new_status
        @new_status ||= Status.new
      end

      def statuses
        Status.for(user)
      end

      def notifications
        @notifications ||= user.notifications
      end

      private

      attr_reader :user
    end

> `a/c/dashboards_controller.rb`:

    class DashboardsController < ApplicationController
      before_filter :authorize

      def show
        @dashboard = Dashboard.new(current_user)
      end
    end

> `a/v/dashboards/show.html.erb`:

    <%= render 'profile' %>
    <%= render 'groups', groups: @dashboard.group %>

    <%= render 'statuses/form', status: @dashboard.new_status %>
    <%= render 'statuses', statuses: @dashboard.statuses %>

The Dashboard class provided a common interface for locating the user's collaborator objects and we passed the dashboard's state to view partials.

We didn't count instance variables in controller memoizations toward the limit. We used a convention of prefixing unused variables with an underscore to make it clear what is meant to be used in a view:

    def calculate
      @_result_of_expensive_calculation ||= SuperCalculator.get_started(thing)
    end

# Ruby Best Practices: Facade
[link](http://blog.rubybestpractices.com/posts/gregory/060-issue-26-structural-design-patterns.html)

The Facade pattern simplifies how users interact with a codebase by implementing an interface that hides many implementation details for the most common behaviors needed by consumers.

Ex: Open-uri standard library, you can make reading a resource via HTTP GET look and feel like opening an ordinary file.

> Without Facade:

    require 'net/http'
    require 'uri'

    url = URI.parse('http://www.google.com')

    res = Net::HTTP.start(url.host, url.port) {|http|
      http.get('/index.html')
    }

    puts res.body

> With Facade:

    require "open-uri"

    puts open("http://www.google.com").read

*It's worth keeping in mind that pretty much every DSL you encounter is a Facade of some form or another.*

# Design Patterns in Ruby: Facade
[link](http://designpatternsinruby.com/section02/facade.html)

A facade is a simple interface to a complex subsystem.

The one true enemy is complexity. If we could say all the programming things we want in a simple way, then our work would be a lot easier. The Facade says that if you cannot avoid complexity, then the next best thing to do is to isolate it, to keep it from contaminating your whole system.

Software facades are just a compromise--you are trying to expose just the functionality that you need while holding back the tide of complexity. You want to expose enough of the underlying system to allow the clients of the facade to get their work done, without reproducing original complex interface in just another form.

The trouble with adding features to your subsystem via its facade are many. First, you are muddying up the purpose of your facade: it is suppose to be there to simplify access to the subsystem, not to enhance the thing. Second, if you add features to your facade and then later realize that you need a second facade for the same subsystem, the second facade is not going to have all those nifty new features. If you need to add features to your subsystem, add them to your subsystem – remember, open classes in Ruby means never having to say you are sorry. If you can't do that, then enhance your subsystem in some other class (perhaps with a decorator?) and build a facade on that.

Facades are meant to be seawalls, holding back the tide of complexity. You can't do that and add features at the same time.

# Essential Ruby On Rails patterns — part 3: Clients and Wrappers
[Reference](https://medium.com/selleo/essential-rubyonrails-patterns-clients-and-wrappers-c19320bcda0)

- Clients/Wrappers: used for working with external services, libraries, or APIs.
- Wrappers/Facades work best as a layer encapsulating other libraries with complex interfaces or the one that is not very expressive especially in the domain of our app.
- Methods should reflect wrapped endpoints.
- Results should reflect responses of wrapped endpoints (try not to transform the JSON from the external service).
- Provide references.
- Expressive naming.
- Separate from the main app (the client should possess zero knowledge about the app itself and serve only as an interface to the external resources).
- Provide an instance Client that users can work with.

## Wrapper

- *Think about Wrapper as an encapsulation of another library to facilitate interaction with this library, making it more expressive and better suited for our purposes.*
- Static methods since it is usually a user-and-forget tool?
- Isolate from app.
- You can create your own class for the JSON response.
