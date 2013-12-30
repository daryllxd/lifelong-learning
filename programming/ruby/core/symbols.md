## [The Difference Between Ruby Symbols and Strings](http://www.robertsosinski.com/2009/01/11/the-difference-between-ruby-symbols-and-strings/)

__ Symbols are Strings, just with an important difference, Symbols are immutable.__ Mutable objects can be changed after assignment while immutable objects can only be overwritten. Ruby is quite unique in offering mutable Strings, which adds greatly to its expressiveness. However mutable Strings can have their share of issues in terms of creating unexpected results and reduced performance. It is for this reason Ruby also offers programmers the choice of Symbols.

Symbols are as flexible as Strings in expressing data. You can interpolate symbols.

	"hello world#{bang}" # => "hello world!"
	:"hello world#{bang}" # => :"hello world!"

Conversion between Strings to Symbols and back:

	:"hello world".to_s # => "hello world"
	"hello world".intern # => :"hello world"

Symbols cannot change.

	puts "hello" << " world"	# => hello world
	puts :hello << :" world"	# => *.rb:4: undefined method `<<' for :hello:Symbol (NoMethodError)

Mutability: You can introduce bugs with Strings.

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














