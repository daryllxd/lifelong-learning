# Practical Object-Oriented Design in Ruby

# Introduction

Those of us whose work is to write software are incredibly lucky. Building software is a guiltless pleasure because we get to use our creative energy to get things done. We have arranged our lives to have it both ways; we can enjoy the pure act of writing code in sure knowledge that the code we write has use. We produce things that matter. We are modern people, building structures that make up present-day reality, and no less than bricklayers or bridge builders, we take justifiable pride in our accomplishments.

We want to do our best work. We want our work to have meaning. We want to have fun along the way.

# 1: Object-Oriented Design

The world is procedural, and these activities can be modeled using procedural software.

The world is also object-oriented, and each object comes equipped with its own behavior. In a world of objects, new arrangements of behavior emerge naturally.

This book is about designing OOS, and it views the world as a series of spontaneous interactions between objects. *OOD requires that you shift from thinking of the world as a collection of predefined procedures to modeling the world as a series of messages that pass between objects.* Failures of OOD might look like failures of coding technique, but they are actually failures of perspective. The first requirement for learning how to do OOD is to immerse yourself in objects; once you acquire an OO perspective, the rest follows naturally.

If an application does not change, design does not matter. Unfortunately, something *will* change. It always does. Applications that are easy to change are a pleasure to write and a joy to extend. Few difficult-to-change applications are pleasant to work with.

Object-oriented applications are made up of parts that interact to produce the behavior of the whole. The parts are `objects`, interactions are embodied in the `messages` that pass between them.

Object-oriented design is about managing dependencies. It is a set of coding techniques that arrange dependencies such that objects can tolerate change. Without design, unmanaged dependencies wreak havoc because objects know too much about one another.

In a small application, poor design is survivable. The problem with poorly designed small applications is that if they become successful they grow up to be poorly designed big applications.

## Design: Every application is a collection of code; the code's arrangement is the design

Two isolated programmers, even when they share common ideas about design, can be relied upon to solve the same problem by arranging code in different ways. Design is an art, the art of arranging code.

*Part of the difficulty of design is that every problem has two components. You must not only write code for the feature you plan to deliver today, you must also create code that is amenable to being changed later.*

The purpose of design is to allow you to do design later and its primary goal is to reduce the cost of change.

## How Design Fails

The first way design fails is due to the lack of it. Programmers initially know little about design. This is true of any OO language but some languages are more susceptible than others and an approachable language like Ruby is especially vulnerable.

Agile believes that your customers can't define the software they want before seeing it, so it's best to show them sooner rather than later. Agile believes in collaborating with customers and building software one bit at a time.

If Agile is correct, then these are true: Big Up Front Design sucks, and no one can predict when an application will be done.

Agile processes guarantee change and your ability to make these changes depends on your application's design. If you cannot write well-designed code you'll have to rewrite your application during every iteration.

*Agile does not prohibit design, it requires it. Not only does it require design, it requires really good design. It needs your best work. Its success relies on simple, flexible, and malleable code.*

While SLOC may provide a yardstick by which to measure individual effort and application complexity, it says nothing about overall quality.

Even when you re not intentionally taking on technical debt, design takes time and costs money. Because your goal is to write software with the lowest cost per feature, your decision about how much design to do depends on two things: your skills and your timeframe.

## Intro to OOP

OO apps are made up of objects and the messages that pass between them (messages are more important).

Procedural programming: You can define variables, make up names and associate those names with bits of data. Once assigned, the associated data can be accessed by referring to the variables. In all procedural languages, data is one thing, and behavior is something completely different. Data gets packaged up into variables and then passed around to behavior.

OO languages: Instead of dividing data and behavior, Ruby combines them together into a single thing an object. Objects have behavior and may contain data, and they invoke each other's behavior by sending each other messages.

Ruby has a *string object* instead of a *string data type*. *Sring objects differ in that each contains its own personal string of data, but are similar in that each behaves like the others. Each string encapsulates or hides data from the world. Every object decides for itself how much or how little of its data to expose.*

Because string objects supply their own operations, Ruby doesn't have to know anything in particular about the string data type: *it only needs to provide a general way for objects to send messages.* If strings understand `concat`, Ruby doesn't have to contain syntax for concatenation, but it just needs a way to send `concat` to another.

Class-based OO languages like Ruby allow you to define a class that provides a blueprint for the construction of similar objects. A class defines methods (definitions of behavior) and attributes (definitions of variables). Methods get invoked in response to messages.

