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

## Part II: Classes, Modules, and Blocks

#### Construct Your Classes From Short, Focused Methods

Despite shelves full of books on software architecture, enough UML diagrams to fill an art museum, and design meetings that seem to last longer than the pyramids, building software mostly comes down to writing one method after another.

Mission: Take in a text string, produce two arrays. First array: All of the words in the original text. Second array: Integer indices, one index in the second array for each word in the original document.

    Input: This specification is the specification for a specification
    Array 1: ["This", "specification", "is", "the", "for", "a"]
    Array 2: [0, 1, 2, 3, 1, 4, 5, 1]

    class TextCompressor
      attr_reader :unique, :index

      def initialize( text )
        @unique = []
        @index = []
        add_text( text )
      end

      def add_text( text )
        words = text.split
        words.each { |word| add_word( word ) }
      end

      def add_word( word )
        i = unique_index_of( word ) || add_unique_word( word )
        @index << i
      end

      def unique_index_of( word )
        @unique.index(word)
      end

      def add_unique_word( word )
        @unique << word
        unique.size - 1
      end
    end

#### Composing Methods for Humans

What we have just done to the `TextCompressor` is to apply the *composed method* technique to it. This advocates dividing your class into methods that have three characteristics.

- Each method should do a single thing--focus on solving a single aspect of the problem.
- Each method needs to operate at a single conceptual level--don't mix high level logic with the nitty-gritty details. *A method that implements the business logic around currency conversions should not suddenyl veer off into the details of how the various accounts are stored in a database.*
- Finally, each method needs to have a name that reflects its purpose. Done right, the method names guide you through the logic of the code.

Conceptually, some methods deal with the messy details of array indexes, while other methods operate at a higher conceptual level. Each of the methods also have a carefully chosen name, a name that tells the reader exactly what the method does.

Bad:

    def prose_rating
        if pretentious_density > 0.3
          if informal_density < 0.2
            return :really_pretentious
          else
            return :somewhat_pretentious
          end
        elsif pretentious_density < 0.1
          if informal_density > 0.3
            return :really_informal
    end
          return :somewhat_informal
        else
          return :about_right
        end
    end

Good: Composed methods.

    def prose_rating
      return :really_pretentious if really_pretentious?
      return :somewhat_pretentious if somewhat_pretentious?
      return :really_informal if really_informal?
      return :somewhat_informal if  somewhat_informal?
      return :about_right
    end

    def really_pretentious?
      pretentious_density > 0.3 && informal_density < 0.2
    end

    def somewhat_pretentious?
      pretentious_density > 0.3 && informal_density >= 0.2
    end

#### Example: ActiveRecord::Base#find

    def find(*args)
      options = args.extract_options!
      validate_find_options(options)
      set_readonly_option!(options)
      case args.first
        when :first then find_initial(options)
        when :last  then find_last(options)
        when :all   then find_every(options)
        else             find_from_ids(args, options)
      end
    end

## Chapter 11: Define Operators Respectfully

One of the nice things about Ruby is that the language keeps very few secrets from its programmers. You can create your own `Float` class.

    sum = first + second
    sum = first.+(second)

    result = first + second * (third - fourth)
    result = first.+second.*(third.-(fourth))

`<<` is popular because it has taken a second meaning as the concatenation, or "add another one" operator.

Ruby programmers can also define a methods that will make their objects look like arrays or hashes: `[]` and `[]=`. Although technically these bracketed methods are not operators, the Ruby parser sprinkles some very operator-like syntactic sugar on them: When you say `foo[4]`, you are really calling the `[]` method on `foo`, passing in 4 as an argument.

If you are writing a collection class, it's an easy decision to add an `<<` operator. In the same vein, if your class has some natural indexing tendencies, then defining `[]` and `[]=` may not be a bad idea.

You can also do something like this:

    department = employee_1 + employee_2

You can invent your own operator-based object calculus, with a hierarchy of increasingly complex organizational types and a rich set of operators

You can do `Time.now + 50` but not `50 + Time.now`.

## Chapter 12: Create Classes That Understand Equality

- `equal?`: Tests for object identity.
- `==`: This will only return true if the objects being compared are identically the same object. Unlike `equal?`, you are free to implement any kind of "same value comparison."

    def ==(other)
      return false unless other.instance_of?(self.class) # makes sure also DocumentIdentifier
      folder == other.folder && name == other.name       # qualifies to make sure same folder and same name
    end

