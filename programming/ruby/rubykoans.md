Nil is an object.

    nil.to_s = ""
    nil.to_f = 0.0
    nil.to_i = 0

When a method doesn't exist you get teh `NoMethodError` with the `undefined_method` message.

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