## Smalltalk Best Practice Patterns

### Chapter 1. Introduction

- Biggest improvements come from removing:
  - Duplicate code, even little bits of it.
  - Conditional logic.
  - Complex methods.
  - Structural code (where one object treats another as a data structure).
- Criteria re: patterns.
  - Productivity gains. Written so developers of all skill levels could learn more quickly.
  - Life cycle cost. They an be taught to developers and maintainers.
  - Time to market. This lets you program flat out, applying patterns as fast as your fingers can go, and get results as quickly as possible.
  - Risk.
- Style.
  - "Everything is said once and only once." If I see several methods with the same logic, I know this rule isn't satisfied.
  - Lots of little pieces. Only by factoring the system into many small pieces of state and function can you hope to satisfy the "once and only once" rule.
  - Replacing objects. Easily replaceable objects. **In a really good system, every time the user says "I want to do this radically different thing", the developer says, "Oh, I'll have to make a new kind of X and plug it in."**
  - Moving objects. Their objects can be easily moved to new contexts.
  - Rates of change. Don't have part of a method that changes in every subclass with parts that don't change. Don't have some instance variables whose values change every second in the same object with instance variables whose values changes once a month. Use little pieces.

### Chapter 2. Patterns

- Patterns form a more flexible basis for producing systematic variations on the common themes of software engineering.
- Why Patterns Work: There are only so many things objects can do, not in the sense that there are a limited number of applications, because there will always be new domains to model, but in the sense that the same structures of objects keep appearing over and over, regardless of the application.
- The hardest part in software engineering is human communication. This is when maintainers have to wade through piles of documentation to discover the intent of the original programmer.
  - Oral tradition is hard to scale. Better to have shared languages
- When an organization has the same experiences re: the patterns they use, a simple word or phrase takes on a big meaning.

### Chapter 3. Behavior

- Methods: They are how work gets done, and they are how you communicate to readers how you intended for work to get done.

***Composed Method***

- The opportunity to communicate through intention revealing message names is the most compelling reason to keep methods small.
- With small methods, if you decide to specialize the behavior of a class written with large methods, you will find yourself copying code from the superclass into the subclass and changing a few lines.

``` ruby (Source: https://github.com/avdi/sbpprb/blob/master/01_composing_method.rb)
class Controller
  def control_activity
    control_initialize
    control_loop
    control_terminate
  end
end
```

***Constructor Method***

- "What does it take to create an instance?" "What does it take to create a valid instance?"
- Almost never does this result in a proliferation of instance creation methods.
- Most classes only have a single way to create an instance anyway. Some have two?

``` ruby (Source: https://github.com/avdi/sbpprb/blob/master/02_constructor_method.rb)
class Point
  attr_accessor :x, :y

  # Called as Point.new_polar(radius, theta)
  #
  # Ruby doesn't really have the syntax for:
  #
  #   Point r: a theta: b
  #
  def self.new_polar(radius, theta)
    allocate.tap do |p|
      p.x = radius * Math.cos(theta)
      p.y = radius * Math.sin(theta)
    end
  end
end

# From dbrock:
# Except you could actually do this:

def Point(options)
  Point.new_polar(options[:r], options[:theta])
end
```

***Constructor Parameter Method***

- Code a single method that sets all the variables, preface its name with "set", then the names of the variables.

``` ruby (https://github.com/avdi/sbpprb/blob/master/03_constructor_parameter_method.rb)
# First example:
class Point
  attr_accessor :x, :y

  def initialize(x, y)
    self.x = x
    self.y = y
  end
end

# Second example
class Point
  attr_accessor :x, :y

  def initialize(x, y)
    set(x: x, y: y)
  end

  def set(options={})
    @x = options[:x]
    @y = options[:y]
    self
  end
end
```

***Shortcut Constructor Method***

- Represent object creation as a message to one of the arguments to the method.

``` ruby (https://github.com/avdi/sbpprb/blob/master/04_shortcut_constructor_method.rb)

# 2.days.ago

class Point
  attr_accessor :x, :y
end

class Integer
  def by(y)
    Point.new.tap do |p|
      p.x = self
      p.y = y
    end
  end
end
```

***Converter Method***

- When you define methods on objects to convert them from one format to the other.
- Ruby has this like with strings to arrays, to sets, integers to floats.
- Problem is, there's a limit to the number of methods that can be added.

``` ruby (https://github.com/avdi/sbpprb/blob/master/06_converter_method.rb)
# Idiomatic Ruby uses "to_" instead of "as"

require 'set'
[1,2,1,3].to_set                # => #<Set: {1, 2, 3}>
23.to_f                         # => 23.0
```

***Converter Constructor Method***

- This is a method that indicates that "hey you can convert this, by sending `asDate` to the `String`".
- Smalltalk implementation is `as_`. Ruby is `from_`.