If we would rather not have class checks, we can do:

    def ==(other)
      return false unless other.respond_to?(:folder) # check if receptive to method .folder
      return false unless other.respond_to?(:name)
      folder == other.folder && name == other.name
    end

When subclassing, you can do things like this:

    def ==(other)
        if other.instance_of? VersionedIdentifier        # if subclassed, check version
          other.folder == folder &&
          other.name == name &&
          other.version == version
        elsif other.instance_of? DocumentIdentifier
          other.folder == folder && other.name == name   # if not, folder and name is enough
        else
          false
        end
      end
    end

But better to do things like this:

    def as_document_identifier
      DocumentIdentifier.new(folder, name)
    end

- `===`.

This is whatever the author of the class wants it to mean. The main usage for the `===` operator is in `case` expressions, since

    case foo
    when bar
      baz
    when quux
      flurb
    else
      blarf
    end

Gets translated to

    _temp = foo

    if bar === _temp
      baz
    elsif quux === _temp
      flurb
    else
      blarf
    end

- `eql?`: This is not actually called directly, until you try to use your object as a key in a hash. You cannot fetch IDs set inside a hash even if it has been set before with the same objects. This is because of the way hash tables are used, and the hash codes differ from each other.

    1 == 1.0, according to Ruby (it converts the Fixnum to a flow before doing the comparison)

#### Comparable

    `<=>` operator: Comparable will add a <, <=, >=, and > in the class, all of which rely on the <=> method to come up with the right answer.

Ruby classes treat `===` as an alias for `kind_of?`.

## Chapter 13: Get the Behavior You Need with Singleton and Class Methods

A singleton method is a method that is defined for exactly one object instance. "No other Spec::Mocks::Mock instance has an `available?` method, but I'm special."

    hand_built_stub_printer = Object.new

    class << hand_built_stub_printer
      def available?                    # Singleton method
        true
      end
    end

A singleton class sits between every object and its regular class. This starts out a methodless shell, but you can add something to it.

*Class methods are singleton methods.*

## Chapter 14: Use Class Instance Variables

Class variables:

    @@default_paper_size = :a4

    def self.default_paper_size
      @@default_paper_size
    end

*If the class variable is not defined in the current class, Ruby will look up the inheritance tree for it, FIRST.*

## Chapter 15: Use Modules as Name Spaces

Modules can also hold constants, so we can do this:

    module Rendering
      DEFAULT_FONT = Font.new('default')
    end

    Rendering::DEFAULT_FONT

You can also use modules to enclose individual methods.

    module WordProcessor
      def self.points_to_inches(points)
        ...
      end
    end

You can separate modules (declare some parts of the modules in different files).

You can take advantage of the objectness of modules to swap out whole groups of related classes and constants at runtime. We can do this:

    module TonsOfToner
      class PrintQueue
      end

      class Administration
      end
    end

    class OceansOfInk
      class PrintQueue
      end

      class Administration
      end
    end

We can do stuff like:

    print_module = TonsOfToner or print_module = OceansOfInk

If you find yourself creating a lot of names that all start with the same word, you may need that kind of a module. If you want to enclose stand-alone utility methods in a module, make sure that you define those methods as module-level methods.

    module WordProcessor
      def self.points_to_inches # Do this, not def points_to_index, because the second case needs to be mixed in to be used.
      end
    end

## Chapter 16: Use Modules as Mixins

You can insert, or "mix in", modules into the inheritance tree of your classes. Ex: If you need a method to be used in different classes, you can `include` it in. If you need to mix in for the class, you can `extend` the class.

    class Document
      class << self
        include Finders
      end
    end

When you include a module in a class, Ruby rewires the class hierarchy a bit, inserting the module as a sort of pseudo superclass of the class.

If you find yourself writing your own mixin module, ask yourself: *What is the interface between my module and its including class?* Since mixing in a module sets up an inheritance relationship between the including class and the module, you need to let your users know what that relationship is going to be before they start mixing.

In the wild: `DataMapper` is like ActiveRecord, but it doesn't require inheriting from class, it is done with a module. By including one module (`DataMapper::Resource`), your class gains all the equipment it needs to persist itself in a database.

## Chapter 17: Use Blocks to Iterate

When you tack a block onto the end of a method call, Ruby will package up the block as sort of a secret argument and (behind the scenes) pass this secret argument to the method.
