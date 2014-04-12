# Nil is Unfriendly, with Joe Ferris (Thoughtbot Weekly Iteration 1)

Nil is extremely unfriendly, and its not unwarranted.

## Nil is contagious. 

If you have one `nil`, they jump out. Ex: `user.account.subscription.plan.price`. If you want to know the price that the user is paying, you go through all of these, and some of them are optional. Though we actually would rather just not traverse the chain to obey the Law of Demeter (if we repeat it here we might repeat it multiple times at other points of the app). We also have to deal with `nil` at every step of the chain (Demeter'd or not).

So we do `user.price`, clearly we have no duplication here, when we need the price, we just ask for the price. But still, `nil` bites you. Assuming you get a `nil` here, you just return `nil`.

## Nil has No Meaning

The problem here is that `nil` has no value. Is the price zero? Is the price unknown? Is this an invalid scenario? Or is this a bug? `Nil` is not a good place to represent "the being zero of a price". This is `nil` co-opting a thing that isn't really a thing.

Nil is a slap in the face of duck-typing. Nil violates duck typing. Whereas we can have "attempt to do this" (no interface/superclass needed in duck typing!), `nil` just does nothing. `nil` says I don't care. It doesn't have a price, it actually doesn't have anything, and that is not friendly. You are forced to look everywhere. So we accept this dual scenario:

    def charge_for_subscription
      price = subscription.try(:price) || 0
      credit_card.charge(price)
    end

People are good at accepting that "checking if an object is an instance of a class sucks", except when it comes to `nil`. We know not to call `is_a?` on stuff, except for `nil`. We're dressing it up a bit with the `||`, but it is actually a sneaky conditional (it doesn't look like `if` but it is an `if`).

As soon as we return `nil` once, any other method that calls it becomes unfriendly.

## Null Object Pattern

Null Object: "I'm going to create the idea of an object without not having a price." We can actually create something like "UnsentPrice" or "FreeItem" to not just say it is a Null Object but to specify the reason why it doesn't have a price. Ex: Guest accounts, it's not a `NullUser`, it's a `Guest`.

We want to have this:

    class FreeSubscription
      def price
        0
      end
    end

We have valuable information (it's not just the price got lost). To some degree, we are moving things around. And somewhere we decide to hide away the decision to make a null thing is better than just having things everywhere.

So ask yourself: "Where should I ask the question of when should I know what to do?" What you don't want to happen is:

    if is_a?(FreeSubscription)

This is not your pattern. We revert to conditionals, and we actually do a class check at this point. So only use `FreeSubscription` if you never (or rarely) have to ask if a subscription is free or not.

## Exceptions

This can help at least encapsulate conditional logic, and put it in a place. This helps prevent ridiculous debugging issues. When you have a hash, and get a missing key, you don't want to have a `nil`, you can raise an exception and fail, loudly and early.

    Account.find_each do |account|
      account.charge_for_subscription
    end

    class Account
      def charge_for_subscription
        credit_card.charge(subscription.price)
      end
    end

If we don't have a credit card for each account, then this doesn't work (we don't have a credit card to charge). Normally, what happens is that we return `nil` and get a `NoMethodError`. (Bad because it can affect parts of the app that are so far from where the `nil` was actually introduced.

While we can rescue the `NoMethodError`, it's not a good idea because this error can mean other things (we might have another bug somewhere else and we're still letting the thing keep running). What we do is to define an `Exception` especially for this situation:

    class Account < AR::Base
      class NoCreditCardError < StandardError
      end

      def credit_card
        super || raise NoCreditCardError
      end
    end

Assuming we have a `has_many`, we call the `super` method and explicitly raise an error, instead of letting the credit card get passed. It's also better to rescue, since we explicitly tell Ruby what exception we deal with:

    Account.find_each do |account|
      begin
        account.charge_for_subscription
      rescue NoCreditCardError => exception # as opposed to NoMethodError, which can come from anywhere
        Airbrake.notify(exception)
      end
    end

## Maybe?

[TODO]: FINISH!!

`github.com/mike-burns/wrapped`

## Nil is Unfriendly
- Null object
- Exceptions
- Maybe. Use when you need different handling situations for `nil`.

# DAS: How and Why to Avoid Nil

IVARs return `nil`, [] returns `nil`, and {} returns `nil`. When we look for a hash of a key that doesn't exist, it returns nil. The `nil` percolates through and you get failures in points far from where we started.

When we call a method on `nil`, we get "undefined method METHOD for `nil`". The problem is that the method that introduces a nil could be several methods deep. The introduction of the `nil` is not local to the trace.

To fix this, we can use `array.fetch` as opposed to `nil`. Why?

    > a = {1 => "hehe"}
    > a[2] => nil                 # Not very helpful
    > a.fetch(2) => key not found # A bit more helpful

Better to prevent nil from actually occurring, right? The problem is that in Rails, we have this:

    > Pageant.find(99999999)                # Raises AR error
    > Pageant.where(name: "Doesn't_exist")  # Return []
    > Pageant.find_by_name("Doesnt' exist") # Returns *nil* (???)

## Ways of Solving

    class Person
      attr_reader :subscription

      def subscribe!
        @subscription = Subscription.new
      end
    end

    class Subscription
    end

The problem here is that if we create a `Person` object, when we do `puts person.subscription`, we get a random error. Instead of using `attr_reader`, we can define our own `subscription` function:

    def subscription
      @subscription or raise NoSubscriptionError
    end

    class NoSubscriptionError < Exception
    end

And we localize the failure to where nil is introduced. We can also create a new object:

    class Person
      def subscribe
        Subscriber.new(Subscription.new)
      end
    end

    class Subscriber
      attr_reader :subscription

      def initialize(subscription)
        @subscription = subscription
      end
    end

