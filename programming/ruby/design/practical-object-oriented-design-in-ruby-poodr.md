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

Always wrap instance variables in accessor methods instead of directly referring to variables:

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

               class RevealingReferences
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

  def initialize(chainring, cog, wheel) ... end

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
  - Second: "I know what I want and I know what you do."
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

# 6: Acquiring Behavior Through Inheritance

  Inheritance is a mechanism for automatic message delegation. It defines a forwarding path for not-understood messages. It creates relationships such that if one object cannot respond to a received message, it delegates that message to another. You don't have to write code to explicitly delegate the message, instead you define an inheritance relationship between two objects and the forwarding happens automatically.

## Recognizing Where to Use Inheritance

1. Find a concrete class.

2. Embedding multiple types. When a preexisting concrete class contains most of the behavior you need, it's tempting to solve this problem by adding code to that class. The problem is when you want to constantly check stuff like `type` or `style`, or if behavior changes when you add a new `style` or `type`.

    If there are hashes or variables inside the object, it is impossible to know which parts has been initialized or not. We might be tempted to check `style` just to see if a `Bicycle` has `tape_color` or `rear_shock`.

    The antipattern: *It checks an attribute that holds the category of self to determine what message to send to self. Remember duck typing, where an `if` statement CHECKS THE CLASS OF AN OBJECT TO DETERMINE WHAT MESSAGE TO SEND TO THAT OBJECT.*

    Think of the class of an object as merely a specific case of an attribute that holds the category of self; considered this way, these patterns are the same.

    Be on the lookout for this pattern. While sometimes innocent and occasionally defensible, its presence might be exposing a costly flaw in your design. Chapter 5, Reducing Costs with Duck Typing, used this pattern to discover a missing duck type; here the pattern indicates a missing subtype, better known as a subclass.

3. Finding the embedded types. *The `if` statement in the `spares` method above switches on a variable named `style`, but it would have been just as natural to call that variable type or category.* Variable with these kinds of names are your cue to notice the underlying pattern. Type and category are words perilously similar to those you would use when describing a class. *After all, what is a class if not a category or type?*

  The `style` variable effectively divides instance of `Bicycle` into two different kinds of things. These two things share a great deal of behavior but differ along the style dimension. Some of `Bicycle's` behavior applies to all bicycles, some only to road bikes, and some only to mountain bikes.  *This is the exact problem that inheritance solves; that of highly related types that share common behavior but differ along some dimension.*

## Choosing Inheritance

Inheritance provides a way to define two objects as having a relationship such that when the first receives a message that it does not understand, it automatically forwards, or delegates, the message to the second.

Message forwarding via classical inheritance takes place between classes. Because duck types cut across classes, they do not use classical inheritance to share common behavior.

## Finding the Abstraction

The naming choice is perfectly appropriate in an application where every `Bicycle` is a road bike. When there's only one kind of bike, choosing `Roadbike` for the class name is unnecessary/overly specific. However, now that `MountainBike` exists...

*For inheritance to work, two things must always be true. First, the objects that you are modeling must truly have a generalization-specialization relationship. Second, you must use the correct coding techniques.*

Many of the difficulties of inheritance are cause by a failure to rigorously separate the concrete from the abstract. When deciding between  refactoring strategies, it's useful to ask the question: "What will happen if I'm wrong?"

The general rule for refactoring into a new inheritance hierarchy is to arrange code so that you can promote abstractions rather than demote concretions.

## Using the Template Method Pattern

`Bicycle` now provides structure, a common algorithm if you will, for its subclasses. Where it permits them to influence the algorithm, it sends messages. Subclasses contributes to the algorithm by implementing matching methods.

To solve the must implement thing, do this:

    def default_tire_size
      raise NotImplementedError, "This #{self.class} cannot respond to:"
    end

## Decoupling Subclasses Using Hook Messages

Sometimes we might fail to write `super`. Instead of allowing subclasses to know the algorithm and requiring that they send `super`, superclasses can instead send hook messages, ones that exist solely to provide subclasses a place to contribute information by implementing matching methods. This strategy removes knowledge of the algorithm from the subclass and returns control to the superclass.

    class Bicycle
      def initialize
        ...
        post_initialize(args)
      end

      def post_initialize(args)
        nil
      end
    end

    class Roadbike < Bicycle
      def post_initialize(args)
        @tape_color = args[:tape_color]
      end
    end