*If an application lives long enough (if it succeeds), its biggest problem will be that of dealing with change. Arranging code to efficiently accomodate change is a matter of design.*

# 2: Designing Classes with a Single Responsibility

The foundation of an object-oriented system is the message, but the most visible organizational structure is the data.

## Deciding What Belongs in a Class

*Despite the importance of correctly grouping methods into classes, at this early stage of your project you cannot possibly get it right. You will never know less than you know right now.*

*Code that is easy to change:*

- Changes have no unexpected side effects.
- Small changes in requirements require correspondingly small changes in code.
- Existing code is easy to reuse.
- Easiest way to make a change is to add code that in itself is easy to change.

## Qualities of Code

- Transparent: The consequences of change should be obvious in the code that is changing and in distant code that relies on it.
- Reasonable: The cost of any change should be proportional to the benefits the change achieves.
- Usable: Existing code should be usable in new and unexpected contexts.
- Exemplary: The code itself should encourage those who change it to perpetuate these qualities.

Altering the number of arguments that a method requires breaks all existing callers of the method. This is normally a terrible problem.

Why SRP Matters: Applications that are easy to change consists of classes that are easy to reuse. Reusable classes are pluggable units of well-defined behavior. A class that has more than one responsibility is difficult to reuse. The various responsibilities are likely thoroughly entangled within the class.

How can you determine if the Gear class contains behavior that belongs somewhere else? If you rephrase every one of its methods as a question, asking the question ought to make sense.

Don't resist the idea that “what is your tire?” is a question that can legitimately be asked. From inside the Gear class, tire may feel like a different kind of thing than ratio or `gear_inches`, but that means nothing. From the point of view of every other object, anything that Gear can respond to is just another message. If Gear responds to it, someone will send it, and that sender may be in for a rude surprise when Gear changes.

If you need to say "and" when describing a class, then it is probably doing two things.

OO designers use the word cohesion to describe this concept. When everything in a class is related to its central purpose, the class is said to be highly cohesive or to have a single responsibility. How would you describe the responsibility of the Gear class? How about “Calculate the ratio between two toothed sprockets”? If this is true, the class, as it currently exists, does too much. Perhaps “Calculate the effect that a gear has on a bicycle”? Put this way, `gear_inches` is back on solid ground, but tire size is still quite shaky.

When to Make Design Decisions: Ask yourself, "what is the future cost of doing nothing today?" When the future cost of doing nothing is the same as the current cost, postpone the decision. Make the decision only when you must with the information you have at that time.

## Writing Code that Embraces Change

Depend on Behavior, Not Data: Behavior is captured in methods and invoked by sending messages. When you create classes that have a single responsibility, every bit of behavior lives in one places.

### Hide instance variables.

Always wrap  instance variables in accessor methods instead of directly referring to variables:

    class Gear
      def initialize(chainring, cog)
        @chainring = chainring
        @cog = cog
      end

      def ratio
        @chainring = @cog.to_f # Bad
      end
    end

> Better

    class Gear
      attr_reader :chainring, :cog

      def initialize(chainring, cog)
        @chainring = chainring
        @cog = cog
      end

      def ratio
        chainring = cog.to_f
      end
    end

If the `@cog` instance variable is referred to ten times and suddenly needs to be adjusted, the code will need many changes. But if `@cog` is wrapped in a method, you can change what that means by implementing your own version of the method. Since `attr_reader :cog` creates the `def cog` method, we can override it like this:

    def cog
      @cog * unanticipated_thingie
    end

Dealing with data as if it's an object that understands messages introduces two new issues:

- Wrapping `@cog` in a public cog method exposes this variable to the other objects in your application: any other object can now send `cog` to a `Gear`. (Though you can create a private wrapping method).
- Because it's possible to wrap every instance variable in a method and to treat any variable as if it's just another object, the distinction between data and a regular object begins to disappear.

### Hide Data Structures

> Bad:

    class ObscuringReferences
      attr_reader :data
      def initialize(data)
        @data = data
      end

      def diameters
        # 0 is rim, 1 is tire
        data.collect {|cell| cell[0] + (cell[1] * 2)}
      end
    end

We expect to be passed a two-dimensional array of rims and tires. While we use `attr_reader`, it is not enough. To iterate on the data, it has to know that rims are at `[0]` and tires are at `[1]`. *It depends upon the array's structure, and if that structure changes, then this code must change. When you have data in an array it's not long before you have references to the array's structure all over.*

