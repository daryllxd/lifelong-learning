## Using Wisper to Decompose Applications
[link](https://www.sitepoint.com/using-wisper-to-decompose-applications/)

- Your app is not a Rails app. Rails is nothing more than a framework used to wrap your app in the HTTP protocol. It's a detail and we should be concerned with object-oriented development, not Rails-oriented development.

- Ebay app. When a bid is done, we want to: email the seller of the item, update the UI of item watchers in real time, store a stat, update the activity feeds of all subscribers of the item.
- The code for these needs to touch several models and hit an external API. Wherever it goes, it's going to introduce dependencies that are not core concerns of 'bidding on an item'.
- Services might become like bloated out models :(.

    # Controller
    def create
      service = CreateBid.new
      service.subscribe(WebsocketListener.new)
      service.subscribe(ActivityListener.new)
      service.subscribe(StatisticsListener.new)
      service.subscribe(Indexing.new)
      service.on(:reserve_item_successfull) { |bid| redirect_to item_path(bid.item) }
      service.on(:reserve_item_failed)      { |bid| @bid = Bid.new(bid_params); render :action => 'new' }
      service.execute(current_user, bid_params)
    end

    # Service
    def execute(performer, attributes)
      bid = Bid.new(attributes)
      bid.user = performer
      if bid.valid?
        bid.save
        notify_seller_of(bid)
        broadcast(:bid_successful, performer, bid)
      else
        broadcast(:bid_failed, performer, bid)
    end

    # Listeners
    class WebsocketListener
      def bid_successful(performer, bid)
        Pusher.trigger("item#{bid.item_id}", "new_bid")
      end
    end

Controller (context) - creates a service object, wires up any listeners that need to know about the response, and executes the service passing in data pulled from the HTTP request. `CreateBid` does not tell listeners to do something, it tells them that something happened. `CreateBid` does not know the context in which it is being executed, or who is listening. *Objects which trust, not control, others only need to make choices based on their own state.* This creates a clear boundary between objects and their responsibilities and does not constrain choices we can make about how we use our domain objects.

#### Adding a Feature Can be Done By:

- Add code to the service object (appropriate if the features is intrinsically part of the use case being expressed by the service).
- Add a listener to the service object. This is if the feature is auxiliary to the user case expressed by the service, should not happen in all circumstances in which the object is executed, and/or is specific to the delivery mechanism.

#### Publishing Events

      def do_something
        publish(:done_something, 'hello', 'world')
      end

      def done_something(greeting, location)
      end

Global listeners: `Wisper::GlobalListeners.add_listener(StatisticsListener.new)`.

#### Summary

##### Benefits of Wisper

- Smaller objects with fewer responsibilities
- Objects can be wired up based on context in a lightweight manner
- The core application is not polluted with delivery mechanism concerns
- *Objects tell listeners what happened, not what to do*
- Isolated testing is easier because we can do away with requiring Rails tests
- Clear objects exist between objects in different layers
- Moving to async is easier since we can execute from a background job without Rails loaded