This change doesn't just remove the send of `super` from `Roadbike's initialize`, it removes the `initialize` method altogether. Putting control of the timing in the superclass means the algorithm can change without forcing changes upon the subclasses.

Removing `local_spares`:

    class Bicycle
      def spares
        { ... }.merge(local_spares)
      end

      def local_spares
      {}
      end
    end

    class Roadbike < Bicycle
      def local_spares
        { tape_color : tape_color }
      end
    end

`Roadbike` no longer has to know that `Bicycle` implements a `spares` method; it merely expects that its own implementation of `local_spares` will be called, by some object, at some time.

Inheritance solves the problem of related types that share a great deal of common behavior but differ across some dimension. It allows you to isolate shared code and implement common algorithms in an abstract class, while also providing a structure that permits subclasses to contribute specializations.

# 7: Sharing Roles Behavior with Modules

Creating a `Recumbent Mountain Bike` requires combining the qualities of two existing subclasses, something that inheritance cannot readily accommodate. Even more distressing is the fact that this failure illustrates just one of several ways in which inheritance can go  wrong.

## Understanding Roles

Some problems require sharing behavior among otherwise unrelated objects. This common behavior is orthogonal to class, it's a *role* an object plays.

`Preparer` is a role. The existence of a `Preparer` role suggests that there's also a parallel `Preparable` role. To play this role all an object need do is implement `prepare_trip`.

The total set of messages to which an object can respond includes:

- Those it implements.
- Those implemented in all objects above it in the hierarchy.
- Those implemented in any module that has been added to it.
- Those implemented in all modules added to any object above it in the hierarchy.

Interface:

    scheduled?(target, starting, ending)
    add(target, starting, ending)
    remove(target, starting, ending)

    * Each needs a lead time which is different depending on `target.class`

The fact that the `Schedule` checks many class names to determine what value to place in one variable suggests that the variable name should be turned into a message, which in turn should be sent to each incoming object.

Discovering the duck type interface `lead_days` improves the code on specific class names.

Using a spearate class to manage strings is redundant (`StringUtils.empty?(some_string)`). Since strings have their own behavior, they should manage themselves. Requiring that other objects know about a third party, `StringUtils`, to get behavior from a string complicates the code by adding an unnecessary dependency.

*Objects should manage themselves; they should contain their own behavior.* If your interest is in object B, you should not be forced to know about object A if your only use of it is to find things out about B.

> Schedulable module

    module Schedulable
      attr_writer :schedule

      def schedule
        @schedule ||= ::Schedule.new
      end

      def schedulable?(start_date, end_date)
        !scheduled?(start_date - lead_days, end_date)
      end

      def scheduled?(start_date, end_date)
        schedule.scheduled?(self, start_date, end_date)
      end

      def lead_days
         0
      end
    end

The dependency on `Schedule` has been removed from `Bicycle`, reducing its reach into the application. We still have to implement `lead_days` on `Schedulable` just to have a reasonable default. But every class including `Schedulable` has to implement not `scheduled`, but just `lead_days`.

    class Bicycle
      include Schedulable

      def lead_days
        1
      end
    end

*The code in `Schedulable` is the abstraction and it uses the template method pattern to invite objects to provide specializations to the algorithm it supplies. `Schedulables` override `lead_days` to supply those specializations. When `schedulable?` arrives at any `Schedulable`, the message is automatically delegated to the module.*

Constantly check *is-a* versus *behaves-like-a*. Each choice has distinct consequences.

## Inheriting Role Behavior

Antipattern 1: An object that uses a variable with a name like `type` or `category` to determine what message to send to `self` contains two highly related but slightly different types. Use common code in an abstract superclass and create subclasses for the different types.

Antipattern 2: When a sending object checks the class of a receiving object to determine what message to send, you have overlooked a duck type. *This role should be codified as a duck type and receivers should implement the duck type's interface. Once they do, the original object can send one single message to every receiver.*

Insist on the Abstraction. *Subclasses that override a method to raise `does not implement` are a sympton of faulty abstraction. When subclasses override a method to declare that they do not do that thing they come perilously close to declaring that they are not that thing.*

Honor the contract. Subclasses promise to be substitutable for their superclasses. Substitutability is possible only when objects behave as expected an subclasses are expected to conform to their superclass's interface. They must respond to every message in that interface, taking the same kinds of inputs and returning the same kinds of outputs. They are not permitted to do anything that forces others to check their type in order to know how to treat them or what to expect of them.

Use the Template Method Pattern. This pattern is what allows you to separate the abstract from the concrete. The abstract code defines the algorithms and the concrete inheritors of that abstraction contribute specializations by overriding these template methods.

Preemptively decouple classes. Avoid writing code that requires its inheritors to send `super`; instead use hook messages to allow subclasses to participate while absolving them of responsibility for knowing the abstract algorithm. Inheritance, by its very nature, adds powerful dependencies on the structure and arrangement of code. Writing code that requires subclasses to send `super` adds an additional dependency; avoid this if you can.

# 8: Combining Objects with Composition

Maybe `Parts` is an array, albeit one with a bit of extra behavior.

    class Parts < Array
      def spares
        select {|part| part.needs_spare}
      end
    end

The problem is that there are too many methods in `Array` that return new arrays, and they return instance of type `Array`, not instances of your subclass.

What we can use is this:

    require 'forwardable'
    class Parts
      extend Forwardable
      def delegators :@parts, :size, :each
      include Enumerable

      def initialize(parts)
        @parts = parts
      end

      def spares
        select {|part| part.needs_spare}
      end
    end

We don't implement everything in `Array` but at least we implement enough to respond to `size`.

## Parts Factory
[TODO]: THIS_SHIT

## Deciding Between Inheritance and Composition

Classical inheritance is a code arrangement technique. Behavior is dispersed among objects and these objects are organized into class relationships such that automatic delegation of messages invokes the correct behavior. *Think of it this way: For the cost of arranging objects in a hierarchy, you get message delegation for free.*

*In composition, the relationship between objects is not codified in the class hierarchy; instead objects stand alone and as a result must explicitly know about and delegate messages to one another. Composition allows objects to have structural independence, at the cost of explicit message delegation.*

Favor composition over inheritance. Inheritance is a better solution when its use provides high rewards for low risk.

## Accepting the Consequence of Inheritance

Costs

- You are fooled into choosing inheritance to solve the wrong kind of problem. Because the model is incorrect, new behavior won't fit.
- Even when inheritance makes sense, you might be writing code that will be used by others for purposes you did not anticipate.
- It is impossible to add behavior when new subclasses represent a mixture of types.
- It is difficult to extend incorrectly modeled hierarchies.

## Accepting the Consequence of Composition

Costs

- The benefits of structural independence are gained at the cost of automatic message delegation. The composed object must explicitly know which messages to delegate and to whom.
- Identical delegation code may be needed by many different objects; composition provides no way to share this code.

## Choosing Relationships

*Use Inheritance for is-a Relationships.* When you select inheritance over composition you are placing a bet that the benefits accrued will outweigh the costs. Some bets are more likely to pay off than others. A hierarchy's small size makes it understandable, intention revealing, and easily extendable. In the unlikely event that you are wrong, the cost of changing is also low.

*Use Duck Types for behaves-like-a Relationships.* In addition to their core responsibilities, objects might play roles like `schedulable`, `preparable`, `printable`, or `persistable`.

Think from the POV of a holder of a role player rather than that of a player of a role. The holder of a schedulable expects it to implement `Schedulable's` interface and to honor `Schedulable's` contract. Your design task is to recognize that a role exists, define the interface of its duck type, and provide an implementation of that interface for every possible player. Some roles consist only of their interface, others share common behavior.

*Use Composition for has-a Relationships.* The more parts an object has, the more likely it is that it should be modeled with composition.

# 9: Designing Cost-Effective Tests

To write changeable code, you need three skills:

1. Understand OOD. Poorly designed code is naturally difficult to change. From a practical point of view, changeability is the only design metric that matters; code that's easy to change is well-designed.
2. Refactoring code. "Refactoring is the process of changing a software system in such a way that it does not alter the external behavior of the code yet improves the internal structure."
3. High-value tests. Tests give you confidence to refactor constantly. Efficient tests prove that altered code continues to behave correctly without raising overall costs.

The solution to the problem of costly tests is not to stop testing but instead to get better at it. Getting good value from tests requires clarity of intention and knowing what, when, and how to test.

## Know Your Intentions

- Finding bugs.
- Supplying documentation.
- Deferring design decisions. Intentionally depending on interfaces allows you to use tests to put off design decisions safely and without penalty.
- Supporting abstractions.
- Exposing design flaws. If a test requires painful setup, the code expects too much context. If testing one object drags a bunch of others, the code has too many dependencies.

## Knowing What to Test

One simple way to get better value from tests is to write fewer of them. The safest way to accomplish this is to test everything just once and in the proper place.

Think of an OO application as a series of messages passing between a set of black boxes. Dealing with every object as a black box puts constraints on what others are permitted to know and limits the public knowledge about any object to the messages that pierce its boundaries.

Willful ignorance of the internals of every other object is at the core of design. Dealing with objects as if they are only and exactly the messages to which they respond lets you change a changeable application. Same with your tests. Each test is merely another application object that needs to use an existing class.

Not only should you limit couplings, but the few you allow should be to stable things. The most stable thing about any object is its public interface, it logically follows that the tests you write should be for messages that are defined in public interfaces.

Tests that make assertions about the values that messages return are tests of state. Such tests commonly assert that the results returned by a message equal an expected value. *Objects should make assertions about state only for messages in their own public interfaces. Following this rule confines test of message return values to a single place and removes duplication.*

*For query messages, they do not need to be tested by the sending object. Query messages are part of the public interface of their receiver.*

*For command mesages (messages that do have side effects), it is the responsibility of the sending object to prove that they are properly sent. Proving that a message gets sent it a test of behavior, not state, and involves assertions about the number of times, and with what arguments, the message is sent.*

## Knowing When to Test

You should write tests first, whenever it makes sense to do so. Writings tests first forces reusability to be built into an object from its inception; it would otherwise be impossible to write tests at all. Novice designers are best served by writing test-first code. If you are a novice, it's important to sustain faith in the value of tests. Done at the correct time and in the right amounts, testing and writing code tests-first will lower your overall costs.

## Knowing How to Test

### Testing Incoming Messages

(We no longer care about a wheel, we just care about something that has the `diameter` method. Gear depends upon `Diameterizable`, `Wheel` implements it.)

### Testing Outgoing Messages

*Ignore query messages.* Tests that query a class's methods has to be in the class that owns it.


*Proving command messages.* We have an observer:

    class Gear
      def initialize(arg)
        @observer = args[:observer]
      end

      def changed
        observer.changed(chainring, cog)
      end
    end

Since `Gear` has to notify `observer` when cogs or chainrings change, you have to assert that the message gets sent, but we don't know anything about how `observer's changed` method returns. `observer's` tests are responsible for making assertions about the results of its changed method. The responsibility for testing a message's return value lies with its receiver.

    def setup
      @observer = MiniTest::Mock.new
      @gear = Gear.new(..., observer: @observer)
    end

    def test_notifies_observers_when_cogs_change
      @observer.expect(:changed, true, ....)
      @gear.set_cog(27)
      @observer.verify
    end

Expect `observer` to receive `changed`, and verify it after.

All the mock did with the message was remember that it received it. *The fact that `Gear` works just fine even after you mock `observer's` `changed` method proves that `Gear` doesn't care about what that method actually does. `Gear's` only responsiblity is to send the message; this test should restrict itself to proving `Gear` does so.*

