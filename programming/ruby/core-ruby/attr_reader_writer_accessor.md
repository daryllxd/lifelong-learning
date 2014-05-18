# What is `attr_accessor` in Ruby?
[link](http://stackoverflow.com/questions/4370960/what-is-attr-accessor-in-ruby)

    class Person
      def greet
        @name
      end
    end

`attr_reader` means you can get the `name` variable inside. Right now we cannot do `person = Person.new; person.name` since there is no access. But with the reader,

    class Person
      attr_reader :name

      def greet
        @name
      end
    end

We can do `person.name` (no errors), but we cannot edit what is inside the `name` since it doesn't have the `attr_writer` yet. So we do this:

    class Person
      attr_writer :name

      def greet
        @name
      end
    end

Now we can set `person.name = "yolo"` and have `person.greet` return "yolo". However we cannot do `person.name` since we don't have the `attr_reader`. To be able to do things, you should include both:

    attr_writer :name
    attr_reader :name

Or you could just do:

    attr_accessor :name

Why? Ruby, like Smalltalk, does not allow instance variables to be accessed outside of methods for that object (by default). Instance variables cannot be accessed in the `x.y` form, in Ruby `y` is always taken as a message to send. Thus the `attr_*` methods create wrappers which proxy the instance `@variable access through dynamically created methods.`

`attr_accessor` is just a method, what it does is create more methods for you. These are equivalent:

    class Foo
      attr_accessor :bar
    end

    class Foo
      def bar
        @bar
      end

      def bar=(new_value)
        @bar = new_value
      end
    end

