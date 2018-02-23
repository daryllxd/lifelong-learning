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

    greet = fn -> IO.puts "Hello" end
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

#### Functions Can Return Functions

    iex> fun1 = fn -> fn -> 'hello' end end
    iex> fun1.().() -> Evaluating the outer, and then the inner function

    iex> greeter = fn(name) -> (fn -> "Hello #{name}" end) end
    # This is a function that creates a function that can greet people based on the name
    iex> dave_greeter = greeter.("Dave")
    iex> dave_greeter.() => "Hello Dave"

- *This works because functions in Elixir automatically carry with them the bindings of variables in the scope in which they are defined.* When the inner function is defined, it inherits this scope and carries the binding of `name` around with it. This is a *closure*, the scope encloses the bindings of its variables, packaging them into something that can be saved and used later.

    iex> add_n = fn n -> (fn y -> n + y end) end
    # This is a function that will, given a parameter n, will create a function that if
    # given a parameter y, will add x to y
    iex> add_two = add_n.(2)
    iex> add_two.(6) => 7

#### Passing Functions as Arguments

    iex> times_2 = fn n -> n *2 end
    iex> apply = fn(fun, value) -> fun.(value) end
    # This is a function that will evaluate a passed function with a passed value
    iex> apply.(times_2, 6)

- Ex: `map`: `Enum.map` takes in a list and a function, and applies the function to each element of the collection.
- Pinned Values: pin operator.
- The &Notation: Works like this:

    iex> add_one = &(&1 + 1) # This is like add_one = fn(n) -> n + 1 end
    iex> add_stuff = &(&1 + &2)
    iex> speak = &(IO.puts(&1))
    iex> speak.("hehe")
    iex> divrem = &{ div(&1, &2), rem(&1, &2) }

- Creating an anonymous function from a known function using the & operator

    iex> l = &length/1 #=> The length method already exists
    iex> l.([1,2,3]) #=> 3, call the function with 1 arity

- Cool stuff

    iex> Enum.map [1, 2, 3], &(&1 + 1) #=> [2, 3, 4]

#### Modules and Named Functions

    defmodule Times do
      def double(n) do
        n * 2
      end
    end

    same as

    def double2(n), do: n * 2

    Times.double(4) #=> 8

- A named function is identified by both its name and its arity.
- Calling multiple arity? This is common in f(x)al languages--look for the simplest possible case with a definite answer. This is the anchor. Then, look for a recursive solution that will end up calling the anchor case.

    # This will attempt to pattern match according to the order
    defmodule Factorial do
      def of(0), do: 1
      def of(n), do: n * of(n-1)
    end

- Order matters, this will work but you will get a warning

    # Can't get to the second case because n will always get evaluated in the first case
    # An error will appear
    defmodule Factorial do
      def of(n), do: n * of(n-1)
      def of(0), do: 1
    end

#### Guard Clauses

``` elixir
defmodule Guard do
  def what_is(x) when is_number(x) do
    IO.puts "#{x} is a number"
  end

  def what_is(x) when is_list(x) do
    IO.put "#{inspect(x)} is a list"
  end
end
````
In the factorial case, you can do:

``` elixir
defmodule Factorial do
  def of(n) when n > 0 ...
end
```

#### Default Parameters

#### Private functions:

``` elixir
defp fun(a) when is_list(a), do: true
```

#### The Amazing Pipe Operator:

``` elixir
filing = DB.find_customers
          |> Orders.for_customers
          |> sales_tax(2016)
          |> prepare_filing
```

The `|>` operator takes the result of the expression to its left and inserts it as the first parameter of the function invocation to its right.

#### Control Flow

- You should drop the occasional `if` or `case`, but consider more functional alternatives. Functions written without explicit control flow tend to be shorter and more focused.
- `if` and `unless` take in 2 parameters: a condition and a keyword list, which can contain either `do` or `else`.

``` elixir
if 1 == 1 do
  ...
else
  ...
end

if 1 == 1, do: 'error', else: 'OK'
```

- Much more idiomatic to use pattern matching.
- `cond`:

``` elixir
def _upto(current, left, result) do
  next_answer =
    cond do
       rem(current, 3) == 0 and rem(current, 5) ==0 ->
        'FizzBuzz'
      rem(current, 3) == 0 ->
        'Fizz'
      rem(current, 5) == 0 ->
        'Buzz'
      true ->
        current
      end
    end
    _upto(current + 1, left -1, [ next_answer | result ]
  end
```

- `case`: for pattern matching.
- Exceptions: Only for things that should NEVER happen in normal operation: failing to open a config file, database sever down. Not for things where the wrong entered the wrong name.
- Ex of design with exceptions:

``` elixir
case File.open('config_file') do
  {:ok, file} ->
     process(file)
  {:error, message } ->
     raise "Failed to open config file: #{message}"
end
```

### Organizing a Project

``` shell
mix
mix archive       # List all archives
mix archive.build # Archive this project into a .ez file
mix new           # Creates new Elixir project
mix run           # Run the file
mix test          # Run tesets
iex -S mix        # Run IEx and run the default task
mix help deps     # List all dependencies and their tasks
```

- `HTTPoison`.

``` elixir
defmodule Issues.GithubIssues do
  @user_agent [{ "User-agent", "Elixir dave@pragprog.com" }]

  def fetch(user, project) do
    issues_url(user, project)
    |> HTTPoison.get(@user_agent)
    |> handle_response
  end

  def handle_reponse({ :ok, %{status_code: 200, body: body}) do
    { :ok, body }
  end

  def handle_reponse({ _, %{status_code: _, body: body}) do
    { :error, body }
  end
end
```

- Don't do `HTTPoison.start`. `HTTPoison` runs as a separate application. In the `application` part of the Mixfile, you can do this:

``` elixir
def application do
  # Manages suites of running applications.
  [ applications: [:logger, :httpoision] ]
end
```

- `poison` library to convert the body to a string.

``` elixir
# PATTERN MATCHING IS SO BOSS

def process({user, project, _count}) do
  Issues.GithubIssues.fetch(user, project)
  |> decode_response
  |> convert_to_list_of_maps
end

def decode_response({:ok, body}) do: body

def decode_response(:error, error}) do
  {_, message} = List.keyfind(error, "message", 0)
  IO.puts "Error fetching from Github: #{message}"
  System.halt(2)
end

def convert_to_list_of_maps(list) do
  list
  |> Enum.map(&Enum.into(&1, Map.new))
end
```

- Writing a test for the CLI?

``` elixir
test "sort" do
  result = sort_into_asc(fake_list(["c", "a", "b"]))
  issues = for issue <- result, do: issue["created_at"]
  assert issues == ~w{a b c}
end

defp fake_list(values) do
  data = for value <- values, do: [{"created_at", value}, {"other_data", "xxx"}]
  convert_to_list_of_maps data
  end
end
```

- Then they did a `take`, then converted everything to columns.
- Then, documentation.

## Part II: Concurrent Programming

### 14:

- Actor model: doesn't share anything with other processes.
- I'll get back to this when I do a concurrent system.

### 15: Nodes: The Key to Distributing Services

## Part III: More Advanced Elixir




  - Access application config in controller?
  - Read medium articles from the command line?
  - Practical applications for sequences?

