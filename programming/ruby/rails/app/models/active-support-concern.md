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

# Reddit `/r/rails`
[link](http://www.reddit.com/r/rails/comments/27dy1a/eli5_concerns/)

Concerns are just modules you can include in your classes, instead of duplicating that code all over the place.

---

Many of our models have "tokens" that function as surrogate primary keys and are used in place of the database id in URLs and such. Because they have the same needs/properties:

    module TokenFindable
      extend ActiveSupport::Concern

> A token needs to be generated during new record initialization

      included do
        after_initialize :make_token
      end

> This makes sure that it is unique

      def make_token
        if new_record?
          self.token ||= SecureRandom.uuid
          on_token_creation
        end

        true
      end

      # Extension point for models or any inheriting concerns to do
      # work immediately after the token value is in place.
      def on_token_creation
      end

> Override `to_param` to return the token instead of the database ID

      def to_param
        token || super
      end
    end

The point of concerns is to take behavior that multiple models share and put it in one place. The tiny bit of code for concerns is worth it for the headaches it solves.

---

We always want to filter on whether things are active or not (we never delete, only archive) and to default status to active on new members. So we have `module Visibility`.

Concerns are just Ruby modules. A sign of a badly designed Rails app is one where the `lib` folder is empty and all classes in `app/models` inherit from AR::Base. Fixing this design by moving stuff out from the models into mixins doesn't really help.

# Why I Don't Use ActiveSupport::Concern
[link](http://blog.coreyhaines.com/2012/12/why-i-dont-use-activesupportconcern.html)

- Unlike other Rails-based bastardization of concepts and names, ActiveSupport::Concern has very little to do with common connotations of "concern."
- It tightly couples a useful design concept to a single, possibly-least-optimal implementation of the idea (mixins).
- Its implementation is actual hiding a dependency management system. This hides design issues that are highlighted when you are more explicit.

*This is a common problem I've seen: people (rightfully) wait to extract domain concepts until they present themselves, then miss the point in time when they can be easily extracted.*

Although there are times when it can be the simplest, or at least an interim, solution, allowing a module to depend on another module should be treated as a design smell. This smell often flags a missing, but needed, service object. *Unfortunately, idiomatic Rails design seems to shy away from more service-focused objects, relying on the "everything is in the AR model" design.*

After some investigation, I narrowed it down to the modules that were relying on ActiveSupport::Concern, rather than just using Ruby's built-in include functionality. This shocked me, as I assumed that ActiveSupport::Concern was just an alternate syntax for Ruby's include/extend functionality. I was working with a pre-existing codebase, so I was just going by what I had read in blog posts, which emphasized the syntax. Now, personally, I dislike the syntax and find it to be one of the more unnecessary "syntactic sugar" pieces in an otherwise useful set of helpers provided with Rails.

DHH recently wrote a reasonable blog post about separating out the different concerns of your AR models into modules. Unfortunately, he consistently confuses ActiveSupport::Concern (dependency management for module inclusion) with concern (orthogonal, possibly reusable modules containing conceptually related groups of functionality). By doing this, Rails once again is co-opting a term that is commonly used and has a well-established mechanism in Ruby (include/extend) and replacing it with a capitalized extra dependency.

With the complexity (both inherent in the problem and caused by the choice of design) in Rails, I can see a need for a component that does what ActiveSupport::Concern does, managing module-to-module dependencies. *But, why not have this as a separate, well-named component?* On the surface, Rails purports to have a focus on usability, and it succeeds in a lot of areas, but historically it has messed up when it comes to names. While the other names at least have a passing similarity to their common connotation, though, ActiveSupport::Concern doesn't seem to have any actual link to anything but the vaguest of definitions of concern.

Because of the built-in dependency management overriding that this contains, you now have to jump through hoops to test ActiveSupport::Concern mixins in isolation of other mix-ins.

As an example, suppose you have the idea of authorization for certain behaviors. It could be argued (I've heard it, in fact) that authorization is a cross-cutting concern across models. So, why not implement this as a Concern? This is a reasonable idea, because you can then test that the authorization code is working, then declaratively lay it down on the rest of your system. However, this causes another small issue. In order to test the behavior of your component, you have to provide some form of setup around the authorization stuff. That adds unrelated complexity to your testing, masking the reason behind the test. Do this with enough "concerns" and you'll have a tremendous amount of cruft in your tests. Now, change one of them and all your tests break. Sound familiar? This is a common situation where the fragility of tests is a direct pointer to an implementation problem in your underlying design.

I love the idea of concerns. I use the concept all the time to guide my design decisions. In fact, I agree with DHH on a high level. If you replaced all references to ActiveSupport::Concern with just simple concern/include/extend in DHH's post about them, I think that his points are valid. In Rails, this is the place where you should be focused on separation of concerns. However, based on my experiences, mixins shouldn't be the primary mechanism for doing this in your system (I think wrappers or helpers are better way of eliminating duplication of knowledge/behavior), but it does fit with idiomatic "everything is in your model" Rails designs.

I don't use them. I find that they add complexity to my system without providing any value. Adding dependencies and hiding complexity is a choice that you should make according to your desires and experience. I prefer using Ruby's built-in, more flexible include/extend syntax. Your mileage may vary depending on your choice.

