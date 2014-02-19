Nil is an object.

    nil.to_s = ""
    nil.to_f = 0.0
    nil.to_i = 0

When a method doesn't exist you get the `NoMethodError` with the `undefined_method` message.

    nil.inspect == "nil"

Everything is an object with an id. An id is a Fixnum (not FixNum!).

`object.clone` means you create a new object _with a different id_!

All arrays have class `Array`. They have 0 size. `array[-1]` is the last element.

Classes are in capital letters!

Ranges/arrays: 2 .. means include, ... means not include. start and ending index, not length

Array push and shift - put in front.

Parallel assignment - same elems in array = equal array

Hashes: Empty hash has class <Hash>.

hashes are equal when all of their k,v are equal.

Merging: The mergee replaces the original thingie

Strings - hard cases do \

Flexible string delim: %{stuff can ' containr' """" as long as you are in delimeter} or %[```'''''""''\]]

Long flexible quotes: Start of delimeter carriage return is counted

Heredoc: Start Delimeter carriage return is not counted

<< alters the original string rather than creating a new one. The reason for this is that in ruby a += b is syntactic shorthand for a = a + b (the same goes for the other <op>= operators) which is an assignment. On the other hand << is an alias of concat() which alters the receiver in-place.

If symbols are identical then they are the same internal object

#### Why exactly do we have to convert that list into strings first?

This has to do with how symbols work. For each symbol, only one of it actually exists. Behind the scenes, a symbol is just a number referred to by a name (starting with a colon). Thus, when comparing the equality of two symbols, you're comparing object identity and not the content of the identifier that refers to this symbol.

If you were to do the simple test :test == "test", it will be false. So, if you were to gather all of the symbols defined thus far into an array, you would need to convert them to strings first before comparing them. You can't do this the opposite way (convert the string you want to compare into a symbol first) because doing that would create the single instance of that symbol and "pollute" your list with the symbol you're testing for existence.

Symbols are not strings, they are not equal when compared.

#### Why is it not a good idea to dynamically create a lot of symbols in ruby?

Symbols are like strings but they are immutable - they can't be modified.

They are only put into memory once, making them very efficient to use for things like keys in hashes but they stay in memory until the program exits. This makes them a memory hog if you misuse them.

If you dynamically create lots of symbols, you are allocating a lot of memory that can't be freed until your program ends. You should only dynamically create symbols (using string.to_sym) if you know you will:

need to repeatedly access the symbol
not need to modify them

## Regex

The result of the comparison is the match

\* (0 or more) will never fail to match

Even if you match for digits the thing that matches is a string

Negation classes: "Get the rest"

When regexing a string, don't include the effing ""s!!!!

## Methods

They raise NoMethodError when no method

## Constants

Can be accessed by C or ::C or AboutConstants::C.

OOP: Nested class wins over inheritance

## Exceptions

SpecificError -> StandardError -> Exception -> Object

Raising and rescuing an error: 
    
    raise MySpecialError, "MyMessage"
    rescue MySpecialError => ex
        result = :exception_handled
    end

    result = :exception_handled
    ex.message = "My Message"

## Iteration

- Use `break` to break lol
- Don't forget `select`
- Difference between `each` and `map`, and `map`/`collect` are the same thing
- Inject is fucking awesome
- Iteration methods such as `map` also work on ranges. But they become arrays after you do the method.

## Blocks
- `block_given?` to check if block exists.
- Blocks can affect variables in the code where they are created

### Calling the lambdas

    add_one = lambda { |n| n + 1}

    add_one.call(10) -> Execute with argument 10
    add_one[10]

## About sandwich code

The `count_lines` and `find_line` are similar, and yet different.
They both follow the pattern of "sandwich code".

Sandwich code is code that comes in three parts: (1) the top slice
of bread, (2) the meat, and (3) the bottom slice of bread.  The
the bread part of the sandwich almost always goes together, but
the meat part changes all the time.

Because the changing part of the sandwich code is in the middle,
abstracting the top and bottom bread slices to a library can be
difficult in many languages.

> Old
 
    def count_lines(file_name)
      file = open(file_name)
      count = 0
      while line = file.gets
        count += 1
      end
      count
    ensure
      file.close if file
    end

> New

    def file_sandwich(file_name)
      file = open(file_name)
      yield(file)
    ensure
      file.close if file
    end

    # Now we write:

    def count_lines2(file_name)
      file_sandwich(file_name) do |file|
        count = 0
        while line = file.gets
          count += 1
        end
        count
      end
    end

## About Classes

    fido.instance_variables # Get all SET na instance variables

`attr_accessor :name` makes the methods `name=` and `name` available.

`array`.to_s => Converts everything to the `to_s` value and creates an array of the kung ano man

## Modules

You can't instantiate modules.

Class methods override module methods.

## Scope
- If scope is not found, raise `NameError`.
- Constants begin with a capital letter. Doesn't matter what the other letters are, they will be constants.

## Class Methods
- Possible to define methods on classes: `def Dog2.wag end`
- Possible to call class method from the instance

## About Message Passing
`send` invokes the method identified by symbol, passing it any arguments specified. You can use __send__ if the name send clashes with an existing method in obj. When the method is identified by a string, the string is converted to a symbol.

`send` is used if you don't know in advance the name of the method, such as when you're doing metaprogramming. Or you can do it for calls to private methods (not recommended).

It is convenient when you want to route different methods on the same receiver and/or arguments. If you have some_object, and want to do different things on it depending on what foo is.

Sending with arguments

    class MessageCatcher
      def add_a_payload(*args)
        args
      end
    end

    mc.add_a_payload(3, 4, nil, 6)
    mc.send(:add_a_payload, 3, 4, nil, 6)

Method missing: Do this to avoid shit

    class AllMessageCatcher
      def method_missing(method_name, *args, &block)
        # this becomes the returned thing
        "Someone called #{method_name} with <#{args.join(", ")}>"
      end
    end

## Proxy Object Solution

    class Proxy
      attr_accessor :messages
      def initialize(target_object)
        @object = target_object
        @messages = []
      end

      def method_missing(method_name, *args, &block)
        @messages.push method_name
        @object.send(method_name, *args, &block)
      end

      def called?(method)
        @messages.include? method
      end

      def number_of_times_called(method)
        @messages.count{|obj| obj == method}
      end

    end

## `to_str` vs `to_s`

They have different meanings. You should not implement `to_str` unless your object acts like a string, rather than just having a string representation. The only core class that implements `to_str` is String itself.

`to_str` is an implicit cast, whereas `to_s` is an explicit cast. First, it implies that the object isn't really much of a string, so it's shorter. Also, `to_s` is shorter because more objects will have `to_s` methods, so you'll end up typing it more frequently. With `to_str`, we're tagging an object as much closer to being a string, so we give it the first three letters. It's almost half of a string!