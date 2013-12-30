## RubyMonk

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
