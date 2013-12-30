## [Making sense with Ruby's "unless"](http://37signals.com/svn/posts/2699-making-sense-with-rubys-unless) and [Unless, The Abused Ruby Conditional](http://www.railstips.org/blog/archives/2008/12/01/unless-the-abused-ruby-conditional/) and [If and Else](http://ruby.bastardsbook.com/chapters/ifelse/)

The words `true` and `false` have special meaning in programming languages. In Ruby, they have the datatypes of `TrueClass` and `FalseClass`, respectively.

These two values – true and false – are not Strings. 

		true == "true" 		# false
		false == "false"	# false

Everything except `false` and `nil` evaluates as `true` by an `if` statement.

#### Variations on `if`

Use `if = ` if the right side either returns something or `nothing at all`. 

	# remember that puts returns nil, so this code block will not execute.
	if x = (puts 'hello world') 
	   puts "Successful assignment. x is now #{x}"
	end





#### Using `unless`

Don't use `unless` with more than a single logical condition.

Avoid negation (`unless !thingie`) because `unless` is already a negate.

Never ever use an `else` with an `unless` statement.

`unless` actually reads better than if ! when used as a statement modifier. 

	raise InvalidFormat unless AllowedFormats.include?(format) # instead of
	raise InvalidFormat if !AllowedFormats.include?(format)

testing `nil?` is bad.

	if foo ... # instead of
	unless foo.nil? ...

