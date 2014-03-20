## Facade
[Link](http://robots.thoughtbot.com/sandi-metz-rules-for-developers)

*Only instantiate one object in the controller.*

Often, we needed more than one type of thing on a page. Ex: A homepage needed both an activity feed and a notification counter.

We solved this using a Facade Pattern.

> app/facades/dashboard.rb:

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

> a/c/dashboards_controller.rb:

    class DashboardsController < ApplicationController
      before_filter :authorize

      def show
        @dashboard = Dashboard.new(current_user)
      end
    end

> a/v/dashboards/show.html.erb:

    <%= render 'profile' %>
    <%= render 'groups', groups: @dashboard.group %>

    <%= render 'statuses/form', status: @dashboard.new_status %>
    <%= render 'statuses', statuses: @dashboard.statuses %>

The Dashboard class provided a common interface for locating the user’s collaborator objects and we passed the dashboard’s state to view partials.

We didn’t count instance variables in controller memoizations toward the limit. We used a convention of prefixing unused variables with an underscore to make it clear what is meant to be used in a view:

    def calculate
      @_result_of_expensive_calculation ||= SuperCalculator.get_started(thing)
    end
