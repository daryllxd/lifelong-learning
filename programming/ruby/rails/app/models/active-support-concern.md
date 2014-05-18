# Put Chubby Models on a Diet with Concerns
[link](http://signalvnoise.com/posts/3372-put-chubby-models-on-a-diet-with-concerns#comments)

Different models in your Rails app might share the same functionality. In Basecamp, we have concerns such as `Trashable`, `Searchable`, `Visible`, `Movable`, `Taggable`.

    module Taggable
      extend ActiveSupport::Concern

      included do
        has_many :taggings, as: :taggable, dependent: :destroy
        has_many :tags, through: :taggings
      end

      def tag_names
        tags.map(&:name)
      end
    end

This concern can be mixed into all the models that are taggable and you'll have a single place to update the logic and reason about it. Here's a similar concern where all we add is a single class method:

    # current_account.posts.visible_to(current_user)
    module Visible
      extend ActiveSupport::Concern

      module ClassMethods
        def visible_to(person)
          where \
            "(#{table_name}.bucket_id IN (?) AND
              #{table_name}.bucket_type = 'Project') OR
            (#{table_name}.bucket_id IN (?) AND
              #{table_name}.bucket_type = 'Calendar')",
            person.projects.pluck('projects.id'),
            calendar_scope.pluck('calendars.id')
        end
      end
    end


Concerns are also a helpful way of extracting a slice of model that doesn't seem part of its essence (what is and isn't in the essence of a model is a fuzzy line and a longer discussion) without going full-bore Single Responsibility Principle and running the risk of ballooning your object inventory.

    module Dropboxed
      extend ActiveSupport::Concern

      included do
        before_create :generate_dropbox_key
      end

      def rekey_dropbox
        generate_dropbox_key
        save!
      end

      private
        def generate_dropbox_key
          self.dropbox_key = SignalId::Token.unique(24) do |key|
            self.class.find_by_dropbox_key(key)
          end
        end
    end

(Now any model that needs a dropbox mixes this concern in.

## Concerns (lol)

For the `Visible`, you can have `Viewer.visible(current_account.posts, to: current_user)` and encapsulate the query in a stand-alone object. For Dropboxed, you could have a Dropbox stand-alone class.

I find that concerns are often just the right amount of abstraction that they often result in a friendlier API. Especially in `taggable`.

## Comments

Concerns approach can fall flat on its face because of the tight coupling that you introduce by mixing into a single class lots of unrelated functionalities. You may even introduce dependencies between the concerns that you won't even notice util things break.

*This requires you to test if an object behaves as expected vs. having multiple objects responsible for just one thing that you can test in isolation and don't care about anything else.*

It's OK to use mixins to improve code organization but people forget that mixins in Ruby are just a form of INHERITANCE. And concerns are an abuse of inheritance.

