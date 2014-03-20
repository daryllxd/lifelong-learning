## Depend Upon Abstractions
[Link](http://codeulate.com/2011/06/programmer-resumes-are-deprecated/)

TLDR: Wrap external services in its own object.

One nice piece of advice for designing flexible programs is depend upon abstractions, not implementations.

Most programmers are at least somewhat familiar with this idea. However, it’s easy to forget it when you start working with outside libraries or services.

Here’s a paraphrased example from a Rails app I reviewed recently. This app uses the braintree gem to charge users, create subscriptions, and refund money.

#### Before
    
> Gemfile
    gem 'braintree'

> a/m/user.rb

    class User
      SUBSCRIPTION_AMOUNT = 10.to_money

      def charge_for_subscription
        Braintree.charge(SUBSCRIPTION_AMOUNT)
      end

      def create_as_customer
        Braintree.create_customer(user.name)
      end
    end

> a/m/refund.rb

    class Refund
      def process!
        Braintree.refund(order.amount, user.braintree_id)
      end
    end

*Just because we’re calling methods in another class does not mean we’re programming against an abstraction.* 

It’s certainly better than making raw HTTP calls to Braintree, but our choice of vendor and gem used are implementation details that have leaked into our business logic.

With calls to Braintree littered throughout, switching to another vendor will require the editing and re-testing of many files. We’ve fallen short of the ideal we described above, where one change requires edits only in one place.

#### Fixed via a wrapper:

> a/m/user.rb
    
    class User
      def charge_for_subscription
        PaymentGateway.charge_for_subscription
      end

      def create_as_customer
        PaymentGateway.create_customer(user.name)
      end
    end
    
> a/m/refund.rb
    
    class Refund
      def process!
        PaymentGateway.refund(self)
      end
    end
    
> New file: lib/payment_gateway.rb

    class PaymentGateway

      SUBSCRIPTION_AMOUNT = 10.to_money

      def charge_for_subscription
        Braintree.charge(SUBSCRIPTION_AMOUNT)
      end

      def create_customer(customer_name)
        Braintree.create_customer(customer_name)
      end

      def refund(refund)
        Braintree.refund(refund.order_amount, refund.user_braintree_id)
      end
    end

Another good name for the new class would be `PaymentGatewayAdapter`, as it’s an example of the adapter pattern.

#### Benefits:
- Easier to switch from Braintree to another vendor, because you just edit one file.
- If Braintree changes its public API, we again have only one class to edit.
- Testing become easier. Before, unit tests required stubbing Braintree's code. Now, we can stub our own methods, which is safer.
- Better method names (PaymentGateway as opposed to Braintree).
- Able to separate payment related thingies such as the SUBSCRIPTION_AMOUNT to the Gateway.

#### Downsides
- Indirection: Need to jump through one additional file. However, the wrapper  is very thin anyway.
