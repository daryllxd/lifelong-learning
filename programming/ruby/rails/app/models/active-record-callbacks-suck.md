## Why ActiveRecord callbacks suck?
[link](http://www.pablocantero.com/blog/2014/08/16/why-activerecord-callbacks-suck/)

Callbacks are a sugar syntax to violate SRP, and they slow down your tests. If you need to send a confirmation email every time you create a new user, you have two responsibilities: one to create a user, and another to send an email.

    class User < ActiveRecord:Model
      after_create :send_confirmation_email

      def send_confirmation_email
        UserMailer.registration_confirmation(self).deliver
      end
    end

If you want to create a new user in the console without sending the confirmation email, you can't. The user creation is coupled with the email sending. What you can do is to create a `UserRegistration` class:

    class UserRegistration
      def initialize(user)
        @user = user
      end

      def register
        @user.save
        UserMailer.registration_confirmation(self).deliver
      end
    end

If every time you create an order, besides persisting, you need to synchronize it with an ERP (API/HTTP call), send a message to a queue, and update products. Do not put this logic in an `after_save`.

Comments:

> I think they are good to enforce constraints within a particular domain, for example: suppose you have a Statement class, which has a month, a year, `belongs_to` an employee and `has_many` transactions. It is a monthly statement, and it needs to know about the employee's salary to do some calculations of its own.

> To skip callbacks:

    after_create :send_greating_email, unless: :skip_callbacks
    User.create(user_params.merge({skip_callbacks: true}))

Reddit thread
[link](http://www.reddit.com/r/rails/comments/2edbdu/why_activerecord_callbacks_suck/)

General rule: AR Callbacks should only be used to manage internal state of an object and never to trigger external behavior.

Never: send emails, create/modify/delete other models, access external systems (web services, job queues, etc.)

If you need to do X when Y happens, you should coordinate that within a business logic orchestration wrapper such as a service class. This is often more work up front, but it is proper software architecture. A lot of the stuff that Rails "lets" you do works, and is quick, until a few months later when your code is an unmaintainable ball of mud and that time you "saved" is paid back 10 fold.

Caching is an application concern, not a glorified DTO concern. Your model should have no knowledge of whether you cache or how you do it. In that case I would go with a lightweight repository pattern that handles persistence + caching, or a service pattern if there are other business orchestrations that need to happen.

*All of this confusion comes from the fact that rails decided that ease-of-development was worth merging the functionality of a domain object and a persistence object into the same concept (ActiveRecord.)* This is fine, it is a tradeoff between ease-of-development and proper software engineering.

At a high level, the common layers in a well-engineered piece of software would be:

- *Persistence layer.* Data transfer objects that directly represent the structure of your Data Store. If your data store is a relational database, it would be common to have one object for each table that has properties matching the columns of said tables.
- *Data access layer.* Translates back and forth between the Persistence Layer and the Business Model layer. This could be a Repository Pattern that takes Business Objects as input, converts them to Data Transfer Objects, writes them to the Data Store, and vice-versa.
- *Business Model layer. Represents the actual domain of the application, agnostic to how that data is persisted to a store.*
- *Service layer.* Orchestrates complex operations between multiple components of the Business Model Layer and external dependencies such as email servers, web servers, other services in the layer.
- *Presentation layer.* Handles the display of the Business Model objects retrieved from the Service layer and/or Data Access layer.
- *Application layer.* together the Data Access, Business Model, and Service Layers to actually solve the problem of the domain. This layer is where higher-level concerns about handling incoming requests, routing them to the appropriate components to solve the task at hand, and responding to the request happen. It is also where you would generally introduce things like caching to increase the performance of the lower layers.

In Rails, these layers would be implemented generally like so:

- Persistence Layer: ActiveRecord
- Data Access Layer: ActiveRecord
- Business Model Layer: ActiveRecord
- Service Layer: This concept is not core to Rails, but many people are introducing it themselves. I'd bet a dollar that sometime in the next couple years the concept of a Service Layer will make it's way into Rails. If it doesn't, I will be sad as I think it is a convention that will solve a lot of the dumb problems I see people commonly facing when building Rails applications.
- Presentation Layer: ActionView
- Application Layer: ActionController and everything above it (routing, etc.)

For many small applications, "the rails way" works just fine. The problem is when it stops working fine and people just go "oh well, I guess that's the way it is" or "all those layers and abstractions are for insane Java/.NET developers, get that crap out of here!" rather than stopping to evaluate if some of those outside ideas actually have a place in a growing application even if the framework does not acknowledge them as core concepts.

Ultimately as an application grows, it needs to be broken down into smaller pieces which communicate with each other through interfaces. More layers will make it a bit harder to wrap your head around how they all work together, but the individual components will be much simpler and easier to understand in isolation. The other benefit of this is that it allows work to be distributed among separate teams with everyone assuming that everyone else is a functioning black box as long as everyone's black box adheres to the agreed upon contract.

I had the same experience in the C#.NET world as you did in the Java world it sounds like. I usually referred to it as programmers with solutions in search of problems. One of the dangers of patterns is that once you give some people a hammer, every problem starts to look like a nail. It's generally a good way to figure out which devs have the ability to be real software architects.

I think the real issue with AR callbacks isn't anything inherent to callbacks themselves. Rather, the problem is that developers try to use them instead of a proper event system.

This is basically an extension of the Fat Model anti-pattern. Properly, model objects exist solely to interact with persistent data. That means model callbacks should likewise be used only for data manipulation, for instance to recompute a calculated field when one of the fields used in the calculation is modified.

Sending an e-mail notification is an excellent example of the kind of thing a model should never, ever do in the first place. So this article doesn't really demonstrate that AR callbacks are bad so much as it demonstrates the pitfalls of Fat Models.

The problem is not how to skip them, there are many ways to do that, the problem is because recently I saw worse implementations than using callbacks (not saying that they are good) just because people tried to avoid them without understating why they are bad. Fighting the evil with much more evil.

*The User model itself should not concern itself with larger domain modeling, it's job is to be a User and manage it's own state, not to send emails.*
