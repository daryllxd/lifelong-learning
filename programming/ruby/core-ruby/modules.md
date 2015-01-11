# Jumpstart Lab
[link](http://tutorials.jumpstartlab.com/topics/models/modules.html)

Rails -- modules can be used to namespace a group of related Rails models. These would usually be stored in a subfolder of models with the name of the namespace.

In `ActiveRecord`, inheritance leads to STI. STI sounds like a good idea, then you end up ripping it out as the project matures. It just isn't a strong design practices. We can mimic inheritance using modules and allow each model to have its own table.

We can do this:

    module TextContent
      def word_count
        body.split.count
      end
    end

Then to make use of the class:

    class Article < AR::Base
      includ TextContent
    end

We can also use modules to share class methods.

## `self.included`

We can modify `self.included` like so:

    def self.included(including_class)
      including_class.extend ClassMethods
      including_class.send(:has_one, :moderator_approval, {as: :content})
    end

`send` allows us to trigger a private method inside another object.


# Pickaxe 9 -- Modules

### Namespaces

Modules define a namespace. Module constants begin with a capital letter.

When you `include` a module within a class definition, it gets `mixed_in`.

A module is basically a class that cannot be instantiated. Like a class, its body is executed during definition and the resulting Module object is stored in a constant.

  class|module name
    include expr
  end

A module may be included within the definition of another module or class using the `include` method.

If a module is included within a class definition, the module’s constants, class variables, and instance methods are effectively bundled into an anonymous (and inaccessible) superclass for that class.

##  RubyMonk

*Modules only hold behaviour, unlike classes, which hold both behaviour and state.*

    module WarmUp
      def push_ups
        "Phew, I need a break!"
      end
    end

    class Gym
      include WarmUp

      def preacher_curls
        "I'm building my biceps."
      end
    end

    puts Gym.new.push_ups

`Module` is the superclass of `Class`, so *classes can be used as modules.*

### Modules as Namespaces

    module Perimeter
      class Array
        def initialize
          @size = 400
        end
      end
    end

    our_array = Perimeter::Array.new
    # our_array.class is Perimeter::Array

Contrived example of extending the `Array` class hehe.

Multiple scopes:

    module Dojo
      A = 4
      module Kata
          B = 8
        module Roulette
          class ScopeIn
            def push
              15
            end
          end
        end
      end
    end

    A = 16
    B = 23
    C = 42

    puts "A - #{A}"
    puts "Dojo::A - #{Dojo::A}"					# Scoped within Dojo

    puts

    puts "B - #{B}"
    puts "Dojo::Kata::B - #{Dojo::Kata::B}"		# Scoped within Dojo::Kata

    puts

    puts "C - #{C}"
    puts "Dojo::Kata::Roulette::ScopeIn.new.push - #{Dojo::Kata::Roulette::ScopeIn.new.push}"
                                                                                          # Scoped within something huge and even in the method itself

  If you prepend a constant with :: without a parent, the scoping happens on the topmost level.

      ::A

## Ruby Best Practices
[link](http://blog.rubybestpractices.com/posts/gregory/037-issue-8-uses-for-modules.html)

    class Blog
      class Comment
      end
    end

A class nested within another class looks the same as a class nested within a module. This would only be really useful when you have a desired namespace for your library that also happens to match one of your class names. *In all other situations, it makes sense to use a module for namespacing as it would prevent your users from creating instances of an empty and meaningless class.*

In general, having to use absolute lookups may be a sign that there is an unnecessary name conflict within your application.

A class is a module that can be instantiated, and you can't mix in a class.

## Practicing Ruby, Modules PDF

#### Modules Features

- You can create nested constants, which allows you to organize your code into namespaces.
- You can `include` a module into a class, mixing in the functionality into all instances of the class.
- You can `extend` the functionality of objects using modules.
- You can define methods and instance variables directly on modules.

#### Core Ruby Mixins

`Comparable`:

    def <=>(other)
      return 0 if result == other.result
      return 1 if result > other.result
      return -1 if result < other.result
    end

By `include Comparable` and adding an implementation for the spaceship (`<=>`) method, you get the other comparison operators (`<`, `>`...) for free.

Ruby's `Enumerable` gives you `select()`, `map()`, `reduce()` for free once you define `each()`.

Mixins don't explicitly distinguish between methods whether they are mixed in at the class or instance level.

    module Wow
      def huh
        puts wewertz
      end
    end

    class WowEx
      extend Wow
      def self.wewertz
        '???'
      end
    end

    puts WowEx.huh #=> '???'

    class WowExDin
      include Wow
      def wewertz
        '???'
      end
    end

    puts WowExDin.new.huh #=> '???'

#### Singleton objects

*When an object doesn't really need to be instantiated at all because it has no data in common between its behaviors, the functional approach often works best.* There are some cases though when a single object is all we need, in particular configuration systems.

    AccessControl.configure do
      role "basic",
        :permissions => [:read_answers, :answer_questions]
      role "premium",
        :parent      => "basic",
        :permissions => [:hide_advertisements]
      role "manager",
        :parent      => "premium",
        :permissions => [:create_quizzes, :edit_quizzes]
      role "owner",
        :parent      => "manager",
        :permissions => [:edit_users, :deactivate_users]
    end

While it is easy to imagine that roles will get added and removed as needed, it's hard to imagine having more than one `AccessControl` object. By modelling `AccessControl` as a module rather than a class, it becomes impossible to create new instances of the object, and so all the state needs to be stored within the module itself.

    module AccessControl
      extend self
      def configure(&block)
        instance_eval(&block)
      end
      def definitions
        @definitions ||= {}
      end

      # Role definition omitted, replace with a stub if you want to test # or refer to Practicing Ruby Issue #4
      def role(level, options={})
        definitions[level] = Role.new(level, options)
      end

      def roles_with_permission(permission)
        definitions.select { |k,v| v.allows?(permission) }.map { |k,_| k }
      end

      def [](level)
        definitions[level]
      end
    end

With this pattern we are able to add and modify definitions with a single object. Because `AccessControl` is an ordinary Ruby object, it has ordinary instance variables and can make use of `instance_eval` just like any other object. The key difference is that `AccessControl` is a module, not a class, and so cannot be used as a factory for creating more instances.