Direct references into complicated structures are confusing because they obscure what the data really is, and each reference needs to be changed when the structure of the array changes.

You can use Ruby `Struct` to wrap a structure. Ex of taking the same data/parameters but changing the underlying data structure:

    class ReveralingReferences
      attr_reader :data
      def initialize(data)
        @data = wheelify(data)
      end

      def diameters
        wheels.collect { |wheel| wheel.rim + (wheel.tire * 2) }
      end

      Wheel = Struct.new(:rim, :tire)

      def wheelify(data)
        data.collect {|cell| Wheel.new(cell[0], cell[1] }
      end
    end

The `diameters` method now has no knowledge of the internal structure of the array. *All it knows is that the wheels return an enumerable and that each enumerated thing responds to `rim` and `tire`. What were once references to `cell[1]` have been transformed into `wheel.tire`.*

All knowledge of the structure of the incoming array has been isolated inside `wheelify`. If the input changes, the code will change in just this one place. This style of code allows you to protect against changes in externally owned data structures and to make your code more readable and intention revealing.

## Enforcing SRP Everywhere

Methods should also have a single responsibility. All of the same reasons apply, having just one responsibility makes them easy to change and easy to reuse.

> Bad

    def diameters
      wheels.collect {|wheel| wheel.rim + (wheel.tire * 2)}
    end

> Good

    def diameters
      wheels.collect {|wheel| diameter(wheel)}
    end

    def diameter(wheel)
      wheel.rim + (wheel.tire * 2))
    end

This is not a case of overdesign, it merely reorganizes code that is currently in use. Now, we can call `diameter` from other places :). Separate iteration from the action being performed on each element!

> Bad

    def gear_inches
      ratio * (rim + (tire * 2))
    end

> Good

    def gear_inches
      ratio * diameter
    end

    def diameter
      rim + (tire * 2)
    end

*Do these refactorings even when you do not know the ultimate design. They are needed, not because the design is clear, but because it isn't.*

### Why have single responsibility?

- *Expose previously hidden qualities.* Having each of them serve a single purpose makes the set of things the class does more obvious.
- *Avoid the need for comments.* Comments are decaying documentation.
- *Encourage reuse.* Small methods encourage coding behavior that is healthy for your application.
- *Are easy to move to another class.*

### Class or Struct?

Ruby allows you to remove the responsibility for calculating tire diameter from `Gear` without committing to a new class.

    class Gear
      attr_reader :chainring, :cog, :wheel
      def intialize(chainring, cog, rim, tire)
        @chainring = chainring
        @cog = cog
        @wheel = Wheel.new(rim, tire)
      end
    end

Now you have a `Wheel` the can calculate its own diameter--we might move it to its own class but for now this is like an experiment in code organization. If you have a muddled class with too many responsibilities, separate those responsibilities into different classes. Concentrate on the primary class, and if you identify extra responsibilities that you cannot yet remove, isolate them.

# 3: Managing Dependencies

An object depends on another object if, when one object changes, the other might be forced to change in turn.

    class Gear
      attr_reader :chainring, :cog, :rim, :tire

      def initialize(chainring, cog, rim, tire)
        @chainring = chainring
        @cog = cog
        @rim = rim
        @tire = tire
      end

      def gear_inches
        ratio * Wheel.new(rim, tire).diameter
      end

      def ratio
        chainring / cog.to_f
      end
    end

    class Wheel
      attr_reader :rim, :tire

      def initialize(rim, tire)
        @rim = rim
        @tire = tire
      end

      def diameter
        rim + (tire * 2)
      end
    end

## An object has a dependency when it knows:

- The name of another class. `Gear` expects a class named `Wheel` to exist.
- The name of a message that it intends to send to someone other than `self`. `Gear` expects a `Wheel` distance to response to diameter.
- The arguments that a message requires, Gear knows we Wheel needs a rim and a tire.
- The order of those arguments, Gear knows the first argument to Wheel.new should be rim, and the second, tire.

*Each of these dependencies creates a chance that Gear will be forcd to change because of a change to Wheel.* Some degree of dependency between the two classes is inevitable (they must collaborate), but most of the dependencies above are unnecessary. These also make the code less reasonable, because they increase the chance that Gear will be forced to change, these dependencies turn minor code tweaks into undertakings where small changes cascade through the application.

