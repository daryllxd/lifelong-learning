# TutsPlus

You can use this when a procedure is the same across different implementations but there is just a single point of differentiation. The adapter pattern solves this bottleneck by having several adapters to close the procedure.

We want to parse content from JSON or from XML.

    @content = Contnet.parse(@json, :json)

    class Content

> This is a static method that creates a new `Content` object.

      def self.parse(source, format)
        title = nil
        body = nil
        new(title, body)
      end
    end

Better to keep the requirements (`require json`) in the test than in the class.

We can do the `if format == :json, format == :xml` but that sucks, because we have to put another branch in the conditional, and a new `parse_soap` method.

We want to separate parsing from the creation of the object.

    class Content
      def self.parse(source, format)
        adapter = Newsletter::Adapters::const_get(format.to_s.capitalize).new(source)
        content = adapter.parse
        new(content["title"], content["body"]
      end
    end

    module Newsletter
      module Adapters
        class Xml
          def initialize
          end

          def parse
            # parse in XML
          end
        end
      end
    end

    module Newsletter
      module Adapters
        class Json
          def initialize
          end

          def parse
            # parse in Json
          end
        end
      end
    end

# Depend Upon Abstractions
[Link](http://codeulate.com/2012/07/depend-upon-abstractions/)

TLDR: Wrap external services in its own object.

## Benefits:
- Easier to switch from Braintree to another vendor, because you just edit one file.
- If Braintree changes its public API, we again have only one class to edit.
- Testing become easier. Before, unit tests required stubbing Braintree's code. Now, we can stub our own methods, which is safer.
- Better method names (`PaymentGateway` as opposed to `Braintree`).
- Able to separate payment related things such as the `SUBSCRIPTION_AMOUNT` to the Gateway.

## Downsides
- Indirection: Need to jump through one additional file. However, the wrapper  is very thin anyway.

## Before

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

It's certainly better than making raw HTTP calls to Braintree, but our choice of vendor and gem used are implementation details that have leaked into our business logic.

With calls to Braintree littered throughout, switching to another vendor will require the editing and re-testing of many files. We've fallen short of the ideal we described above, where one change requires edits only in one place.

## Fixed via a wrapper:

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

Another good name for the new class would be `PaymentGatewayAdapter`, as it's an example of the adapter pattern.

# Ruby Best Practices: Adapter
[link](http://blog.rubybestpractices.com/posts/gregory/060-issue-26-structural-design-patterns.html)

An Adapter is used when you want to provide a unified interface to a number of different objects that implement similar functionality. Ex: Active Record, it communicates to different databases but wraps them up in a common interface.

The basic idea is that we want to be able to use a common interface while easily configuring which backend is used under the hood.

    Marky.adapter = :rdiscount
    Marky.adapter = :bluecloth

> Wiring up the adapter:

    module Marky
      extend self

      def adapter
        return @adapter if @adapter
        self.adapter = :rdiscount
        @adapter
      end

      def adapter=(adapter_name)
        case adapter_name
        when Symbol, String
          require "adapters/#{adapter_name}"
          @adapter = Marky::Adapters.const_get("{adapter_name.to_s.capitalize}")
        else
          raise "Missing adapter #{adapter_name}"
        end

      def to_html(string)
        adapter.to_html(string)
      end
    end

> Actual adapter

    module Marky
      module Adapters
        module Bluecloth
          extend self
            def to_html(string)
              ::Bluecloth.new(string).to_html
            end
          end
        end
      end
    end

*Since all the adapters implement a `to_html()` method that share a common contract, `Marky.to_html()` will work regardless of what adapter gets loaded. The win here is that if libraries, applicatons, and frameworks rely on adapters rather than concrete implementations, the choice of which engine to use can be done differently in different environments.*