``` ruby (https://github.com/avdi/sbpprb/blob/master/07_converter_constructor_method.rb)

# Staying close to the example we get something like this:
class Date
  def self.from_string(string)
    # ...
  end
end

# But the built-in Date.parse() is basically the same thing:

require 'date'
Date.parse('2011-09-22')

# There is another Ruby idiom which may also qualify as embodying this
# pattern:

require 'pathname'
String(23)         # => "23"
Array(23)          # => [23]
Pathname(__FILE__) # => #<Pathname:->
```

***Query Method***

- Instead of creating a `status` method, just create a predicate method (`isOn` or `isOff`).

``` ruby (https://github.com/avdi/sbpprb/blob/master/08_query_method.rb)

# Ruby has a syntactical edge on this one: there is a clear and
# well-known idiom for naming predicate methods.

class Switch
  def on?
    # ...
  end
end

```

***Comparing Method***

- You want to have the option of implementing comparison methods yourself. You might have more complex comparison methods.
- This is Comparable in Ruby.

``` ruby
class Event
  include Comparable
  def <=>(other)
    timestamp <=> other.timestamp
  end
end
```

***Reversing Method***

- Better to make code that looks more consistent. In the example where they are printing stuff on the screen, the methods calls don't look the same.

``` ruby (https://github.com/avdi/sbpprb/blob/master/10_reversing_method.rb)

class Point
  def print_on(stream)
    stream.print x
    stream.next_put_all ' @ '
    stream.print y
  end
end

vs

# Creating an object to make sure the interfaces look the same

module ObjectPrinter
  def print_obj(object)
    object.print_on(self)
  end
end

class Point
  def print_on(io)
    io.print x
    io.print ' @ '
    io.print y
  end
end
```

***Method Object***

- Many lines of code share many arguments and temporary variables.
- I've passed through this before--if you attempt to do Composed Method, you'll usually pass all the other temp vars into the new methods.
- Solution: create an object to represent calling the method and use the shared namespace of instance vars in the new object to then do Composed Method.

``` ruby (https://refactoring.guru/replace-method-with-method-object)

# Before

class Order
  def price
    primary_base_price, secondary_base_price, tertiary_base_price...
    # computation
  end
end

# After

class Order
  def price
    PriceCalculator.new(self).compute
  end
end

class PriceCalculator
  def initialize(order)
    ...
  end

  def compute
    primary_base_price, secondary_base_price, tertiary_base_price...
    # computation
  end
end
```

- We moved the original computations into a new object, and passed the original object so it still has the same context.
- You can do this with a static method, but in this case you don't need the first field pointing back. [Reference](https://refactoring.com/catalog/replaceMethodWithMethodObject.html)

***Execute Around Method***

- Pairs of actions that have to be taken together. Ex: ensuring that a file gets closed after opening it.
- In Ruby, this is usually a block, or you can use `ensure`.

``` ruby (https://github.com/avdi/sbpprb/blob/master/12_execute_around_method.rb)
# Cursor example:
class Cursor
  def show_while
    old = Cursor.current_cursor
    show
    yield
    old.show
  end
end

# With ensure:
class Cursor
  def show_while
    old = Cursor.current_cursor
    show
    yield
  ensure
    old.show
  end
end
```

***Debug Printing Method***

- Strings are useful in generic programming tools.
- `VisualWorks`:  2 methods, `displayString` for client-consumable strings and `printString` for programmer-consumable strings.

``` ruby (https://github.com/avdi/sbpprb/blob/master/13_debug_printing_method.rb)
class Association
  attr_accessor :key, :value

  def inspect
    "#{key}->#{value}"
  end
end
```

***Method Comment***

- Self-documenting code?
- Something you can comment on about a method: how it handles the cases it is coded for.
- Important cases becomes objects in their own right.
- Method dependencies: A comment can warn the reader to invoke one method before the other, or use Composed Method or Execute Around Method to specify the orders you want.
- To-do: Just putting a note for yourself later.
- Reasons for change: If you need to change something, if the reason for the change is not obvious, put it there.

***Choosing Message***

- Limited resources: when you had the same code duplicated in many places, you could save space by using a single copy of the code and invoking it everywhere you needed.
- Conditionals: "Execute this part of the routine or that part". Message: "Execute this routine over here or that over there, I don't really care."
- Send a named message and let the receiving object decide what to do with it.
- `to_s`: each object has an opportunity to change how it is represented to the programmer as a string.
- `Collection#includes`: Different collections implement this very differently, depending on the data structure.

***Intention Revealing Message***

``` ruby (https://github.com/avdi/sbpprb/blob/master/18_intention_revealing_message.rb)
class ParagraphEditor
  def highlight(rectangle)
    reverse(rectangle)
  end
end
```

- This just shows the user that you highlight the rectangle by reversing it. You can also use `alias`.
- It's also easier to override via inheritance. This is really for the readers, not for the computer.
