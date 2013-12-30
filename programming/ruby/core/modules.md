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

`Module` is the superclass of `Class`, so classes can be used as modules.

	module Perimeter
	  def perimeter
	    sides.inject(0){|sum, side| sum + side}
	  end
	end

	class Rectangle
	  include Perimeter
	  
	  def initialize(length, breadth)
	    @length = length
	    @breadth = breadth
	  end

	  def sides
	    [@length, @breadth, @length, @breadth]
	  end
	end

	class Square
	  include Perimeter
	  
	  def initialize(side)
	    @side = side
	  end

	  def sides
	    [@side, @side, @side, @side]
	  end
	end

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































