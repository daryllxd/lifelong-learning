## [What's the difference between equal?, eql?, ===, and ==?](http://stackoverflow.com/questions/7156955/whats-the-difference-between-equal-eql-and)

	== 		-> generic "equality", if they are the same objet. Overriden.
	=== 	-> commonly overriden, check the === of Range, Regex, and Proc
	eql?	-> generic/alternative equality
	equal?	-> identity comparison. It's like a pointer comparison. Don't override.