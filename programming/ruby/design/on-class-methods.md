## Are Class Methods Evil?
[Link](http://nicksda.apotomo.de/2011/07/are-class-methods-evil/)

Concept: *User object instances wherever possible.*

Class methods are global methods. You may access and call them from anywhere since you don’t need an object instance.

Now, class methods come in handy – you don’t have to think about the context as they’re available everywhere.

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

The reason I’m writing this here is that I like the DCI approach where you dynamically extend objects at runtime according to system state.
Object instances include required behaviour and then, they die. No pollution on class layer.

#### Comments:
- The idea of having `user_factory.find` instead of `User.find` seems crazy. Stuff like `User.first`, `File.read`, `Dir.glob` etc is handy and useful stuff. _Why would I want to do two things (instantiate an instance and then call the method) when I want to do one thing (call the method)._
- But using class methods like the ones from ActiveRecord is absolutely fine – why not?! If your oo-code results in more procedural style code I think the problem is mainly the oo-design not the usage of class methods in general.
- The way I see it, a Ruby class *is* the factory for its instances. That is:
`User.find(1)` is the same thing (semantically) as `user_factory.find(1)`. The difference isthat I don’t have to instantiate the factory. Really, class methods are nothing more than instance methods on the class object.

## Class vs instance methods
[Link](http://mlomnicki.com/programming/ruby/2011/07/20/class-vs-instance-methods.html)

Why class methods: Shorter code, less objects so less GC, stateless behavior and no need to initialize.

> Procedural

    CssProcessor.process("some code) 

> OOP

    processor = CssProcessor.new("some code")
    process

At the first sight it may seem awkward to use an object when class method can be used more easily. Although it’s often a trap. The bigger codebase the more time needed to maintain a procedural code.

## Yes, Nick - class methods are evil
[Link](http://andrzejonsoftware.blogspot.com/2011/07/yes-nick-class-methods-are-evil.html)

I blame the ActiveRecord pattern for the current class methods problem. Every Rails application I see is full of globals which are often results or causes of class methods. *The problem with ActiveRecord is that it forces you to think in terms of sql tables.* 

#### Comments:
- It does not changing my way of thinking to be more object-oriented than sql. It's just recall me a facade pattern.
- When you work with Rails and ActiveRecord, then you have to use the ActiveRecord-style OOP which to me is just sql but with nicer DSL.
