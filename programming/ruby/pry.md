## [Rubyists, It’s Time to PRY Yourself Off IRB!](http://www.sitepoint.com/rubyists-time-pry-irb/)

Installation

	$ gem install pry pry-doc
	$ pry -v
	pry(main)>

Show documentation

	pry(main)> show-doc Array#map

Cd into an object
	
	pry(main)> cd arr
	pry(#<Array>)>
	pry(#<Array>)>ls #list all methods
	pry(#<Array>)>ls -h
	pry(#<Array>)>show-source map! #Show implementation of underlying code.

Able to see shit via the `binding.pry` method. But you have to define the editor first. So you can `edit` the method.

	pry(#<Order>) edit total

Stack trace: `wtf?` Longer stack trace: `wtf??`