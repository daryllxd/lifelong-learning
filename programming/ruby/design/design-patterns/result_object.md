# Result Objects: Errors without Exceptions
[Reference](https://www.rubypigeon.com/posts/result-objects-errors-without-exceptions/)

- Resonad gem:
  - Errors are part of the return value, not an exception.
  - Expected errors are available through `result.error`, and unexpected bugs are exceptions.
  - All expected error cases are automatically "caught", without having to guess what they are.

``` ruby
result = register_new_user(params)
if result.success?
  handle_success(result.value)
else
  handle_failure(result.error)
end
```

- When not to use:
  - When the method should always succeed.
  - When there is only a single failure case, just return `nil` or whatever.
  - If you can recover Locally, and you can just return a Null Object.
- Result objects are appropriate:
  - When an operation can fail in multiple different ways.
  - When operations need to be chained together, and each individual operation can fail.
  - When it's important for callers to know that the method can fail.
  - Works with service/interactor/command objects.
- Implementation: `Resonad`, dry-monads, Github::Result, `monadic`, `result-monad`.
