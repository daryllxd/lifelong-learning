## The Lego Way of Structuring Rails Code
[link](http://engineering.vinted.com/2017/02/13/how-to-structure-code/)

Interactor vs service object: A `CreditCardService` can respond to `#create`, `#make_default`, whereas an interactor complies with SRP. Problem with AR Callbacks: we get into situations where a callback should not be called, like sending an email when a user password is updated except on creation. Then, we start writing conditional callbacks. More tests, then longer tests because callbacks callbacks are run each time `User` is created.

User unrelated things: `send_confirmation_email`, `upload_item`, `update_settings`, `ban`, `approve_holiday`.

Preferred classes: *Models that are responsible for ORM, business operations are handled by classes with a single public method, and value objects that have many public methods but don't perform operations.*

We can invent custom patterns for solving hard problems like data over-fetching, N+1 queries, or cache invalidation. Ex: When buying an item, we need to:

- Mark the order as sold and invalidate its cache
- Update each item--mark as sold and invalidate its cache
- Mark all other orders that involve the sold items as invalid and update their cache
- Notify the other buyers that an item is no longer available in conversations, and invalidate the conversations' cache'
