# Baruco 2012: Deconstructing the framework, by Gary Bernhardt
[link](https://www.youtube.com/watch?v=iUe6tacW3JE)

    class Comment < AR::Base
      after_create :notify_commenters

      def notify_commenters
        thread.commenters.each do |user|
          ThreadUpdateMailer.deliver(user, thread)
        end
      end
    end

So I'm pretty sure you've seen code like this. This is what Github uses to send notifications. The problem with designing a system this way is that you end up with a system where all your tests are testing some system under test, the system under test wants to send an email or hit an external system of some kind. Rails happens to turn off email for you in tests, so email is not a big deal but other external systems have a problem.

So you end up having to stub your external system to just do the test, which seems wrong, and when you break the external system everything in your tests break even though they aren't even a core part of the system.

The problem is that the Record is coupled to the API. If we create a service that aggregates the process of creating a user, it can hit the record, it can hit the API, it contains that logic and here is the same example done that way.

    class PostComments
      def self.post(user, thread, text)
        comment = Comment.create!(:user => user, :thread => thread, :text => text)
        thread.commenters.each do |user|
          ThreadUpdateMailer.deliver(user, thread)
        end
      end
    end

    class Comment < AR::Base
    end

So now the AR object has no coupling to the external email.

## Services, Wrappers, Records

This is the minimum architecture that I think makes sense and can scale to a medium-large Rails app. The idea is you have services, stateless, no data in them. Services talk to records, these are things in the database, and the records are very simple thin layers over the database.

This is what I want an ActiveRecord object to look like.
