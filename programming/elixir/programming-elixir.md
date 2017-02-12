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

>>>>>>> Add Programming Elixir: Immutability.
