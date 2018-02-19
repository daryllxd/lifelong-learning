## Working with Strings in Elixir
[Reference](http://culttt.com/2016/03/21/working-strings-elixir/)

- Elixir does not have a dedicated String type. Strings are represented as Binaries or Character Lists.

``` elixir
IO.puts "Hello World"

# Interpolation
"Hello #{name}"

# Line Breaks
"Hello\nWorld"

# Sigil
~s(Hello World)

# Sigil for char lists
~c(Hello World`

# Heredocs

"""
Hello World
"""

# Char list Heredocs
'''
Hello World
'''
```

- Strings are binaries, so you can concatenate them using `<>`.
- `String` module so you can do things like `String.capitalize`, `String.match?`, `String.replace`.
- Single-quote strings = char lists. They are not interchangeable with double-quote strings. Erlang used character lists.
