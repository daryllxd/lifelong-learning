## [What is the difference between include and require in Ruby?](http://stackoverflow.com/questions/318144/what-is-the-difference-between-include-and-require-in-ruby)

__Require: Copy and paste the file. A file thing. It doesn't let you require the same file twice. Use to import libraries.__

__Load: Use this to execute code.__

__Include: Takes all the methods from another module and includes them into the current module. A language thing. Use this to "extend classes" with other modules (mixins).__

__Extend: You're bringing in the module's methods as _class_ methods.__

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




