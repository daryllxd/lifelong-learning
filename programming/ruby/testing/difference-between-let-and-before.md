## RSpec: What is the difference between let and a before block?
[Reference](https://stackoverflow.com/questions/5974360/rspec-what-is-the-difference-between-let-and-a-before-block)

- Code within a `let` block is only executed when referenced, lazy loading, so the order of the blocks is irrelevant.
- `let` should not be used if you're searching for something which has been saved to the database as they will not be saved to the database unless they have already been referenced.
- Difference between `let!` and `before(:each)` is that you end up with an explicit reference to the `let` variable.
- When many commands have to be executed, I could use `before(:each)` because its syntax is more clear when many commands are involved.

## When to use RSpec let()?
[Reference](https://stackoverflow.com/questions/5359558/when-to-use-rspec-let)

- Instance variables spring into existence when referenced, if wrong spelling, a new ivar will be created and initialized to nil, which causes false positives.
- `before(:each)` will run before each example, even if the example doesn't use any of the instance variables defined in the hook.
- `let` always memoizes the value for the duration of a single example. It does not memoize the value across multiple examples.
