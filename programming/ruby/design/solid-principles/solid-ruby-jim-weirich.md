# SOLID Ruby
[link](http://confreaks.com/videos/185-rubyconf2009-solid-ruby)

How do you recognize a good design? The most common response I get is, "Huh"? I maintain that in some designs it is easy to tell what bad design looks like.

After the Great Fire of London, the designs submitted were rejected. The city was built incrementally.

SOLID is all about dependencies, because managing dependencies is important. Cars know about engines, but engines don't know about cars. In UML, arrows point in the direction of the dependency. Car objects are allowed to call methods on engine objects.

Another kind of dependency is inheritance. So why are they important? The idea is that we want to manage dependencies.

Ruby is a dynamic language. Does SOLID apply in Ruby?

*SRP.* A class should have one, and only one, reason to change. In the Rake project I maintain, I have `Rake::Application`. It handles command line arguments and it holds the lists of defined tasks in a hash. So it has two reasons to change--if we change the way it parses command line arguments, and if we change how defined tasks are listed.

We can have a `Rake::Application` which has a `Rake::TaskManager` (holds lists of tasks). So the `RakeApplication` just handles the CLI arguments. The advantage is that we can have named scopes. So splitting things up gives you a lot more flexibility in building up your code.

An easy way to know if you're violating the SRP is to figure out what the class/module does, and if you can say "and..." then this may be a violation.

*Open/Closed Principle.* Suppose someone wrote a library and a lot of people use it. If you want to use it, but you want to modify it. We can't just copy it, why not subclass the cool library and use the subclassed version.

The problem with monkey-patching and overriding stuff, you get to break code. What you can do is to just derive the class and use the derived class.

    class CoolLoggger < SimpleLogger
      def format
        # override the shit
      end
    end

Prefer subclassing or wrapping over reopening classes. "Depend upon abstractions, not concretions." Bad: `Thermostat` which needs a `Furnace` object with `on` and `off` methods. Why not make an interface `OnOffDevice` with `on` and `off`, and have `Thermostat` respond to an `OnOffDevice`.

Does this apply in Ruby? BTW, don't do stuff like `unless furnace.is_a?(Furnace)` because you go back to Java. Ruby doesn't have explicit interfaces, but we can have things like protocols. Protocol is just a list of methods with certain semantics.

But don't do this: `[:on, :off].all?{|m| furnace.respond_to?(m)}

In my XMLBuilder, to save an XML to a target, the target says that I need something that can respond to the `<<` operator. Basically, code to protocols. Think about protocols.

Liskov: "If it looks like a duck, quacks like a duck, but needs batteries, you probably have the wrong abstraction." So, when is something substitutable? I think this goes to the roots of the power that OOD gives to you.

Ask yourself this: "what does the method require?" and "what does the method promise?" `sqrt()` requires your input to be non-negative, and it promises to be accurate within some value. This is called the contract. Basically we want a better contract than the superclass, not worse. (BTW, you can also say that there will be a performance hit, and specify it in the contract.) We can also have a less restrictive requirement. A more restrictive requirement is a fail. I might pass in a zero, and it might fail... so when is someething substitutable? *Require no more, promise no less. BTW, this is what duck typing is!*

*Interface Segregation Principle.* Depend on something that will change less. Why? So it is easier to change and it is easier to implement an alternative. Clients should depend on as small an interface as possible. Builder only depends on `<<`. If you are using an array as a stack, only use the push and pop methods. Depend upon narrow protocols.

Active Record objects implement a domain concept and a persistence concept. Does this violate SRP? Yes, absolutely. When designs become more complex, then the classes become bigger and it is harder to test.