Gear depends on Wheel and four other objects, coupling Gear to five different things. When you want to use Gear in another context, you need to remember everything else. So it is impossible to reuse it as one, changes to one object forces changes in all.

Other dependencies: Where many messages are chained together to reach behavior that lives in a distant object (Law of Demeter). Tests that are too tightly coupled lead to incredible frustration because they break every time something is refactored. Test-to-code over coupling has the same consequence as code-to-code over-coupling.

## Writing Loosely Coupled Code

    def gear_inches
      ratio * Wheel.new(rim, tire).diameter
    end

The Gear knows the name of the Wheel class, and the code in Gear must be changed if Wheel's name changes. When `Gear` hard-codes a reference to `Wheel` deep inside the `gear_inches` method, it is explicitly declaring that it is only willing to calculate gear inches for instances of Wheel. Gear refuses to collaborate with any other kind of object, even if that object has a diameter and uses gears.

If your application expands to include objects such as disks or cylinders and you need to know the gear inches of gears which use them, you cannot. *It's not the class of the object that's important, it's the messsage you plan to send to it. Gear needs access to an object that can respond to `diameter`, a duck type. It is not necessary for `Gear` to know about the existence of the `Wheel` class in order to calculates `gear_inches`.*

`Gear` becomes less useful when it knows too much about other objects, if it knew less it could do more.

    def gear_inches
      ratio * wheel.diameter
    end

    # Gear expects a Duck that knows "diameter"
    Gear.new(52, 11, Wheel.new(26, 1.5)).gear_inches

Gear now uses the `@wheel` variable to hold, *but it doesn't know or care that the object might be an instance of the class `Wheel`.* Moving the creation of the new `Wheel` instance outside of `Gear` decouples the two classes--gear can now collaborate with any object that implements diameter. (Also, we just rearranged existing code).

This is dependency injection. `Gear` previously had explicit dependencies on the `Wheel` class and on the type and order of its initialization arguments, but through injection these dependencies have been reduced to a single dependency on the `diameter` method.

Using DI to shape code relies on your ability to recognize that the responsibility for knowing the name of a class and the responsibility for knowing the name of a message to send to that class may belong in different objects. Just because `Gear` needs to send `diameter` somewhere does not mean that `Gear` should know about `Wheel`.

### Isolate Dependencies

If you are constrained that you cannot change the code to inject a `Wheel` into a `Gear`, you should isolate the creation of a new `Wheel` inside the `Gear` class.

    def initialize
      @wheel = Wheel.new(rim, tire)
    end

We move the `Wheel` dependency to the initialize method. This creates a new `Wheel` each time a new `Gear` is created.

Next alternative isolates creation of a new Wheel in its own explicitly defined method.

    def wheel
      @wheel ||= Wheel.new(rim, tire)
    end

In both of these examples, `Gear` still knows fare too much: Gear is still stuck to Wheel, it can calculate the gear inches of no other kinds of object.

*The improvement is: these coding styles reduce the number of dependencies in `gear_inches` while publicly exposing Gear's dependency on Wheel. They reveal dependencies instead of concealing them.*

If you are mindful of dependencies and develop a habit or routinely injecting them, your classes will naturally be loosely coupled.

### Isolate Vulnerable External Messages

External messages are messages sent to someone other than `self`.

    def gear_inches
      ratio * wheel.diameter
    end

Now, `wheel.diameter` is embedded deeply inside a complex method. This complex method depends on Gear responding to wheel and on wheel responding to diameter. Embedding this external dependency inside the `gear_inches` method is unnecessary and increases it vulnerability.

> Good

    def gear_inches
      foo = ...? * diameter
    end

    def diameter
      wheel.diameter
    end

The new `diameter` method is exactly the method that you would have written if you had many references to `wheel.diameter` sprinkled throughout Gear and you wanted to DRY them out. In the original code, `gear_inches` knew that wheel had a diameter, which couples `gear_inches` to an external object and one of its methods. Now, `gear_inches` is more abstract--`Gear` now isolates `wheel.diameter` in a separate method and `gear_inches` can depend on a message sent to `self`.

At least, if `Wheel` changes the name or signature of its implementation of diameter, the side effects to Gear will be confined to this wrapper method. This is necessary when a class contain embedded references to a message that is likely to change. Although not every external method is a candidate for this preemptive isolation, it's worth examining your code, looking for, and wrapping the most vulnerable dependencies.

### Remove Argument-Order Dependencies