If you have proactively injected dependencies, you can easily substitute mocks.

### Testing Duck Types

For the `preparer` example:

    module PreparerInterfaceTest
      def test_implements_the_preparer_interface
        assert respond_to(@object, :prepare_trip)
      end
    end

    class MechanicTest
      include PreparerInterfaceTest

      def setup
        @mechanic = @object = Mechanic.new
      end
    end

Defining `PreparerInterfaceTest` as a module allows you to write the test once and then reuse it in every object that plays the role. *The module serves as a test and as documentation.* It raises the visibility of the role and makes it easy to prove that any newly created `Preparer` successfully fulfills its obligations.

Testing that the interface is actually used:

    class TripTest
      def test_requires_trip_preparation
        @preparer = MiniTest::Mock.new
        @trip = Trip.new
        @preparer.expect(:prepare_trip, nil, [@trip])

        @trip.prepare([@preparer])
        @preparer.verify
      end
    end

### Testing Inherited Code

*Superclass:* Assert that responds to the methods in the superclass.

    module BicycleInterfaceTest
      def test_responds_to_default_tire_size
        assert_respond_to(@object, :default_tire_size)
      end

      def test_responds_to_default_chain
        assert_respond_to(@object, :default_chain)
      end
    end

Implement these in the super/subclasses.

    class BicycleTest
      include BicycleInterfaceTest
    end

    class RoadBikeTest
      include BicycleInterfaceTest
    end

*Specifying Subclass Responsibilities.* Codify subclass responsibilities, just make sure they respond (not necessarily implement their own) these methods.

    module BicycleSubclasstest
      def test_responds_to_post_initialize
        assert_respond_to(@object, :post_initialize)
      end
    end

Test the subclasses:

    class RoadBikeTest
      include BicycleInterfaceTest
      include BicycleSubclasstest
    end

*Confirming Superclass Enforcement.* The `Bicycle` class should raise an error if a subclass does not implement `default_tire_size`. Add this:

    def test_forces_subclasses_to_implement_default_tire_size
      assert_raises(NotImplementedError) { @bike.default_tire_size }
    end

*Testing Concrete Subclass Behavior.* It is important to test these specializations without embedding knowledge of the superclass into the test. `RoadBike`  implements `local_spares` and also responds to `spares`. We already have a test for spares, we just want to test `local_spares`.

*Testing Abstract Superclass Behavior.* Create a `StubbedBike`. Use LSP to your advantage.
