# Simple Delegator (Docs)

    class Person
      attr_accessor :name, :color

      def initialize(name, color)
        @name = name
        @color = color
      end
    end

    class VeryRespectablePerson < SimpleDelegator
      # no need to define initialize
      # has one we're inheriting

      def name
        # Call super to get the superclass of the decorated thingie.
        "The very honorable #{super}"
      end
    end

    p = Person.new("John", "red")
    p.name => "John"

    p = VeryRespectablePerson.new("John")
    p.name = "The very honorable John"

# Decoration is best, except when it isn't
[link](http://devblog.avdi.org/2012/01/31/decoration-is-best-except-when-it-isnt/)

*The problem with decorated methods is that a normal method cannot reference the decorated method when it has no knowledge of the decorator.*

You can patch this by overriding `#observe` as well in the decorator, but that sucks. What you can do is to extend behavior with a module. The module will allow you to override the actual method inside.

This doesn't mean that decorators are overrated. Decorators are easier to understand--given an object A wrapped in object B wrapped in object C, it's easy to reason about how method calls will be handled, but *they will go one way: a method in object A will never reference a method in B or C. By contrast, method calls in a module-extended objet can bounce around the inheritance hierarchy in unexpected ways.*

Once you've extended an object with a module, behavior is changed for `all` clients, and you can't interact with the undecorated object anymore.

Lastly, there's a performance penalty--dynamically extending objects can slow down your code as a result of the method cache being invalidated.

*For applicaitons where you want to adorn an object with some extra functionality, or modify how it presents itself, a decorator is porbably the best bet. Decorators are great for creating Presenters, where we just want to change an object's "face" in a specific context.*

When building up a composite object at runtime out of individual aspects or facets, module extension may make more sense.

# Why Decorator over inheritance
[link](http://www.programmerinterview.com/index.php/design-pattern-questions/decorator-pattern-versus-inheritance/)

Both allow change in how an object behaves.

If you want to dynamically change the behavior of an object using inheritance, you need to use a child class, then create an object of that child class then change the class then copy state then discard the old object.

With the `Decorator` we wrap the current object with another object that contains the extra behavior.

With a Car class, as opposed to subclassing (`LuxuryCar`, `SedanCar`), we can just use the decorator to decorate the objects (`Automatic` for automatic transmission, `Convertible`).

