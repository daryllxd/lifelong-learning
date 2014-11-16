## Parley Best Practice: Check if a bunch of statements are all true?
[link](http://parley.rubyrogues.com/t/best-practice-check-if-a-bunch-of-statements-are-all-true/2842)

> I tend to extract each condition to a better-named method:

    def send_reminder?
      incomplete? && first_reminder_due? && ...
    end

    private

    def incomplete?
      !completed?
    end

    def first_reminder_due?
      reminder_at <= Time.current
    end

> I agree with `@brandonhilkert` on turning this into a Composed Method of self-describing predicates.

> You might want to extract the whole method to its own object (`Replace Method with Method Object`).

    def send_reminder?
      return false if completed?
      return false if reminder_at > Time.current
      return false if last_reminded_at && last_reminded_at > 23.hours.ago
      return false if reminder_at.hour > Time.current.hour
      return false if reminder_at.min > Time.current.min

      true
    end

## Boolean Externalities
[link](http://devblog.avdi.org/2014/09/17/boolean-externalities/)

    class Episode
      def available_to_user?(user)
        free? || user.current_subscriber?
      end

      def current_subscriber?
        fully_authenticated? && subscription.open
      end

      def fully_authenticated?
        authenticated_accounts? && verified_email?
      end
    end

The problem is that I still had to methodically evaluate each predicate in turn to see which ones were returning unexpected values. *That's eight different methods.*

I can annotate...

    def available_to_user?(user)
      result = (free = free?) || (current_subscriber = user.current_subscriber?)
      puts "episode.free? == #{free}"
      puts "user.current_subscriber? == #{current_subscriber}"
      result
    end

This is good code by most conventional measures. Every method is short and meaningfully named. A current subscriber is someone that is authenticated and has an open subscription.

*The fundamental issue is that while this code makes it very easy to ask “is a user allowed to view this episode?”, when the answer comes back “no”, there is no way to ask “well, why not?”.*

OO's information hiding: "I'll answer your question, but you don't need to know how I arrived at the answer." But we actually do want the information. I do want to tell users why something isn't working as expected.

Boolean externality: In theory, all the important information has been rolled up into one convenient boolean value. In reality, vital knowledge has been lost along the way.

#### Comments

With a Result or Either type, you can communicate more information about why something happened. In Ruby, this would mean returnign a tuple of `(true/false, String)` instead of just a bool.
