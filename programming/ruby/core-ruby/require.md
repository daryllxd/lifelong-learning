## [What is the difference between include and require in Ruby?](http://stackoverflow.com/questions/318144/what-is-the-difference-between-include-and-require-in-ruby)

*Require: Copy and paste the file. A file thing. It doesn't let you require the same file twice. Use to import libraries.*

*Load: Use this to execute code.*

*Include: Takes all the methods from another module and includes them into the current module. A language thing. Use this to "extend classes" with other modules (mixins).*

*Extend: You're bringing in the module's methods as _class_ methods.*

	module A
	   def say
	     puts "this is module A"
	   end
	 end

	class B
	   include A
	end

	class C
	   extend A
	end

	B.say => undefined method 'say' for B:Class
	B.new.say => this is module A
	C.say => this is module A
	C.new.say => undefined method 'say' for C:Class




