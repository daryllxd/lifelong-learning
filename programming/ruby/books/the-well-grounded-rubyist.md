## 6

### 6.1 Conditional Code Execution

- The Ruby parser sees `x=1`, and it assigns a value, nil.

``` ruby
if false
  x = 1
end

p x #=> nil
p y #=> Fatal error: y is unknown
```

You can do things like this:

``` ruby
# Assign to variable m the match
if m = /la/.match(name)
  ...
```

- `case` operator: `when` matches on `===`.

### 6.3 Iterators and code blocks.

- A code block isn't an argument/ The code block is the code block.
- Method calls in Ruby have the following syntax:
  - A receiver object or valuable (default is `self`).
  - A dot (only if there is an explicit receiver).
  - Method name (required).
  - Argument list (optional).
  - Code block (optional, no default).
- `do end` is different from `{}`?
  - `do end` returns an enumerator, `{}` returns `nil`.
- Implementing `map`

``` ruby
class Array
  def my_map
    c = 0
    acc = []
    until c == size
      acc < yield(self(c))
      c += 1
    end
  end
end
```

- Blocks have access to the variables that already exist when they're created, but block variables (those between the pipes) are not the same as the ones outside.
- Semicolon in the parameter list: Doesn't overwrite variables outside.

```
def block_local_variable
  x = "Original x!"

  3.times do |i;x|
    x=i
      puts "x in the block is now #{x}"
  end

  puts "x after the block ended is #{x}"
end

block_local_variable
```

``` ruby
aw = proc { |x, y = {haha: 1 }| puts x + y[:haha] }

3.times { |x| aw.call(x) } #=> 2, 3, 4
```

### 6.4 Error handling and exceptions

- Exceptions that get raised are instances of a class, not the actual Exception class itself.
- Reraising an exception:

``` ruby
begin
  fh = File.open(filename)
  rescue => e
    logfile.puts
    raise
end
```

- Creating your own exception class:
  - Inherit from `StandardError` to have a meaningful exception name and refine the semantics of the rescue operation.
  - Self-documenting.
  - Able to rescue this specific exception.

## 7: Built-in Essentials

- Literal constructors: `String.new`, `Array.new` (you can't do `Integer.new`).
- `inspect` is for overriding, independently of whether you override `to_s` (which is used when it's string interpolated). `inspect` is for other programmers.
- A `display` method exists, it logs stuff out (default to `STDOUT`).
- Star operator: Unwraps its operand into components.
- Conversion vs typecasting: Calling methods like `to_s`, `to_i`, and `to_f` results in a new object, not like in C where you use the object as a string or an integer.
  - In a sense, all objects are typecasting themselves constantly.
- Role-playing method
  - `to_str`
  - `to_ary`
- Some cool shit:
  - Empty class definition = false
  - Non-empty class definition = the same value as the last value they contain
  - Method definitions are false, even if what they return is a true value
- Method checking:
  - `obj.private_methods`, `obj.public_methods`, `obj.protected_methods`...

## 8: Strings, symbols, and other scalars

- `&Q{}` generates a double-quoted string.
- Symbols and their uses.
  - Immutable.
  - Unique.
  - Internally, Ruby uses symbols to keep track of all the names it's created for variables, methods, and constants. `Symbol.all_symbols`.

## 9: Collection and container objects

## 10: Enumerable and Enumerator

- Hashes iterate through a hash one key/value pair at a time.
- `Enumerable#grep`: `enumerable.grep(expression) {|item| ... }`
  - `enumerable.select {|item| expression === item}.map {|item| ... }`
- Lazy evaluation:
  - `names.each_slice(2)`, since this returns an enumerator, you can then invoke

## 11: Regular Expressions

## 12: File, I/O, and System Operations

## 13: Object Individuation

## 14: Callable and Runnable Objects

- Anonymous functions: the `Proc` class.
- Callable objects:
  - Methods.
  - `Proc` objects.
  - Lambdas.

- Using `procs` for Blocks
- You can't do this:
  - `capture_block(&p) { puts "This is the explicit block" }`
  - Both block arg and actual block given.
- Closure:
  - A piece of code that creates its context around with it. These are important because they preserve the partial running state of the program.
  - The classic closure example is a counter.

- Creating functions with `lambda` and `->`
  - Lambdas require explicit creation: When Ruby creates `proc` objects implicitly, they're regular procs and not lambdas. So in `def m(&block)`, the `Proc` object you grab is a regular proc, not a lambda.
  - For a lambda, a `return` inside triggers an exit from the body of the lambda to the code context immediately containing the lambda.
    - **Returning inside a proc triggers a return from the method in which the proc is being executed.**
    - `ruby -e 'Proc.new { return }.call'` returns a `JumpError`.
    - `ruby -e 'lambda { return }.call'` is fine.
  - Lambdas don't like being called with the wrong number of arguments.

- Capturing method objects:
  - `meth = c.method(:talk)`, which can then be `meth.call`.
  - You can also bind and unbind methods. (Very rarely used.)

- The `eval` family
  - The `Binding` class.
    - Ruby has a class called `Binding` whose instances encapsulate the local variable bindings in effect at a given point in execution.
  - `instance_eval`: evaluates the string or code block you give it, changing `self` to be the receiver of the call to `instance_eval`. Not a good idea because you pry into another object's state.
  - `instance_exec`: Can take arguments.
  - `class_eval`: Flattening the scope for variables? Check out possible use cases.

## Threads

- Later, not needed yet.

## Issuing system commands from inside Ruby

- `system`: The global variable `$?` is set to a `Process::Status` object that contains info about the call.
- `irb> system("date")` => A `$?` would return the proc.
- `open` to communicate to outside programs.

# 15: Callbacks, hooks, and runtime introspection

- `method_missing`
- `included` (`self.included(class)`). Use case: if a module is included, the instance methods get brought in but the class methods don't.
- `extended`.

``` ruby
module M
  def self.included(c1)
    def c1.a_class_method
    end
  end
end
```

- `inherited`. (Doesn't work for subclasses hooking onto the "inherited" class.)
- `const_missing`.
- `method_added` and `singleton_method_added`.
- `object.private_methods` and `object.protected_methods`.
- `Integer.instance_methods(false)` to just show the methods defined in `Integer`.
- `local_variables`

- Tracing execution
  - `caller`.
