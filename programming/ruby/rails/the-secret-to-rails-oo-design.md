## The Secret to Rails OO Design
[link](http://blog.steveklabnik.com/posts/2011-09-06-the-secret-to-rails-oo-design)

    class Post < ActiveRecord::Base
      def self.as_dictionary
        dictionary = ('A'..'Z').inject({}) {|h, l| h[l] = []; h}

        Post.all.each do |p|
          dictionary[p.title[0]] << p
        end

        dictionary
      end
    end

We build up a dictionary to put our posts in it. But since we mix up a presentational concern into our model, we can fix that via a Presenter:

    class DictionaryPresenter
      def initialize(collection)
        @collection = collection
      end

      def as_dictionary
        dictionary = ('A'..'Z').inject({}) {|h, l| h[l] = []; h}

        @collection.each do |p|
          dictionary[p.title[0]] << p
        end

        dictionary
      end
    end

We can use it via `DictionaryPresenter.new(Post.all).as_dictionary`. *Benefits: presentation logic out of the model, new feature that ANY collection can be displayed as a dictionary, and we can easily write isolated tests for this presenter, and they will be fast.*

If we want to sort our Posts by title, this class will work but we might want to have other ways of categorizing the dictionary (non-title, or taking the second word in the title since "A" is pretty common. We take out `policy`:

    class DictionaryPresenter
      def initialize(policy, collection)
        @policy = policy
        @collection = collection
      end

      def as_dictionary
        dictionary = ('A'..'Z').inject({}) {|h, l| h[l] = []; h}

        @collection.each do |p|
          dictionary[@policy.category_for(p)] << p # !!!
        end

        dictionary
      end
    end

We can now inject a policy:

    class UserCategorizationPolicy
      def self.category_for(user)
        user.username[0]
      end
    end

    class PostCategorizationPolicy
      def self.category_for(post)
        if post.starts_with?("A ")
          post.title.split[1][0]
        else
          post.title[0]
        end
      end
    end

We can now do this:

    DictionaryPresenter.new(PostCategorizationPolicy, Post.all).as_dictionary

#### Taking complex calculations and turning them into objects

    class Quote < ActiveRecord::Base
      #<snip>
      def pretty_turnaround
        return "" if turnaround.nil?
        if purchased_at
          offset = purchased_at
          days_from_today = ((Time.now - purchased_at.to_time) / 60 / 60 / 24).floor + 1
        else
          offset = Time.now
          days_from_today = turnaround + 1
        end
        time = offset + (turnaround * 60 * 60 * 24)
        if(time.strftime("%a") == "Sat")
          time += 2 * 60 * 60 * 24
        elsif(time.strftime("%a") == "Sun")
          time += 1 * 60 * 60 * 24
        end

        "#{time.strftime("%A %d %B")} (#{days_from_today} business days from today)"
      end
    end

1. Create a new class for the computation
2. Define a method on that class to do the new work.
3. Copy the body of the old method over, and change variable references to instance variables.
4. Give it an initialize method that takes arguments to set the instance variables used in step 3.
5. Make the old method delegate to the new class and method.

Extract to `TurnaroundCalculator`, add `def calculate`, and refactor!

    class TurnaroundCalculator
      def calculate
        return "" if @turnaround.nil?

        "#{arrival_date} (#{days_from_today} business days from today)"
      end

      protected

      def arrival_date
        real_turnaround_time.strftime("%A %d %B")
      end

      def real_turnaround_time
        adjust_time_for_weekends(start_time + turnaround_in_seconds)
      end

      def adjust_time_for_weekends(time)
        if saturday?(time)
          time + 2 * 60 * 60 * 24
        elsif sunday?(time)
          time + 1 * 60 * 60 * 24
        else
          time
        end
      end

      def saturday?(time)
        time.strftime("%a") == "Sat"
      end

      def sunday?(time)
        time.strftime("%a") == "Sun"
      end

      def turnaround_in_seconds
        @turnaround * 60 * 60 * 24
      end

      def start_time
        @purchased_at or Time.now
      end

      def days_from_today
        if @purchased_at
          ((Time.now - @purchased_at.to_time) / 60 / 60 / 24).floor + 1
        else
          @turnaround + 1
        end
      end
    end

#### Domain Object in Rails routes

    root :to => 'dashboard#index', :constraints => LoggedInConstraint

    class LoggedInConstraint
      def self.matches?(request)
        current_user
      end
    end

Represent the constraint using a Ruby PORO.

#### Domain Object in Validations

    def SomeClass < ActiveRecord::Base
      validate :category_id, :proper_category => true
    end

    class ProperCategoryValidator < ActiveModel::EachValidator
      def validate_each(record, attribute, value)
        unless record.user.category_ids.include?(value)
          record.errors.add attribute, 'has bad category.'
        end
      end
    end
