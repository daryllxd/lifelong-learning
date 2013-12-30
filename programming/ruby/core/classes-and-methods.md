## RubyMonk

	x.class, 1.class, "".class
	x.is_a?("Integer")
	x.is_a?("String")
	1.class.class 				# Class

For a class to justify its existence, it needs to have two distinct features:

1. State: It defines the attributes of its instances.
2. Behavior: It must do something meaningful.

Example:

		class Rectangle
		  def initialize(length, breadth)
		    @length = length
		    @breadth = breadth
		  end

		  def perimeter
		    2 * (@length + @breadth)
		  end
		  
		  def area
		    @length * @breadth
		  end

		  #write the 'area' method here
		end

#### Methods

Methods are also objects. 

	1.method("next") #<Method: Fixnum(Integer)#next>

Even a method that does nothing at all and has no return produces an object - `nil`.

`Return` returns `nil` if no object is specified.

Splat: Used to handle methods which has a variable parameter list.

	def add(*numbers)
	  numbers.inject(0) { |sum, number| sum + number }
	end

	def add_with_message(message, *numbers)
	  "#{message} : #{add(*numbers)}"
	end

	puts add_with_message("The Sum is", 1, 2, 3)

3rd parameter hash example

	def add(a_number, another_number, options = {})
	  sum = a_number + another_number
	  sum = sum.abs if options[:absolute]
	  sum = sum.round(options[:precision]) if options[:round]
	  sum
	end

	puts add(1.0134, -5.568)
	puts add(1.0134, -5.568, absolute: true)
	puts add(1.0134, -5.568, absolute: true, round: true, precision: 2)

Injects and shit

	def add(*numbers)
		numbers.inject(0) { |sum, number| sum + number }  
	end

	def subtract(*numbers)
	  sum = numbers.shift
	  numbers.inject(sum) { |sum, number| sum - number }  
	end

	def calculate(*arguments)
	  # if the last argument is a Hash, extract it 
	  # otherwise create an empty Hash
	  options = arguments[-1].is_a?(Hash) ? arguments.pop : {}
	  options[:add] = true if options.empty?
	  return add(*arguments) if options[:add]
	  return subtract(*arguments) if options[:subtract]
	end



























