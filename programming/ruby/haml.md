## Using Haml

CLI: `haml input.haml output.html`

Ruby eval:

	%p= "hello"
	= link_to_remote "Add to cart",
		:url => {:action => "add", :id => product.id},
		:update => {:success => "cart", :failure => "error"}

Run Ruby no insert, automatically closed.

	- foo = "hello"
	- (42...47).each do |i|
		%p= i
	%p
		- case 2
		- when 1
			= "1!"
		- when 2
			= "2!"

Whitespace: it just happens

Ruby interpolation: No need to do

	%p This is ${h quality} cake!

JavaScript

	:javascript
		$(document).ready{}...

Filters

	%p
		:markdown (:css, :javascript, :sass... implemented via tilt)
			# Greetings
			Hello, *world*