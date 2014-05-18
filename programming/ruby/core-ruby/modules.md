# Jumpstart Lab
[link](http://tutorials.jumpstartlab.com/topics/models/modules.html)

Rails -- modules can be used to namespace a group of related Rails models. These would usually be stored in a subfolder of models with the name of the namespace.

In `ActiveRecord`, inheritance leads to STI. STI sounds like a good idea, then you end up ripping it out as the project matures. It just isn't a strong desing practices. We can mimic inheritance using modules and allow each model to have its own table.

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

When you `include` a module within a class definition, it gets _`mixed_in`_.

A module is basically a class that cannot be instantiated. Like a class, its body is executed during definition and the resulting Module object is stored in a constant.

  class|module name
    include expr
  end

A module may be included within the definition of another module or class using the `include` method.

If a module is included within a class definition, the module’s constants, class variables, and instance methods are effectively bundled into an anonymous (and inaccessible) superclass for that class.



# RubyMonk

Modules only hold behaviour, unlike classes, which hold both behaviour and state.

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
