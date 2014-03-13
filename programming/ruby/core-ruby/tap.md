# Ruby - `#tap` that!
[Link](http://blog.endpoint.com/2012/04/deconstructing-oo-blog-designs-in-ruby.html)

    class Object
      def tap
        yield self
        self
      end
    end

Tap allows you to do something with an object inside of a block, and always have that block return the object itself.

`#tap` was created for "tapping" into method chains.

> No tap

    def something
        result = operation
        do_something_with_result
        result
    end

> With tap

    def something
        operation.tap do |op|
            do_something_with op
        end
    end

We can use it for putting debugging calls, but there's so much more than that.
    
    arr.reverse
    arr.tap { |a| puts a}.reverse # After, has a debugger on it

#### Other uses

> Assigning a property to an object, especially if single attribute. Btw this is the same as `User.new(key: "value")`

    # Traditional
    object = SomeClass.new
    object.key = "value"
    object

    # Tapped
    object = SomeClass.new.tap do |obj| 
        obj.key = "value"
    end

    # Tapped shortcut
    object = SomeClass.new.tap { |obj| obj.key = "value" }

> Ignoring method return. Btw this is also the same as `Model.create!`

    # Traditional
    object = Model.new
    object.save!
    object

    # Tapped
    object = Model.new.tap do |model|
        model.save!
    end

    # Tapped shortcut
    object = Model.new.tap(&:save!)

> 
