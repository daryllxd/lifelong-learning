## Ben Orenstein - Refactoring from Good to Great - A Live-Coding Odyssey
[Link](http://vimeo.com/61087282)

__Don't refactor code that doesn't have tests.__

> Local variable `orders_within_range`, select. Extract temp to query.

- 2 methods of 1 line are usually better than 1 method with 2 lines.
- Put inside the private keyword, so it is easier to read because you know it's not important. This is like a hint because you say that `orders_within_range` is not part of the core functionality of the class.
- We've also encouraged reuse.
- I would do this right away as opposed to waiting for stuff.
- Almost no temp methods within the method, I extract them out to query methods that are private, because methods should have one job, and when I see a local within a method, it's a hint that there's probably 2 jobs.
- I'm fond of a class with small publics and long privates. But most probably if there are a ton of private methods, then there's a class that should be placed there.
- I won't hesitate to pull stuff out anyway.
- Recalculating stuff sucks but I need to see performance numbers first before I start to cache stuff, that is premature optimization.
- If I extract private method to new class isn't it coupled. I am very likely to extract a class to reuse stuff. If it is reused just one time, then I would make a private class. But I'm not concerned with the dependency because some classes are supposed to be used together anyway.
- Fan out vs fan in, better to have a class be used by many classes than a class uses many other classes
- I like classes to not care about what's coming in, make them context free.

Next part

    def orders_within_range
      @orders.select { |order| order.placed_at >= @start_date && order.placed_at <= @end_date }
    end

Now I'm thinking to extract the conditional to make the file more skimmable.

    def orders_within_range
      @orders.select { |order| order.placed_between?(@start_date, @end_date) }
    end

This seems like feature envy (OrdersReport wants to know something about Order). But it's actually better to just take shit out.


    class Order < OpenStruct
      def placed_between?(start_date, end_date)
        placed_at >= start_date && placed_at <= end_date
      end
    end

OOP wise, it is better to place the calculation with the data.

> Data clump

Code smell hear because we keep on passing `start_date` and `end_date` put together. Chances are, there is an object that wants to be born. What we should do is to put a class for this.

We want the test to go back to green as soon as possible. Discipline: What's the smallest step to do to break a little thing.

We win because of the parameter coupling. Global data coupling, when two classes look at the global data. When a system is hard to understand it usually is because of coupling.

> Coupling

    class FailureNotifier
      def notify_user_of_failure
        print_to_console(failure)
      end

      def print_to_console(failure)
        console.print(failure.to_sentence)
      end
    end

The two a re coupled because `print_to_console` needs to know shit about `notify_user_of_failure`. `notify_user_of_failure` has to build the right kind of failure so that you can call `to_sentence` on it in the `print_to_console`.

So it's hard to change. BTW, the more parameters you have, the more things you have for parameter coupling.

__There are no arguments in OOP when you have local methods that work on instance data.__ 

I would actually like if initialize is stupid and just assigns data, no calculations. It's easier to read that way.

If a calculation is happening you should put the method on the object that is being calculated on. So the calculation of `placed_between` should actually be in the DateRange class!

Right now, DateRange is a value object and is dumb. But we can put a calculation on that value object. _It's extremely likely that if we have a range that we're going to ask if something happened in between of the range._  Is there an order within the range? Was a coupon redeemed within the range? This kind of behavior is perfect to move to a generalized class.

> Old

    class Order < OpenStruct
      def placed_between?(start_date, end_date)
        placed_at >= start_date && placed_at <= end_date
      end
    end

> New 

    class Order < OpenStruct
      def placed_between?(start_date, end_date)
        date_range.include?(placed_at)
      end
    end

    class DateRange < Struct.new(:start_date, :end_date)
      def include?(date)
        date >= start_date && date <= end_date
      end
    end

For DateRange, it's a ValueObject. We set the `start_date` and the `end_date` and we can't change them later, and the only thing that shows up in this class are methods that that use that data, or return answers.

They are great for your system to make itself easier to reason about. A bit functional, this part. Data clumps are great to turn to value objects.

(Wikipedia) A value object is a small object that represents a simple entity whose equality is not based on identity: i.e. two value objects are equal when they have the same value, not necessarily being the same object.

Why not make it a range?

    class DateRange < Range
    end

I think it's okay to do this, it's not redundant because a `DateRange` is a `Range`. Of course we add more words and this is sort of bad but I think this is okay. Every refactor has a negative side, except for duplication. It's pretty much okay to remove duplication.

> Old

    def total_sales_within_date_range
      orders_within_range.
        map(&:amount).inject(0) { |sum, amount| amount + sum }
    end

I get the amounts, and then I sum the amounts. There's a better name for this process.

> New

    def total_sales_within_date_range
      total_sales(orders_within_range)
    end  

    private

    def total_sales(orders)
      orders.map(&:amount).inject(0) { |sum, amount| amount + sum }
    end

This is what I want my public interfaces to look. Total sales within date range is the total sales of the orders within range. Reads well, looks good, makes sense. Low level details are inside the private keyword.

"So what's in the OrdersReport? Well it takes the orders and a date range, and it gets the total sales within a date range. That's beautiful."

> Co-opting Nil

    require 'ostruct'

    class JobSite
      attr_reader :contact

      def initialize(location, contact)
        @location = location
        @contact = contact
      end

      def contact_name
        if contact
          contact.name
        else
          'no name'
        end
      end

      def email_contact(email_body)
        if contact
          contact.deliver_personalized_email(email_body)
        end
      end
    end

    class Contact < OpenStruct
      def deliver_personalized_email(email)
        email.deliver(name)
      end
    end

We know there is a location but we aren't sure if there is a contact. So we always ask if there is a contact or not. Because of the way Ruby works, `@contact` gets the value of nil. We're using `nil` to stand-in, or to mean, "no contact". So I need to keep on checking the truthiness. `nil` is for particular purposes, and this is not a good purpose for `nil`. It obscures the true intent of the code. The conditionals aren't really supposed to be there.

I'd rather have an object set as no contact and have that be set as opposed to nil. So let's create an object that stands in for when I have no `contact`. I have to introduce a __`null_object`__.

> Fix

    def initialize(location, contact)
      @location = location
      @contact = contact || NullContact.new
    end

    class NullContact
      def name
        "no name"
      end

      def deliver_personalized_email(email)
      # nothing happens
      end
    end

> Delete that shit!

    class JobSite
      attr_reader :contact

      def initialize(location, contact)
        @location = location
        @contact = contact || NullContact.new
      end

      def contact_name
          contact.name
      end

      def email_contact(email_body)
          contact.deliver_personalized_email(email_body)
      end
    end

__When we don't have a contact, set a `NullContact`.__ The problem is it breaks three methods at once.

We get to remove crap, and we get to get rid of feature envy, because this class cares about `Contact` a lot. We're not co-opting nil anymore. We've created a concept that stands for "there's not contact".

We remove `if current_user?` from all our controllers.

Why shouldn't I just create a `Contact` class with defaults? Because if so, a `Contact` class would stand for  2 things: real contacts, and not having a contact. It would make the class a bit confusing.

You can use a subclass for NullContact but I would rather use composition rather than inheritance for this.

> When do you refactor?

1. After every change you make. Every time I go from red to green, I ask can I refactor this? If you do this consistently, you never have to do the giant refactoring.
2. When I have god objects. Rails has some god objects: ToDo for a ToDo app, Order for an e-commerce app, and User for basically anything.
3. High churn files. If the class gets changed a lot, it's especially . A good gem to use is the gem `churn`.
4. When you have bugs, because bugs love company.