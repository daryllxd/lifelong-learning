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