Better to do this:

    def initialize(args)
      @chainring = args[:chainring]
      @cog = args[:cog]
      @wheel = args[:wheel]
    end

Than this:

    def initialize(chainrign, cog, wheel) ... end

We remove every dependency on argument order. Now, we can add or remove initialization arguments and defaults, secure in the knowledge that no change will have side effects in the code. Also, the key names in the hash server as documentation for method calls.

Explicit defaults:

    def initialize(args)
      @chainring = args[:chainring] || 40
      @cog = args[:cog]             || 18
      @wheel = args[:wheel]
    end

Remember: || acts as an or condition. We are relying on the argument to be a `truthy` value. So you cannot get the argument to be initialized with false! Better to set the `fetch` method to set defaults.

    def intialize(args)
      @chainring = args.fetch(:chainring, 40)
      @cog       = args.fetch(:cog, 18)
      @wheel     = args[:wheel]
    end

We can also have this:

    def initialize(args)
      args = defaults.merge(args)
      @chainring = args[:chainring]
    end

    def defaults
      {chainring: 40, cog: 18}
    end

This is useful when the defaults are more complicated--if your defaults are more than simple numbers or strings, implement a defaults method.

### Isolate Multiparameter Initialization

If Gear is part of a framework and that its initialization method requires fixed-order arguments, since the initialize is external to the application, you can wrap it up.

> `SomeFramework::Gear` is an external class.

    module GearWrapper
      def self.gear(args)
        SomeFramework::Gear.new(args[:chainring], args[:cog], args[:wheel])
      end
    end

Now, we can do this:

    GearWrapper.gear(chainring, cog, wheel...)

Ruby module which is responsible for creating new instances of `SomeFramework::Gear`. We can define a separate and distinct object which you can send the gear message while simultaneously conveying the idea that you don't expect to have instances of `GearWrapper`. (Factory method.)

## Managing Dependency Direction

We show Gear depending on Wheel and diameter, but we can also have Wheel depending on Gear and ratio. Which direction do we go?

*Depend on things that change less often than you do.*

- Some classes are more likely than others to have change in requirements. This also applies for code that you did not write.
- Concrete classes are more likely to change than abstract classes. Ex: We moved the dependency of Gear on Wheel to an injection. (In a static language you had to define an interface.) In Ruby, we still define an interface, however casually it is defined. This interface is an abstraction of the idea that a certain category of things will have a diameter. The wonderful thing about abstractions is that they represent common, stable qualities.
- Changing a class that has many dependents will result in widespread consequences. A class that if changed will cause changes to ripple through the application will be under enormous pressure to never change.

Finding the dependencies that matter:

- Little likelihood of change but contain many dependents: abstract classes or interfaces.
- Contains code that is likely to change but has few dependents. Concrete classes.
- Rarely change/few dependents are of least concern.
- *Danger Zone: Many dependents and is likely to change.*

Depend on things that change less often than you do is a heuristic that stands in for all the ideas in this section.

# 4: Creating Flexible Interfaces

*Remember: While classes are so visible, but an OOP application is more than just classes--it is made up of classes but defined by messages. Classes control what's in your source code repository; messages reflect the living, animated application.*

Design must be concerned with the messages that pass between objects--not with what the objects know and who they know, but how they talk to one another.

Better to have the objects communicate in specific and well-defined ways. If these messages left trails, the trails would accumulate to create a set of islands between them.

The roots of the problems lie not in what each class does but with what a class *reveals*. Application message patterns are visibly constrained. This application has some agreement or bargain about which messages may pass (pubic interface). Another kind of interface is one that spans across classes and is independent of any single class.

## Public Interfaces

- Reveal its primary responsibility
- Are expected to be invoked by others
- Will not change on a whim
- Are safe for others to depend on
- Are thoroughly documented in the tests

## Private Interfaces

- Handle implementation details
- Are not expected to be sent by other objects
- Can change for any reason whatsoever
- Are unsafe for others to depend on
- *May not even be referenced in the tests*

## Finding the Public Interface

You know that you should not dive in and start writing code. The reason that test-first gurus can easily start writing test is they have so much design experience. At this stage, they have already constructed a mental map of possibilities for objects and interactions in this application.

In FastFeet, you probably expect to have Customer, Trip, Route, Bike, and Mechanic classes. These classes spring to mind because they represent nouns in the application that have both data and behavior. Call them domain objects--they are obvious because they are persistent, they stand for big, visible real-world things that will end up with a representation in your database.

