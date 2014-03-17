## [The Difference Between Ruby Symbols and Strings](http://www.robertsosinski.com/2009/01/11/the-difference-between-ruby-symbols-and-strings/)

__Symbols are Strings, just with an important difference, Symbols are immutable.__ Mutable objects can be changed after assignment while immutable objects can only be overwritten. Ruby is quite unique in offering mutable Strings, which adds greatly to its expressiveness. However mutable Strings can have their share of issues in terms of creating unexpected results and reduced performance. It is for this reason Ruby also offers programmers the choice of Symbols.

Symbols are as flexible as Strings in expressing data. You can interpolate symbols.

	"hello world#{bang}" # => "hello world!"
	:"hello world#{bang}" # => :"hello world!"

Conversion between Strings to Symbols and back:

	:"hello world".to_s # => "hello world"
	"hello world".intern # => :"hello world"

Symbols cannot change.

	puts "hello" << " world"	# => hello world
	puts :hello << :" world"	# => *.rb:4: undefined method `<<' for :hello:Symbol (NoMethodError)

#### Mutability: You can introduce bugs with Strings.

	status = "peace"

	buggy_logger = status

	print "Status: "
	print buggy_logger << "\n" # <- This insertion is the bug.

	def launch_nukes?(status)
	  unless status == 'peace'
	    return true
	  else
	    return false
	  end 
	end

	print "Nukes Launched: #{launch_nukes?(status)}\n"

	# => Status: peace
	# => Nukes Launched: true

The `<<` statement allows a nuke to be launched because the String has been edited.

__Frozen Strings:__ You can use this to make a String un-editable.

	> aw = "hello"
	> aw.freeze
	> aw.upcase! # can't modify frozen string (TypeError)

#### Performance

Because Strings are mutable, the Ruby interpreter never knows what that String may hold in terms of data. As such, every String needs to have its own place in memory.

	puts "hello world".object_id 		# => 3102960
	puts "hello world".object_id 		# => 3098410

	puts :"hello world".object_id		# => 239518
	puts :"hello world".object_id		# => 239518

Ruby does not mark Symbols for destruction, they are actually kep track off in an optimized dictionary. (Check it out via `Symbol.all_symbols.inspect`). Ruby creates and keeps track of the Symbols for the dict.

	>> Symbol.all_symbols.collect{|sym| sym.to_s}.include?("new_symbol")
	=> false
	>> :new_symbol
	=> :new_symbol
	>> Symbol.all_symbols.collect{|sym| sym.to_s}.include?("new_symbol")
	=> true

Symbols are also faster than Strings!

	require 'benchmark'

	str = Benchmark.measure do
	  10_000_000.times do
	    "test"
	  end
	end.total

	sym = Benchmark.measure do
	  10_000_000.times do
	    :test
	  end
	end.total

	puts "String: " + str.to_s
	puts "Symbol: " + sym.to_s
	puts

	$ ruby benchmark.rb
	String: 2.24
	Symbol: 1.32

On average, we get a 40% increase solely by using Symbols. Symbols are also faster than Strings in how they are compareed, because of the sharing same space on the heap thing.




























