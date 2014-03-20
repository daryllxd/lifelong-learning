## Pickaxe 9 -- Modules

#### Namespaces

Modules define a namespace. Module constants begin with a capital letter.

When you `include` a module within a class definition, it gets _`mixed_in`_. 








A module is basically a class that cannot be instantiated. Like a class, its body is executed during definition and the resulting Module object is stored in a constant.

	class|module name
		include expr
	end

A module may be included within the definition of another module or class using the `include` method.

If a module is included within a class definition, the module’s constants, class variables, and instance methods are effectively bundled into an anonymous (and inaccessible) superclass for that class.



## RubyMonk

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

#### Modules as Namespaces

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