Domain objects are easy to find, but if you fixate on domain objects you will tend to coerce behavior into them. Design experts notice domain objects without concentrating on them; they focus not on these objects but on the messages that pass between them. These messages are guides that lead you to discover other objects, ones that are just as necessary but far less obvious.

*Before you sit at the keyboard and start typing you should form an intention about the objects and the messages needed to satisfy this use case. You would be best served if you had a simple, inexpensive communication enhancing way to explore design that did not require you to write code.*

The distinction between a message that asks for what the sender wants and a message that tells the receiver how to behave may seem subtle but the consequences are significant.

The public interface for Trip includes the method bicycles. The public interface for Mechanic includes methods `clean_bicycle`, `pump_tires`, `lube_chain`, and `check_brakes`. Trip expects to be holding onto an object that can respond to `clean_bicycle`, `pump_tires`, `lube_chain`, and `check_brakes`.

Trip knows many details about what Mechanic does. Because Trip contains this knowledge and uses it to direct Mechanic, Trip must change if Mechanic adds new procedures to the bike preparation process (let's say we add a new method to check the bike repair kit).

Think of it this way: *Trip has a single responsibility, but it expects a context.* Preparing a trip ALWAYS requires preparing bicycles, and you cannot reuse Trip unless you provide a Mechanic-like object that can respond to this message.

The context that an object expects has a direct effect on how difficult it is to reuse. Objects that have a simple context are easy to use and easy to test. The best possible situation is for an object to be completely independent of its context.

For example: Better to make `Trip` know only about `Mechanic's` `prepare_bicycle` method as opposed to every method inside. That way, `Trip` will just expect an object that can respond to `prepare_bicycle`. Because the responsibility for knowing *how* has been ceded to `Mechanic`, `Trip` will always get the correct behavior, regardless of future improvements to Mechanic.

Because Mechanic promises that its public interface is stable and unchanging, having a small public interface mans that there are few methods for others to depend on. This reduces the likelihood of `Mechanic` someday changing its public interface, breaking its promise, and forcing changes on many other classes.

## Seeking Context Independence

The technique for collaborating with others without knowing who they are is dependency injection. The new problem here is for `Trip` to invoke the correct behavior from `Mechanic` without knowing what `Mechanic` does. `Trip` does not want to collaborate with `Mechanic` while maintaining context independence.

What we can do is to change the preparing of a trip from `prepare_bicycle` to `Trip.prepare_trip`. In this sequence diagram, `Trip` knows nothing about `Mechanic` but still manages to collaborate with it to get bicycles ready. Trip tell Mechanic what it wants, passes `self` as an argument, and Mechanic calls back to `Trip` to get the list of Bicycles that need preparing.

    Trip.prepare_trip(self) #=> We pass ourself to `Mechanic`.
    Mechanic can call `trip.bicycles` and iterate over it to prepare for the trip.

First part: Trip tells `Mechanic` how to prepare a `Bicycle`, almost as if `Trip` was the main program and `Mechanic` is a bunch of callable functions. It's like procedural programming.

Second part: A Trip asks a Mechanic to prepare a bicycle. Trip's context is reduced, and Mechanic's public interface is smaller. *This style of coding places the responsibilities in the correct objects, but continues to require that Trip have more context than is necessary. Trip still knows that it holds onto an object that can respond to prepare_bicycle, and it must ALWAYS have this object.*

Third part: Trip doesn't know or care that it has a Mechanic and it doesn't have any idea what the Mechanic will do. Trip merely holds into an object to which it will send `prepare_trip`: it trusts the receiver of this message to behave appropriately. Trip could place a number of such objects into an array and send each the `prepare_trip` messages, trusting every preparer to do whatever it does because of the kind of thing that it is.

- First: "I know what I want and I know how you do it."
- Second: "I know what I want and I know how you do it."
- Third: "I know what I want and I trust you to do your part."

*This blind trust is a keystone of object-oriented design. It allows objects to collaborate without binding themselves to context and is necesary for an application that expects to grow and change.*

## Using Messages to Discover Objects

Remember use case: "To choose a trip, a customer would like to see a list of available trips of appropriate difficulty, on a specific date, where rental bicycles are available." While it makes sense to put a `suitable_trips` method inside `Customer`, we don't have an object *that embodies the rules at the intersection of Customer, Trip, and Bicycle.* The `suitable_trip` will be part of ITS public interface. Why not add a `TripFinder`:

    Customer calls TripFinder
    TripFinder checks Trip for suitable dates
    For each Trip found check Bicycle for suitable bicycles
    Report to Customer the possible trips

Moving this method into `TripFinder` makes the behavior available to any other object. In the unknown future, perhaps other touring companies will use `TripFinder` to locate suitable trips via a Web service.

## Writing Code that Puts Its Best Interface Forward

The clarity of your interfaces reveals your design skills and reflects your self-discipline. Think about interfaces. Create them intentionally. *It is your interfaces, more than all of your tests and any of your code, that define your application and determine it's future.*

Every time you create a class, declare its interfaces. Public interface methods:

- Be explicitly defined as such.
- Be more about what than how.
- Have names that, insofar as you can anticipate, will not change.
- Take a hash as an options parameter.

Be just as intentional about the private interface; make it inescapably obvious. Either do not test private methods, or segregate those tests from the test of public methods.

Private methods must be called with an implicit receiver, or inversely, may never be called with an explicit receiver. `public` means that a method is stable, while `private` methods denote the least stable kind of method and provides the most restricted visibility.

Honor the public interfaces of others: Do your best to interact with other classes using only their public interfaces. If your design forces the use of a private method in another class, rethink your design.

## The Law of Demeter

Demeter is often paraphrased as "only talk to your immediate neighbors" or "use only one dot". Don't do this:

    class Trip
      def depart
        customer.bicycle.wheel.tire
        customer.bicycle.wheel.rotate
        hash.kets.sort.join(', ')
      end
    end

Consequences:

- If `wheel` changes `tires` or `rotate`, `depart` may have to change. `Trip` has nothing to do with wheel yet changes to wheel might force changes in Trip.
- Changing tire or rotate may break something in depart. Because Trip is distant and apparently unrelated, the failure will be completely unexpected.
- Trip cannot be reused unless it has access to a customer with a bicycle that has a wheel and a tire. It requires a lot of context.

The first two message chains are nearly identical, differing only in that one retrieves a distant attribute (`tire`) and the other invokes distant behavior(`rotate`). It is better to just retrieve an attribute rather than change something so far away.

    hash.kets.sort.join(', ')

`keys` returns an Enumerable, `keys.sort` returns an Enumerable, and `keys.sort.join` returns a String. This is not really a violation in the sense that the intermediate objects have the same types and there is no Demeter violation.

Avoiding violations: you can use `delegate.rb` and `forwardable.rb` and the Rails `delegate` method. Each of these exists to make it easy for an object to automatically intercept a message sent to self and to instead send it somewhere else.

However, message chains usually occur when your design thoughts are unduly influenced by objects you already know. *Reaching across objects to invoke distant behavior is like saying "there's some behavior way over there that I need right here and I KNOW HOW TO GO GET IT.* Just as a Trip earlier knew how Mechanic should prepare a bike, the `depart` method knows how to navigate through a series of objects to make a wheel rotate. It is coupled to your overall object structure.

*When the `depart` method knows this chain of objects, it binds itself to a very specific implementation and it cannot be reused in any other context. Customer must always have Bicycles, which in turn must have Wheels that rotate.*

Just use:

    customer.ride

# 5: Reducing Costs with Duck Typing

Programming languages use the term "type" to describe the category of the contents of a variable. Procedural languages provide a small, fixed number of types, generally used to describe kinds of data. It is knowledge of the category of the contents of a variable (or its type) that allows an application to have an expectation about how those contents will behave. *In Ruby these expectations about the behavior of an object come in the form of beliefs about its public interface. If one object knows another's type, it knows to which messages that object can respond.*

*While `Mechanic` implements the `Mechanic` class's public interface, you are not limited to expecting an object to respond to just ONE interface. It's not what an object is that matters, it's what it does.*

If every object trusts all others to be what it expects at any given moment, and any object can be any kind of thing, then the design possibilities are infinite.

## Overlooking the Duck

  class Trip
    attr_reader :bicycles, :customers, :vehicle

    # this 'mechanic' argument could be of any class
    def prepare(mechanic)
      mechanic.prepare_bicycles(bicycles)
    end

    # ...
  end

  # if you happen to pass an instance of *this* class,
  # it works
  class Mechanic
    def prepare_bicycles(bicycles)
      bicycles.each {|bicycle| prepare_bicycle(bicycle)}
    end

    def prepare_bicycle(bicycle)
      #...
    end
  end

The Mechanic class is not actually messaged (thought the parameter name is mechanic). *The prepare method has no explicit dependency on the Mechanic class but it does depend on receiving an object that can respond to `prepare_bicycles`.*

If we add new classes (`TripCoordinator` and `Driver`), we can end up with this:

    class Trip
      attr_reader :bicycles, :customers, :vehicle

      def prepare(preparers)
        preparers.each {|preparer|
          case preparer
          when Mechanic
            preparer.prepare_bicycles(bicycles)
          when TripCoordinator
            preparer.buy_food(customers)
          when Driver
            preparer.gas_up(vehicle)
            preparer.fill_water_tank(vehicle)
          end
        }
      end
    end

Code like this gets written when programmers are blinded by existing classes and neglect to notice that they have overlooked important messages; this dependent-laden code is a natural outgrowth of a class-based perspective.

Since each class has a different message, you have to determine each argument's class to know which message to send. We can use a `case` but the problem is now, we have new dependencies in the `prepare` method: It relies on specific classes (Mechanic, Driver). It knows the names of the messages that each class understands (`prepare_bicycles` and `fill_water_tank`). All of this knowledge increases risk; many distant changes will now have side effects on this code.

To make matters worse, this style of code propagates itself. When another trip preparer appears, you add a new `when` branch to the case statement. Your application will get more and more methods like this, where the method knows many class names and sends a specific messages based on class.

Why not add a `Preparer` which has `prepare_trip`?

    class Trip
      attr_reader :bicycles, :customers, :vehicle

      def prepare(preparers)
        preparers.each {|preparer|
          preparer.prepare_trip(self)}
      end
    end

    # when every preparer is a Duck
    # that responds to 'prepare_trip'
    class Mechanic
      def prepare_trip(trip)
        trip.bicycles.each {|bicycle|
          prepare_bicycle(bicycle)}

    class TripCoordinator
      def prepare_trip(trip)
        buy_food(trip.customers)

    class Driver
      def prepare_trip(trip)
        vehicle = trip.vehicle
        gas_up(vehicle)
        fill_water_tank(vehicle)

The `prepare` method can now accept new `Preparers` without being forced to change, and it's easy to create additional `Preparers` if the need arises. *Before, we depended on a conceretion, whereas now, we depend on a duck type. The concreteness of the first example makes it simple to understand but dangerous to extend. The final, duck typed, alternative is more abstract; it places slightly greater demands on your understanding, but it offers ease of extension. Now that you have discovered the duck, you can just turn another object into a `Preparer` and pass it into Trip's `prepare` method.*

The ability to tolerate ambiguity about the class of an object is the hallmark of a confident designer. Once you begin to treat your objects as if they are defined by their behavior rather than by their class, you enter a new realm of expressive flexible design.

*Polymorphic methods honor an implicit bargain; they agree to be interchangeable from the sender's point of view. An object implementing a polymorphic method can be substituted for any other; the sender of the message need now know or care about this substitution.*

Recognizing Hidden Ducks: Replace these: *`kind_of?`, `is_a?`, `responds_to`, case statements*.

The Preparer duck type and its public interface are a concrete part of the design but a virtual part of the code. Preparers are abstract. When you create duck types you must both document and test their public interfaces. Fortunately, good tests are the best documentation.

## Static versus Dynamic Typing

Static: The compiler unearths type errors at compile time, visible type information serves as documentation, and compiled code is optimized to run quickly.

These are strengths if you accept this set of assumptions: runtime errors will occur unless the compiler type-checks, programmers will not understand the code if they cannot infer the object's type from its context, and the application will run too slowly without these optimizations.

Dynamic: Code is interpreted and can be dynamically loaded (no compile/make cycle), source code does not include explicit type information, and metaprogramming is easier.

These are strengths if you accept this set of assumptions: Overall application development is faster without a compile/make cycle, programmers find the code easier to understand when it does not contain type declarations, and if metaprogramming is a desirable language feature.

*Embracing Dynamic Typing.* Without a doubt, for certain applications, well-optimized statically typed code will outperform a dynamically typed implementation. Arguments about the value of type declarations as documentation are subjective. Metaprogramming is very polarizing, and while it is dangerous in the wrong hands, it's a tool no good programmer should willingly be without.

Dynamic typing allows you to trade compile time type checking, a serious restriction that has high cost and provides little value, for the huge gains in efficiency provided by removing the compile/make cycle. TAKE THIS!


