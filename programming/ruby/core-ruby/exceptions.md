# Why is it bad style to `rescue Exception => e` in Ruby?
[Reference](https://stackoverflow.com/questions/10048173/why-is-it-bad-style-to-rescue-exception-e-in-ruby?noredirect=1&lq=1)

- `Exception` is the root of Ruby's exception hierarchy, so when you `rescue Exception`, you rescue from everything, including subclasses such as `SyntaxError`, `LoadError`, and `Interrupt`.
  - Rescuing `Interrupt` prevents the user from using CTRLC to exit the program.
  - Rescuing `SignalException` prevents the program from responding correctly to signals. It will be unkillable except by `kill -9`.
  - Ruby's default behavior is to rescue from `StandardError`.
- The case for rescuing from `Exception`: for logging/reporting purposes, just so you can re-raise it.

``` ruby
begin
  # iceberg?
rescue Exception => e
  # do some logging
  raise e  # not enough lifeboats ;)
end
```

- There are gems that inherit from Exception (Why?).
- Rescuing `Exception` will hide bugs such as `NameError` or `NoMethodError` if you mistyped a method name.

# Catch all exceptions in a rails controller
[Reference](https://stackoverflow.com/questions/3694153/catch-all-exceptions-in-a-rails-controller?noredirect=1&lq=1)

# List of Exceptions - Exceptional Ruby

- `StandardError`: This class and all its subclasses will be rescued by a default `rescue` clause.
- `RuntimeError`: The exception class we get when we call `raise` or `fail` without an explicit class. In a sense, `RuntimeError` is Ruby's miscellaneous exception. It says nothing about the failure except that there was one.
- `NoMemoryError`
- `ScriptError`: We have subclasses `LoadError` and `SyntaxError` to indicate failures in loading and executing Ruby scripts.
- `SignalException`: These are raised when a Ruby process is signaled by the OS. (A big infrequent.)
- `IOError`
- `ArgumentError, RangeError, TypeError, IndexError`: Method was called incorrectly.
- `SystemCallError`: You'll never see this, what you will see are its descendants, each of which are named `Errno::<ERROR SYMBOL>`, where `<ERROR SYMBOL>` is the symbolic name for a system error code.

# Jim Weirich on Exceptions
[link](http://devblog.avdi.org/2014/05/21/jim-weirich-on-exceptions/)

"When you call a method, you have certain expectations about what the method will accomplish. Formally, these expectations are called post-conditions. Formally, these expectations are called post-conditions. A method should through an exception whenever it fails to meet its postconditions."

This implies a small understanding of Design by Contract and the meaning of pre- and post-conditions.

    model.save!

If the model is not saved for some reason, then an exception must be raised because the post-condition is not met. If save doesn't actually save, then the returned result will be false, but the post-condition is still met, so no exception.

The only time you would want to rescue/rethrow is when you have a job half-way done and you want to undo something to avoid a partially complete state. Your strategic rescue points should be chosen carefully so that the program can continue with other work even if the current operation failed. A Rails app should recover and be ready to handle the next HTTP request.

*Most exception handlers should be generic. Since exceptions indicate a failure of some type, then the handler needs only make a decision on what to do in case of failure.* Detailed recovery operations for very specific exceptions are generally discouraged unless the handler is very close to the point of the exception.

*Exceptions should not be used for flow control. Use throw/catch for that. Reserve exceptions for true failure conditions.*
