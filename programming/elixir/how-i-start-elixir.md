# Elixir with Jose Valim
[link](http://howistart.org/posts/elixir/1)

    portal = Portal.transfer(:orange, :blue, [1, 2, 3, 4])
    Portal.push_right(portal)

    $ iex # Interactive shell
    iex> "hello" <> "world"
    iex> # Comment
    iex> :atom # Identifier/symbol
    iex> [1, 2, "three"] # Lists, hold a dynamic amount of items
    iex> {:ok, "value"} # Tuples, load a fixed amount of items

Mix = used by developers use to create, compile, and test new projects.

    $ mix new portal --sup # Creates a new directory named portal with some files in it.
    $ cd portal
    $ mix test

Directories:

- `_build`: where Mix stores compilation artifacts.
- `config`: where we configure our project and its dependencies.
- `lib`: where we put our code.
- `mix.exs`: where we define our project name, version, and dependencies.
- `tests`: where we define our tests.

    $ iex -S mix # Starts an iex session inside the project.

## Pattern Matching

    iex> x = 1 #=> x = 1
    iex> 1 = x #=> 1 #  Elixir tries to match the right side against the left side.
    iex> 2 = x #=> (MatchError) no match of right hand side value: 1
    iex> [head|tail] = [1, 2, 3]
    iex> head  #=> 1
    iex> tail  #=> [2, 3]

