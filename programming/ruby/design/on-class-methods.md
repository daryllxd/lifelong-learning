# Why Ruby Class Methods Resist Refactoring
[link](http://blog.codeclimate.com/blog/2012/11/14/why-ruby-class-methods-resist-refactoring/)

    class SyncToAnalyticsService
      ConnectionFailure = Class.new(StandardError)

      def self.perform(data)
        data              = data.symbolize_keys
        account           = Account.find(data[:account_id])
        analytics_client  = Analytics::Client.new(CC.config[:analytics_api_key])

        account_attributes = {
          account_id:         account.id,
          account_name:       account.name,
          account_user_count: account.users.count
        }

        account.users.each do |user|
          analytics_client.create_or_update({
            id:             user.id,
            email:          user.email,
            account_admin:  account.administered_by?(user)
          }.merge(account_attributes))
        end
      rescue SocketError => ex
        raise ConnectionFailure.new(ex.message)
      end
    end

If we refactor this, we end up with a bunch of class (`self.`) methods. Better to do the class method into instance method pattern:

    class SyncToAnalyticsService
      ConnectionFailure = Class.new(StandardError)

      def self.perform(data)
        new(data).perform
      end

      def initialize(data)
        @data = data.symbolize_keys
      end

      def perform
        account           = Account.find(@data[:account_id])
        analytics_client  = Analytics::Client.new(CC.config[:analytics_api_key])

        account_attributes = {
          account_id:         account.id,
          account_name:       account.name,
          account_user_count: account.users.count
        }

        account.users.each do |user|
          analytics_client.create_or_update({
            id:             user.id,
            email:          user.email,
            account_admin:  account.administered_by?(user)
          }.merge(account_attributes))
        end
      rescue SocketError => ex
        raise ConnectionFailure.new(ex.message)
      end
    end

Instead of adding class methods that have to pass around intermediate variables to get work done, we have methods like `#account_attributes` which memoize their results. This feels cleaner. There is now state and logic encapsulated together in an object. *It's easier to test because you can separate the creation of the object from the invocation of the action.*

Also, every piece of code won't be coupled to the global class name. You can't easily swap in a new class but you can easily swap in a new instance.

*I'm unlikely to see the opportunities for refactoring a class method because decomposing them produces ugly code. Starting with the instance form makes your refactoring options clear, and reduces friction to taking action on them.*

## Objections

- *YAGNI.* Neither form is more or less complicated than the other. YAGNI only makes sense if there is a difference in understandability (one class versus two).
- *It uses an extra object.* This is basically a non-issue.
- *It's cumbersome.* Yeah, but you have a convenience class method that builds the object and delegates down.

## Comments

- *When testing the class in isolation, the fact that I can instantiate it in the test makes it easy to perform optional dependency injection and pass in test doubles for collaborators that have defaults.*
- The class method makes for an easier interface to replace with a test double: I can just provide a test double that has a single `#perform` method rather than a test double that has a `#new` that returns another test double that has a `#perform`.
- There are two dependencies hidden in both versions, the `Account` and the `AnalyticsClient`. A more testable design would be something that passes in the dependencies.

> Original:

    def self.perform(data)
      new(data).perform
    end

    def initialize(data)
      @data = data.symbolize_keys
    end

    def perform
      account           = Account.find(@data[:account_id])
      analytics_client  = Analytics::Client.new(CC.config[:analytics_api_key])

> Improved:

    def self.sync(account)
      new(Analytics::Client.new(CC.config[:analytics_api_key])).sync(account)
    end

- Not a fan. You've created a new method and memoized it for what benefit? Readability? The original example has a clear purpose: to encapsulate an algorithm with the `#perform` method. All you've done is create more methods for the sake of keeping methods small--harder to follow and more complicated IMO.
- The main goal is readability, smaller methods are easier to change/understand and they have more potential to be re-used in other methods.
- Bryan: The benefit I try to achieve with extracting methods is to improve the readability of each method by keeping them at the same level of abstraction. It's the essence of the Composed Method pattern. The change to the analytics client instantiation looks silly when your when you remove all the context, but in the context of the full example it's about organizing things within the class.
- *Once you've achieved Composed Methods, you can read through a method without your brain having to switch back and forth between high level ("we POST one user at a time") and low level ("the analytics client requires an API key") details.*
- *In my experience, Complex methods (where you are jumping up and down between different levels of detail) are less preferable than using private methods to apply the Composed Method pattern within a class.* If the resulting class is too complex (e.g. you feel like you want to test the private methods directly), then I look at ways to extract an additional class.

## Are Class Methods Evil?
[Link](http://nicksda.apotomo.de/2011/07/are-class-methods-evil/)

Concept: *Use object instances wherever possible.*

Class methods are global methods. You may access and call them from anywhere since you don't need an object instance.

Now, class methods come in handy – you don't have to think about the context as they’re available everywhere.

> (Bad) Class method

    class User
        def self.email_to(id, email)
            user = User.find(id)
            Emailer.send(email, "Hello, #{user.name}")
        end

> More OOP method

    class User
        def email_to(email)
            Emailer.send(email, "Hello, #{name}")
        end

*In the example, the programmer didn’t see that the email behaviour (aka method) is tied to an instance rather than to a class.*

In a lot of cases class methods can be replaced with instance methods on factory or builder objects.

The reason I'm writing this here is that I like the DCI approach where you dynamically extend objects at runtime according to system state.
Object instances include required behaviour and then, they die. No pollution on class layer.

#### Comments:
- The idea of having `user_factory.find` instead of `User.find` seems crazy. Stuff like `User.first`, `File.read`, `Dir.glob` etc is handy and useful stuff. *Why would I want to do two things (instantiate an instance and then call the method) when I want to do one thing (call the method).*
- But using class methods like the ones from ActiveRecord is absolutely fine – why not?! If your oo-code results in more procedural style code I think the problem is mainly the oo-design not the usage of class methods in general.
- The way I see it, a Ruby class *is* the factory for its instances. That is, `User.find(1)` is the same thing (semantically) as `user_factory.find(1)`. The difference is that I don't have to instantiate the factory. Really, class methods are nothing more than instance methods on the class object.

## Class vs instance methods
[Link](http://mlomnicki.com/programming/ruby/2011/07/20/class-vs-instance-methods.html)

Why class methods: Shorter code, less objects so less GC, stateless behavior and no need to initialize.

> Procedural

    CssProcessor.process("some code)

> OOP

    processor = CssProcessor.new("some code")
    process

At the first sight it may seem awkward to use an object when class method can be used more easily. Although it's often a trap. The bigger codebase the more time needed to maintain a procedural code.

## Yes, Nick - class methods are evil
[Link](http://andrzejonsoftware.blogspot.com/2011/07/yes-nick-class-methods-are-evil.html)

I blame the ActiveRecord pattern for the current class methods problem. Every Rails application I see is full of globals which are often results or causes of class methods. *The problem with ActiveRecord is that it forces you to think in terms of sql tables.*

#### Comments:
- It does not changing my way of thinking to be more object-oriented than SQL. It's just recall me a facade pattern.
- When you work with Rails and ActiveRecord, then you have to use the ActiveRecord-style OOP which to me is just SQL but with nicer DSL.
