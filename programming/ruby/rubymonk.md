## Stuff I used

	1.methods.sort
	2.between? 1, 3
	1+3 # this is the same as 1.+(3)
	words[1] # this is the same as words.[](1)

## Strings

	String inclusion: .include?
	"Ruby is a beautiful language".starts_with? "Ruby"
	"I can't work with any other language but Ruby".ends_with? "Ruby"
	"I am a Rubyist".index "R"
	'Fear is the path to the dark side'.split # Default argument is space
	"Ruby" << "Monk" # Memory utilization save
	"I should look into your problem when I get time".sub('I','We') # Just the first.
	"I should look into your problem when I get time".gsub('I','We') # Global scope so separate all.
	'RubyMonk Is Pretty Brilliant'.gsub /[A-Z]/, '0' # replace capitals with number 0, using RegEx.
	'RubyMonk Is Pretty Brilliant'.match(/ ./, 10) # RegEx matching, but starts at index 10.

## Expressions

	Truth: Everything except nil and false