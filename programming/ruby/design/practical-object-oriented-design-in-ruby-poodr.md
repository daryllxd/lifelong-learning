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

