# Weekly Iteration 16: Open-Closed Principle

What if once I wrote code, I'd never change it?

How do you achieve this? With abstraction.

> Doesn't follow OCP by using a concrete object. If we change payment processors, we have to open up this class (`Purchase`) and modifying `charge_user!`.

    class Purchase
      def charge_user!
        Stripe.charge(user: user, amount: amount)
      end
    end

> Follows OCP by depending on an abstraction. We inject a payment processor which can be changed.

    class Purchase
      def charge_user(payment_processor)
        payment_processor.charge(user: user, amount: amount)
      end
    end

## Unsubscriber

> Doesn't follow OCP.

    class Unsubscriber
      def unsubscribe!
        SubscriptionCanceller.new(user).process
        CancellationNotifier.new(user).notify
        CampfireNotifier.announce_sad_news(user)
      end
    end

> Follows OCP

    class UnsubscriptionCompositeObserver
      def initializer(observers)
        @observers = observers
      end

      def notify(user)
        @observers.each do |observer|
          observer.notify(user)
        end
      end
    end

    class Unsubscriber
      def initialize(observer)
        @observer = observer
      end

      def unsubscribe!(user)
        observer.notify(user)
      end
    end

In the original, we have three things that are happen when a user unsubscribes. Here we have an `Unsubscribe` and a composite class that tells the observers to get notified.

## Pros

- We now get a free extension point, if we modify the order, we don't have to modify the order in the class.
- Ignorant of how many observers there are (array).
- We now have a home where we can put logic about the unsubscription process (ex: knowing what to do when one of the processes fail (do we carry on or do we rollback the transactions), figuring out how much time is needed to unsubscribe).
- This is easier to test, too, you will have to do several stubs whenever you test `Unsubscribe`, as opposed to doing each of these in action.
- This can be used for e-commerce stuff like when someone subscribes, a lot of things have to happen (user granted access, notify the accounting system, send e-mails).

You don't want to open a class to everything possible. *When you reopen a class for a particular reason, you want to reopen it for the same reason in the future.* When you can write the code, the first time you extend it, you think that "okay I might extend it again"

Relationship with SRP: When you have the capability to extend an object without opening it, you lessen the number of responsibilities of the object. The interfaces are also so small, so it is easier to decorate things.

This is something that is just very rarely going to happen, you will at some point change things anyway.

