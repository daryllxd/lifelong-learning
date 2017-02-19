## Programming Elixir

#### Immutability

- Programming -- imagine that some other code, possibly running in parallel with your own, could change the value of a variable. You would never be able to guarantee your code produced the correct results.

    array = [ 1, 2, 3 ]
    do_something_with(array)
    print(array)

- The `array` value might change in the middle (in most languages, `do_something_with` will receive the array as a reference). If we have multiple arrays, all accessing the array, who knows what state the array will be in if they all start changing it?
- "GOTO was evil because we asked, 'how did I get to this point of execution?' Mutability leaves us with, 'how did I get to this state?'"
- *In Elixir, all values are immutable. The most complex nested list, the database record--these things behave just like the simplest integer. Their values are all immutable.*

###### Performance Implications of Immutability

- *Copying data.* Because Elixir knows that existing data is immutable, it can reuse it, in part or as a whole, when building new structures.
- *Garbage collection.* Problem with transformational language is that you quite often end up leaving old values unused when you create new values from them. This leaves a bunch of things using up memory on the heap, so garbage collection has to reclaim them. *In Elixir, each process has its own heap.*
- We never capitalize a string. We return a capitalized copy of a string. `String.capitalize(name)`. This is different from `name.capitalize()` since we are indicating that we are NOT changing the internal representation of the name, and that we are transforming it.
- [http://web.mit.edu/6.005/www/fa15/classes/09-immutability/](Risky examples) - If you pass mutable values around, if you reuse the mutated value at some point for other purposes (like reuse or performance), you will get a bug. Simplest solution: Always return a copy of the thing, not the thing itself.

#### Elixir Basics

Value types

- *Integers.* May contain underscores (`1_000_000`). No fixed limit on the sizes of integers.
- *Floats.* At least 1 digit before and after the decimal point.
- *Atoms.* Like symbols in Ruby? `:hello`, `:is_binary?`. Two atoms with the same name will compare as being equal.
- *Ranges.*
- *Regular expressions.*

System types

- *PIDs and Ports.*
- References. The function `make_ref` creates a globally unique reference, no other reference will be equal to it.

Collection types

- *Tuples.* A tuple is an ordered collection of values. Once created, a tuple cannot be modified. `{ status, count, action } = {:ok, 42, "next" }`.
- It is common for functions to return a tuple where the first element is the atom `:ok` if there were no errors.

      { status, file } = File.open("Rakefile") -> { :ok, #PID<0.39.0>}

- *Lists.* A list is a linked data structure. Head/tail, the tail is a list also. Lists are easy to traverse linearly, but are expensive to access in random order. Lists are also immutable, so if we want to remove the tail, we can just return a pointer to the tail.

      iex> [1, 2, 3] ++ [4, 5, 6] # [1, 2, 3, 4, 5, 6]
      iex> [1, 2, 3, 4] -- [2, 4] # [1, 3]
      iex> 1 in [1, 2, 3, 4]      # true
      iex> "hehe" in [1, 2, 3, 4] # false

- *Keyword lists.*

      iex> [name: "Dave", city: "Dallas", likes: "Programming"]
      iex> [{:name, "Dave"}, {:city, "Dallas"}, {:likes, "Programming"}]

- *Maps.*

      iex> %{ key => value, key => value}
      iex> %{ "AL" => "Alabama", "WI" => "Wisconsin"}
      iex> %{ {:error, :enoent} => :fatal, {:error, :busy} => :retry}
      iex> %{ :red => 0xff000 }
      states = %{ "AL" => "Alabama" } => states["AL"]

- *Binaries.*

      bin = << 1, 2 >>

- *Truth.* `true`, `false`, and `nil`. `:true` == `true`.

###### Variable Scope

- `with`: Allows you to define a local scope for variables, and it gives you some control over pattern matching failures.

    with [a|_] <- [1,2,3], do: a

    with count = Enum.count(values),
           sum = Enum.sum(values)
      do
          sum/count
     end

#### Anonymous Functions

    sum = fn (a, b) -> a + b end
    sum.(1, 2)

We don't use a dot for named function calls.

    greet= fn -> IO.puts "Hello" end
    greet.()

    list_concat = fn (a, b) -> a ++ b end #=> list_concat([:a, :b], [:c, :d]) -> [:a, :b, :c, :d]
    sum = fn ( arr) ->
    pair_tuple_to_list = fn (a, b) -> [a, b] end #=> pair_tuple_to_list({:a, :b}) -> [:a, :b]

You can use pattern matching to select which clause to run.

    handle_open = fn
      {:ok, file}  -> "Read data: #{IO.reae(file, :line)}"
      {_, error}   -> "Error: #{:file.format_error(error)}"
    end

First f(x) body -> We require that the first term in the tuple is `:ok`.
Second f(x) body uses the special variable `_` to match any other value for the first term.

`:file.format_error` -> uses Erlang's `File` module, to call the `format_error` f(x).

Opening a file:

    $ elixir hello.exs
    iex> c "hello.exs"

