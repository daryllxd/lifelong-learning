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


