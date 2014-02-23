## Ben Orenstein - ArrrrCamp 2013

- When you pair with someone better, you learn.
- When you pair with someone who's not as good as you, you learn something by teaching.
- Pair with others. There is no better way to get better.
- Continue to struggle with things. And when everyone is starting, it seems like it is super hard for them, it is hard for everyone.
- __Admit you don't understand something.__ Just do the habit of "When I don't understand something, I will just ask what it is."
- When you say "Oh yeah I got it", you trade an opportunity to understand something to make it look like you understand it when you don't.
- When you are super embarassed to admit that you don't know something, that is the best time to do it. When you have the voice in your head that says "wow, I really should know this." And you should. You should admit that. People that make fun of you and give you a hard time when you admit ignorance of something are bad people.
- When that happens, the problem is with them. They have screwed up. I found that the best programmers are willing to understand that "that happens." It's a hard thing to admit that you don't know it.

#### What's a good heuristic to know if you are succeeding?

My favorite heuristic to know how I'm progressing as a programmer is "how easy is it to change my code?" How flexible is this code when you have to change it later. Methods short, classes focused, but the real test comes three months later, when you need to change something. Make sure you bring yourself a level of abstraction up. Do I need to make changes in a bunch of places, which indicates duplication? Pay attention to that.

#### What does this command do?

    history | awk '{a[$2]++}END{for(i in a){print a [i] " " i}}' | sort -rn | head -20

Check your CLI history, awk and pipe, and sort in reverse order.

The motion is a waste of time. The act of typing means that you already know what you are thinking of ("I want my code to look like this now"). The time you spend typing is wasted time. This is the time where you have to spend these muscle motions to inform this fast processor what you want it to do. So I'm constantly looking for ways to shave away keystrokes in time off my workflow.    

`g: git`. Bind the `git` command to tell you to do git. `gad`: Git add entire directory. `gcm`: Git commit with a message.

Pairing: It's hard. DVORAK keyboard and I remapped Caps Lock to Esc.

Whether you are looking for a job or not, it's awesome to have friends who also know Ruby. This is what conferences are good for. You should make friends in conferences.

"Am I underpaid?" The answer is yes, you are, because if you feel that you are uncompensated, then that is when you are really underpaid. If you worry about it, you are underpaid. You can ask your co-workers how much money they make. Though there is a taboo to talk about stuff, but you lose because there is an information asymmetry. __The person who has more knowledge in a negotiation wins the negotiation.__ I think we should be much more willing to discuss salary with our coworkers. At least you get things out there.

TDD is the best and most important thing I've ever done for my career. First, it's not that bad. The best way to do this is to pair with someone. When you get to a roadblock ("I'm having trouble testing this"), some of it is because you are inexperienced, but some of it is because there is bad code. Code that is hard to test is definitely a smell. So yes you should design your code to make it easier to test.

My advice for switching to Vim is don't do it. Don't do it at first. When you are still intimidated about what you want to learn, don't do it, you have to optimize your learning speed over the speed number.

Second, use vimtutor. Read "How to surive the first week in Vim." First, relative number. Delete inside Ruby block. Leader commands.

When you also say "you know it" already, you are also hurting the person who wants to teach you something.

## Ben Orenstein - Refactoring from Good to Great - A Live-Coding Odyssey
[Link](http://vimeo.com/61087282)

__Don't refactor code that doesn't have tests.__

> Local variable `orders_within_range`, select. Extract temp to query.

- 2 methods of 1 line are usually better than 1 method with 2 lines.
- Put the unimportant stuff inside the `private` keyword, so it is easier to read because you know it's not important. This is like a hint because you say that `orders_within_range` is not part of the core functionality of the class.
- We've also encouraged reuse.
- I would do this right away as opposed to waiting for stuff.
- Almost no temp methods within the method, I extract them out to query methods that are private, because __methods should have one job, and when I see a local within a method, it's a hint that there's probably 2 jobs.__
- I'm fond of a class with small publics and long privates. But most probably if there are a ton of private methods, then there's a class that should be placed there.
- I won't hesitate to pull stuff out anyway.
- 2 database queries sucks but __I need to see performance numbers first before I start to cache stuff, that is premature optimization.__
- If I extract private method to new class isn't it coupled? I am very likely to extract a class to reuse stuff. If it is reused just one time, then I would make a private class. But I'm not concerned with the dependency because some classes are supposed to be used together anyway.
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

__Better to have local methods work on instance data so there are no arguments (in OOP).__ 

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