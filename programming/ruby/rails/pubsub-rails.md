## The Publish-Subscribe Pattern on Rails: An Implementation Tutorial
[link](https://www.toptal.com/ruby-on-rails/the-publish-subscribe-pattern-on-rails)

The publish-subscribe pattern is an RoR messaging pattern where senders of messages (publishers) do not program the messages to be sent directly to specific receivers (subscribers). Instead, the programmer publishes messages/events without any knowledge of any subscribers there may be.

Similarly, subscribers express interest in events, and only receive messages that are of interest, without any knowledge of any publishers.

Example:

    class Post
      after_create :create_feed, :notify_followers

      def create_feed
        Freed.create!(self)
      end

      def notify_followers
        User::NotifyFollowers.call(self)
      end
    end

`Post` is coupled to `Feed` and `User::NotifyFollowers`.

Example of pub/sub pattern and service objects implementation:

    class Financial::OrderReview
      include Wisper::Publisher

      def self.call(order)
        if order.approved?
          publish(:order_create, order)
        else
          publish(:order_decline, order)
        end
      end

    class ClientListener
      def order_create(order)
        Client::Charge.call(order)
        Inventory::UpdateStock.call(order)
      end

      def order_decline(order)
        Client::NotifyDeclinedOrder(order)
      end
    end

Testing, use `wisper-rspec`:

    @order = Fabricate(:order, approved: true)
    expect { Financial::OrderReview.call(@order) }.to broaadcast(:order_create)

    @order = Fabricate(:order, approved: false)
    expect { Financial::OrderReview.call(@order) }.to broaadcast(:order_decline)


#### Disadvantages

- Loose coupling: The structure of the data published must be well defined. In order to modify the data structure of the published payload, it is necessary to know about all the Subscribers, and either modify them also, or ensure the modifications are compatible with other versions.
- Messaging Bus stability: Depending on how many messages are being exchanged, you might want to consider using services like `RabbitMQ`, `PubNub`, `Pusher`.
- Infinite Event Loops: When the system is completely driven by events, be cautious not to have event infinite loops.
