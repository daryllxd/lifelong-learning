# Don't just dump code into your models
[link](http://blog.sensible.io/2014/04/19/don-t-just-dump-code-into-your-models.html)

Naive solution:

    class User
      after_create :subscribe_to_mailchimp

      def subscribe_to_mailchimp
        list_id = ENV["MAILCHIMP_LIST_ID"]
        Mailchimp.new(ENV["MAILCHIMP_API_KEY"].subscribe(list_id, self.email)
      end
    end

## Problems with Naive Implementation

- If Mailchimp API is unavailable, `after_save` will raise an exception.
- If an exception is raised, ActiveRecord will rollback the transaction and your user won't get created.
- If you choose to handle the exception in the callback, you'll fail to subscribe the user to the mailing list.
- User is coupled to Mailchimp (harder to switch if ever).
- You don't want to run this in tests, so...

    def subscribe_to_mailchimp
      if Rails.env.production?
        list_id = ENV["MAILCHIMP_LIST_ID"]
        Mailchimp.new(ENV["MAILCHIMP_API_KEY"].subscribe(list_id, self.email)
      end
    end

(Wrong because you still have a staging server which needs this.)

How to handle bad `API_KEY` or bad `LIST_ID`?

    class EmailMarketing::Subscription
      attr_reader :api_key

      def initialize(api_key)
        @api_key = api_key
      end

      def subscribe(user, list_id)
        Mailchimp.new(api_key).subscribe(list_id, user.email)
      end
    end

    EmailMarketing::Subscription.new(API_KEY).subscribe(user, LIST_ID)

Better to just create a new instance of the connector as opposed to a class method (see other articles), so it is easier to refactor.

Background service has to exist that will still try to add the user to the list (and if that fails it will automatically re-schedule a retry.)


    class EmailSubscriptionWorker
      include Sidekiq::Worker

      def perform(user_id)
        api_key, list_id = # read from config

        user = User.find(user_id)
        EmailMarketing::Subscription.new(api_key).subscribe(user.email, list_id)
      end
    end

## Comments

- Anything that doesn't need to be processed right away should be pushed onto a queue and be dealt with a worker, imho.
- Keep an eye out for boundaries emerging within your application, and then explicitly extract them.
- Don't be afraid of new ruby objects/POROs. They don't even need to be on top of another architecture (Sidekiq in the above example).
- API key, I'm injecting it as a dependency so that the `EmailMarketing::Subscription` doesn't need to have any knowledge of the global configuration.
- Batch subscribe better so fewer API calls.
