# Ruby Best Practices #23: SOLID Design Principles
[link](http://blog.rubybestpractices.com/posts/gregory/055-issue-23-solid-design.html)

- Single Responsibility Principle: An object should have a single responsibility.
- Open/Closed Principle: An object should be open for extension, but closed for modification.
- Liskov Substitution Principle: Objects in a program should be replaceable with instances of their subtypes without altering correctness of that program.
- Interface Segregation Principle: Many client specific interfaces are better than one general purpose interface.
- Dependency Inversion Principle: Depend upon abstractions, do not depend upon concretions.

## Single Responsibility Principle

The hard part about putting this idea into practice is figuring out just how wide to cast the "single responsibility" net.

In Prawn, what happened was that he split the different aspects of functionality into modules. `Prawn::Document` has 60+ public methods all sharing the same state and namespace.

Solution: Produce a whole layer of low level tooling that closely follows the PDF spec, creating objects for managing things like a PDF-level pages, the rendering of raw PDF strings, etc. Make as many objects necessary to do that, and then maybe provide a facade that makes interacting with them a bit easier.

Then, for the higher level features, do the same thing--have an object who's only job is to provide pretty looking methods. Dedicate whole objects or even clusters of objects to text, images, graphics, and any other cluster of functionality that was mixed into Document directly.

## Open/Closed Principle

When you introduce a new behavior to an existing system, rather than modifying old objects you should create new objects which inherit from or delegate to the target object you wish to extend, as opposed to modifying the shit.

*Treating this as an absolute law might lead to the creation of a lot of unnecessary wrapper objects. But that doesn't mean those ideas don't have their value, in fact they provide an excellent alternative to extensive monkeypatching of third party code.*

As opposed to modifying the ordinary expected behavior of an `ActiveRecord` model, this approach creates a new entity which can have new behaviors while reusing the old functionality.

## Liskov Substitution Principle

Functions that are designed operate on a given type of objects should work without modification when they operate on objects that belong to a subtype of the original type.

When we talk about the type of an object in Ruby, we're concerned with what messages that object responds to, rather than what class that object is an instance of. *Objects that are meant to be treated as subtypes of a base type should not break the contracts of the base type. The rule of thumb is basically not to inherit from anything or mix in a module unless you're fairly certain that the behavior you're implementing will not interfere with th internal operations of your ancestors.*

Ex: Don't override `ActiveRecord` methods!

## Interface Segregation Principle

Java-style interfaces: Prevent code from specifying that an object must be a specific type when all that is required is a certain set of methods to have a meaningful implementation.

`is_a?` and `respond_to?` checks are both a form of LSP violation. To protect against those violations, the best bet is to embrace duck typing as much as possible.

## Dependency Inversion Principle

We have a `Roster` and a `RosterPrinter`:

    class Roster
      def participant names ... end

      def to_s
        RosterPrinter.new(participant_names).tos
      end
    end

    class RosterPrinter
      def initialize(participant_names)
        @participant_names = participant_names
      end

      def to_s
        * Do the printy thing *
      end
    end

We can do this:

    class Roster
      def to_s(printer = RosterPrinter)
        printer.new(participant_names).to_s
      end
    end

This is functionally the same as the old example, but we can trivially swap in any printer object we want.

    class HTMLRosterPrinter
      def to_s
        * HTML thingies *
      end
    end

*By injecting the printer object into `Roster`, we can avoid having to resort to creating a Roster subclass for the sole purpose of wiring up the `HTMLRosterPrinter`.*

*The most common place that talks about DI is when people are running tests, it's a whole lot cleaner to pass in raw mock objects that it is to set expectations on real objects.*

Dependency inversion can really come in handy, but it's important to provide sensible defaults so that you don't end up forcing consumers of your API to do a lot of tedious wiring. The trick is to make it so you can swap out implementations easily, so it's not important for your code to have no opinion about which implementation it should use.

