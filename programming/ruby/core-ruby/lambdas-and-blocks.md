## RubyMonk Dive, Ascent, [Blocks and Yields in Ruby](http://stackoverflow.com/questions/3066703/blocks-and-yields-in-ruby?rq=1), [Understanding Ruby Blocks, Procs and Lambdas](http://www.robertsosinski.com/2008/12/21/understanding-ruby-blocks-procs-and-lambdas/)

A lambda is just a function without a name. They can be assigned to variables.

	l = lambda { "Do or do not" }
	puts l.call # Call the thing!

Function that increments things

	Increment = lambda {|x| x.next }
	# You can call stuff on it now.
	Increment.call(1) => 2
	Increment.call(-1) => 0

Lambdas vs. Blocks: A lambda is a piece of code you can store in a variable and is an object. A block _can't_ be stored in a variable and isn't an object.

The use of lambdas: Passing one block to a method which in turn uses it to get some work done.

Ex:

	def demonstrate_block(number)
	  yield(number)
	end

	puts demonstrate_block(1) { |number| number + 1 }

No `lambda`, but there is `yield`.

	def calculate (*args)
	  yield(*args)
	end

	calculate(2, 3) {|a, b| a + b} returns 5
	calculate(2, 3) {|a, b| a - b} returns -1

#### What are blocks?

"A block is code that you can store in a variable like any other object and run on demand." 

	addition = lambda {|a, b| return a + b }
	puts addition.call(5, 6)

Blocks are objects, and are members of class `Proc`, which is what a block is called in Ruby.

A method is simply a block bound to an object, with access to the object's state.

	Addition 		= lambda {|a, b|  a + b }
	Subtraction 	= lambda {|a, b| a - b }
	Multiplication 	= lambda {|a, b| a * b }
	Division 		= lambda {|a, b| a / b  }

#### Yield

The most common usage of blocks involves passing exactly one block to a method.

Old method:

	def calculation(a, b, operation)
	  operation.call(a, b)
	end

	puts calculation(5, 6, lambda { |a, b| a + b }) # addition

With `yield`, this is the same thing.

	def calculation(a, b)
	  yield(a, b)
	end

	puts calculation(5, 6) { |a, b| a + b } # addition
	puts calculation(5, 6) { |a, b| a - b } # subtraction

Differences between `yield` and the normal approach:

- The block is no longer a parameter to the method. It has been _implicitly passed_ to the method.
- `yield` makes executing the block feel like a method invocation within the method invocation (compare with doing `call` again).

Yield is not a method. `yield.class = ???`

A `yield` can provide a custom sort algorithm.

	days.sort do |x,y|
	    x.size <=> y.size
	 end

	=> ["monday", "friday", "tuesday", "thursday", "wednesday"]

Optional yield:

	yield(value) if block_given?

## Explicit blocks

Sometimes, the performance benefits of implicit block invocation are outweighed by the need to have the block accessible as a concrete object.

Explicit f(x), implicit block: 

	# We explicitly define that a block should be passed in via the &block parameter.
	def calculation(a, b, &block) # &block is an explicit (named) parameter
	 block.call(a, b)
	end

	puts calculation(5, 5) { |a, b| a + b } 

Implicit f(x), explicit block: 

	# Nothing is implied based on the function signature, but a block is def. required.
	def calculation(a, b)
	  yield(a, b) # yield calls an implicit (unnamed) block 
	end

	addition = lambda {|x, y| x + y}
	puts calculation(5, 5, &addition)

The block should be the last parameter passed to a method. Placing an ampersand (&) before the name of the last variable triggers the conversion.

	def filter(array, block)
	  return array.select {|x| block.call(x)}
	end

	# is the same as 

	Filter = lambda do |array, &block|
	 array.select(&block)
	end

#### Explanation of WTF blocks actually do:

If we try to implement blocks on our own as an `iterate` method, it would look like this:

	class Array
	  def iterate!
	    self.each_with_index do |n, i|
	      self[i] = yield(n)
	    end
	  end
	end

	array.iterate! do |n|
	  n ** 2
	end

blocks are of class `Proc`, but they do not have a name. If you want to name a block, you have to do this:

blocky = Proc.new {|x| x * 2}

This is useful when you have to have two functions as a callback or something. Can't use a block here.

	def callbacks(procs)
	  procs[:starting].call

	  puts "Still going"

	  procs[:finishing].call
	end

	callbacks(:starting => Proc.new { puts "Starting" },
	          :finishing => Proc.new { puts "Finishing" })

Block vs Proc.

1. Block if the method breaks an object down into smaller pieces and you want the users to interact with the pieces.
2. Block if you want to run multiple expressions atomically.
3. Proc if you want to reuse a block of code multiple times.
4. Proc if your method will have one or more callbacks.

`Lambda`s are almost the same as `Proc`s, except they are actually methods. Their differences are that `lamba` actively checks the number of arguments, and their `return`s are different.

	def args(code)
	  one, two = 1, 2
	  code.call(one, two)
	end

	args(Proc.new{|a, b, c| puts "Give me a #{a} and a #{b} and a #{c.class}"})

	args(lambda{|a, b, c| puts "Give me a #{a} and a #{b} and a #{c.class}"})

lambda will raise an ArgumentError here because it requires the third argument.

	def proc_return
	  Proc.new { return "Proc.new"}.call
	  return "proc_return method finished"
	end

	def lambda_return
	  lambda { return "lambda" }.call
	  return "lambda_return method finished"
	end

	puts proc_return		# => Proc.new
	puts lambda_return		# => lambda_return method finished

__`proc` is a code snippet__, copy and paste, so you actually exit immediately when you hit the `return` statement. `__Lambda` is an actual method__ that is executed, so it produces the "lambda" and carries on with the method.

Think of `lambda`s as a way of writing anonymous methods.

__`Proc.new` is something that’s hardly ever used to explicitly create blocks because of these surprising return semantics. It is recommended that you avoid using this form unless absolutely necessary.__

Method Objects
	
Passing methods into methods, you use the `method` cast (different from `:method` method.

	def square(n)
	  n ** 2
	end

	> aw = [1, 2, 3].each{method(:square)}
	> aw = [1, 4, 9]

API def of `method`: Looks up the named method as a receiver in obj, returning a Method object (or raising NameError). The Method object acts as a closure in obj’s object instance, so instance variables and the value of self remain available.

	class Demo
	  def initialize(n)
	    @iv = n
	  end
	  def hello()
	    "Hello, @iv = #{@iv}"
	  end
	end

	k = Demo.new(99)
	m = k.method(:hello)
	m.call   #=> "Hello, @iv = 99"

	l = Demo.new('Fred')
	m = l.method("hello")
	m.call   #=> "Hello, @iv = Fred"