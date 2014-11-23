## Eloquent Ruby

To learn a new programming language, you need to understand the basic rules of the grammar. A new line usually starts a new statements, a class definition starts with the word `class`, variable names start with a lowercase letter, unless they start with a `@`.

## Chapter 1: Write Code That Looks Like Ruby

Ruby ideas - the code should be crystal clear--good code tells the reader exactly what it is trying to do. Great code shouts its intent. *Since there is a limit to how much information you can keep in your head at any given moment, good code is not just clear, it is also concise. It's much easier to understand what a method of a class is doing if you can take it all in a glance.*

Avoid boilerplate comments: never put a comment simply because you always put a comment there.

Inline comment:

    return 0 if divisor == 0 # Avoid division by zero

Ruby programmers will usually end the name of a method that answers a yes/no or true/false question with a question mark.

## Chapter 2: Choose the Right Control Structure

    author = case title
            when 'War And Peace' then 'Tolstoy'
            when 'Romeo And Juliet' then  'Shakespeare'
            else "Don't know"
            end

Case can be used to match classes, regexes.

Ruby's boolean logic: Only false and nil are treated as false.

## Chapter 3: Take Advantage of Ruby's Smart Collections

Arbitrary arguments:

    def echo_all(*args)
      args.each  { |arg| puts arg }
    end

Collections are pervasive in Ruby because if you do things like `File.readlines`, you don't get back an instance of some specific line holding class, you get a simple array full of strings.

Collections over specialized classes because: they are powerful and there is no need to create a new class sometimes, and Ruby programmers would prefer to work with generic conditions.

## Chapter 4: Take Advantage of Ruby's Smart Strings

Since strings are mutable, get in the habit of writing this:

    first_name = first_name.upcase

Instead of this:

    first_name.upcase!

## Chapter 5: Finding the Right String with Regular Expressions

[TODO]: THIS

##  Chapter 6: Use Symbols to Stand for Something

Symbols are really just strings. They are reasonable interchangeable in real life code.

Strings hold some data that we are processing. Strings also represent things in our programs (it is easier to parse `:all` rather than `0` or `-1`.

*Strings are optimized for the data processing side of strings while symbols are meant to take over the "stands for" role.* Since we don't use symbols for data processing tasks, they lack most of the string manipulation methods.

Use strings for data, for things you might want to truncate, turn to uppercase, or concatenate. Use symbols when you simply want an intelligible things that stands for something in your code.

## Chapter 7: Treat Everything Like an Object--Because Everything Is

Classes act as containers for methods. They are also factories, factories for making instances.

Ruby treats self as a sort of default object. When you call a method without an explicit object reference, Ruby assumes that you meant to call the method on `self`.

This is why we have `-3.abs`, not `abs(-3)`, because we literally call the `abs` function on -3.

Private: *You cannot call a private method with an explicit object reference.* Private methods are callable from subclasses, because you don't need an explicit object reference to call a superclass method from a subclass.

You can still actually call `private` methods by using the `send` method (`doc.send(:word_count)` won't raise an exception, even if `word_count` is private.

Assigning a value to a local variable/if statements are not method calls, but a large part of Ruby is. Even `private` is just a method implemented inside the Ruby interpreter.

## Chapter 8: Embrace Dynamic Typing

When we call methods, we do not ask that the argument be of a particular class. *Ruby simply assumes that if an object has the right kind of methods, then it is the right kind of object. If you continue to write static type style base classes, your code will continue to be much bulkier than it might need to be.*

What not to do: Pseudo-static type checking, such as `kind_of? String`. *When you are coding, anything that reduces the number of revolving mental plates is a win. From this perspective ,a typing system that you can sum up in a short phrase, "The method is either there or it is not," has some definite appeal. if the problem is complexity, the solution might just be simplicity.*

The problem with duck typing: if we miss the memo saying that `Document` now expects `@title` to have a `long_name` method, we get `NoMethodError`. To avoid mixing your types, write the clearest, most concise code you can, which explains why Ruby programmers places such a high premium on clear and concise code.

So, how do you take advantage of dynamic typing? First, don't create more infrastructure than you really need. Keep in mind that Ruby classes don't need to be related by inheritance to share a common interface; they only need to support the same methods. *Don't obscure yoru code with pointless checks to see whether `this` really is an instance of `that`.*

## Chapter 9: Write Specs

Unless you want to spend all your waking hours running tests manually, you need a test framework, a framework that will let the computer exercise the code for you. *A key part of the Ruby style of programming is that no class, and certainly no program, is ever done if it lacks automated tests.*

Much of the code of a `Test::Unit` test is about the test and not about the code that you are testing. In a more perfect world, the test would focus on the behavior itself, so that the test would read something like this:

*About the Document class: When you have a document instance, it should hang onto the text that you give it. It should also return an array containing each word in the document when you call the words method. And it should return the number of words in the document when you call the word_count method.*

The code above isn't a test, it's a description. The description says that the `Document` class should hold on to the contents. We don't assert things; we say that they should happen. Thus, we don't assert that `word_count` returns 4, we say that `word_count` should equal 4.

Stubs - an object that implements the same interface as one of the supporting cast members, but returns canned answers when its methods are called. To use the `stub` method, you pass in a hash of method names (as symbols) and the corresponding values you want those methods to return. The `stub` method will give you back an object equipped with exactly those methods, methods that will return the appropriate values.

*Mocks - a mock is a stub with an attitude. Along with knowing what canned responses to return, a mock also knows which methods should be called and with what arguments.* Critically, a disappointed mock will fail the tests.

#### RubySpec: If Method Check

    describe "The if expression" do
      it "evaluates body if expression is true" do
        a = []
        if true
          a << 123
        end
        a.should == [123]
      end

      it "does not evaluate body if expression is false" do
        a = []
        if false
          a << 123
        end
        a.should == []
      end
      # Lots and lots of stuff omitted
    end

#### RubySpec: Array.each Method Check

    describe "Array#each" do
      it "yields each element to the block" do
        a = []
          x = [1, 2, 3]
          x.each { |item| a << item }.should equal(x)
          a.should == [1, 2, 3]
      end
        # Lots of stuff omitted
    end

Ideally, the tests for your whole system should run in at most a few minutes. Longer running tests are fine, but unit tests should run quick with the setup that every developer has. They are your first line of defense, and in order to be any good they must be run often.

Tests also need to be independent of one another. You want to carefully avoid having one test rely on the output of a previous tests. Don't create a file in one test and expect it to be there in another.

Sometimes, even stuff like this works:

    Document.new('title', 'author', 'stuff').should_not == nil

This guarantees:

- Document is a class.
- It is found in the `document.rb` file.
- The `document.rb` file doesn't really contain any really egregious Ruby syntax errors.
- `Document.new` will take three arguments.
- `Document.new` actually returns something and it doesn't throw an exception.
