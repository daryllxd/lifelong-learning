# Exceptional Ruby

In most test suites, happy path tests predominate, and there may only be a few failure case tests. Most mature codebases are riddled with the telltale times of hastily-patched failure cases--business logic that is interrupted again band again by `nil`-checkes and `begin...rescue...end` blocks.

An *exception* is the occurence of an abnormal condition during the execution of a software element.

A *failure* is the inability of a software element to satisfy its purpose.

An *error* is the presence in the software of some element not satisfying its specification.

Bertrand Meyer: All methods have a contract, either implicit or explicit, with their callers. A method can be said to have failed when it has failed to fulfill this contract.

*Contract: "Given the following inputs, I promise to return certain outputs and/or cause certain side-effects." It is the caller's responsibility to ensure that the method's preconditions (the inputs it depends on) are met. It is the method's responsibility to ensure that its postconditions (outputs and side effects) are fulfilled.*

It is also the methods' responsibility to maintain the invariant of the object it is a member of. The invariant is the set of conditions that must be met for the object to be in a consistent state.

*When a method's preconditions are met, but is unable to either deliver on its promised postconditions, or to maintain the object invariant, then it is in breach of its contract; it has failed.*

## Reasons for Failure

- Mistake in implementation (ex: hash indexed by String instead of Symbol).
- Program runs out of resources.
- Web service fails.

# Exception Life Cycle

`raise` and `fail` are synonyms. Jim Weirich: Use `fail` for first time and `raise` for second time.

    raise [EXCEPTION_CLASS], [MESSAGE], [BACKTRACE]
    raise RuntimeError # RuntimeError is raised when nothing is passed in as an EXCEPTION_CLASS

`raise` can be overrode because it is implemented by `Kernel`.

# `raise` Internals

1. Call `#exception` to get the exception object.
2. Set the backtrace.
3. Set the global exception variable. The `$!` and `$ERROR_INFO` global variable always contains the currently active exception if any.
4. Raise the exception object up the call stack. Exception will look for `ensure` or `rescue`.

`ensure` classes will always be executed, whether an exception is raised or not. BTW a return from a method inside an `ensure` takes precedence over any exception being raised, and the method will return as if no exception has been raised at all.

# Coming to the `rescue`

It doesn't capture: `NoMemoryError`, `LoadError`, `NotImplementedError`, `SignalException`, `Interrupt`, `ScriptError`. Exceptions outside of `StandardError` (these are conditions that can't reasonably be handled by a generic catch-all `rescue`).

You can use `rescue` in the same way that you use `if` or `unless`.

    f = open("nonesuch.txt") rescue nil

`retry`

    tries = 0
    begin
      tries += 1
      puts "Trying #{tries}"
      raise "Didn't work"
    rescue
      retry if tries < 3
      puts "I give up"
    end

`raise` during exception handling: This throws away the original exception. There is no way to retrieve the original exception. Use Nested exceptions.

[TODO]: NESTED_EXCEPTIONS.

`else` after a `rescue` clause is the opposite of `rescue`; where the `rescue` clause is only hit when an exception is raise, `else` is only hit when no exception is raised by the preceding code block.

## Uncaught exceptions

When an exception is never rescued, the stack will unwind completely and Ruby will handle the un-rescued exception by printing a stack trace and terminating the program. However, before the program ends, Ruby will execute various exit hooks:

    trap
    at_exit
    END

Crash logger implemented with `at_exit`:

    at_exit do
      if $! # Check if the exit is because of an exception
        open('crash.log', 'a') do |log|
          error = {
            :timestamp => Time.now,
            :message => $!.message,
            :backtrace => $!.backtrace,
            :gems => Gem.loaded_specs.inject({}){m, (n,s)| m.merge(n => s.version)}
            }
          }
          YAML.dump(error, log)
        end
      end
    end

## Are Ruby exceptions slow?

There is no penalty simply for having exception-handling code lying around dormant. On the other hand, writing code that uses exceptions as part of its logic can have a significant performance cost.

# Responding to Failures

*Failure flags and benign values.* A `nil` isn't very communicative but in some cases it may be all that's needed.

When the system's success doesn't depend on the outcome of the method in question, using a benign value may be the right choice.

    begin
      response = HTTP.get_response(url)
      JSON.parse(response.body)
    rescue Net::HTTPError
      { "stock_quote" => "<Unavailable>" }
    end

*Remote failure reporting.* These can be in a central log server, an email to the developers, or a post to a third-party exception-reporting service such as Hoptoad, Exceptional, or New Relic RPM.

*Bulkhead.* By partitioning your systems, you can separate a system's errors from the other parts. Ex: `rescue` nothing.

    begin
      SomeExternalService.some_request
    rescue Exception => error
      logger.error "Exception at..."
      logger.error error.message
      logger.error error.backtrace.join("\n")
    end

*The Circuit Breaker pattern.*

This is a mechanism that controls the operation of a software subsystem and behaves like a physical circuit breaker. Thee states:

- *Closed.* Subsystem is allowed to operate normally. However, a counter tracks the number of failures that have occurred, and when the number exceeds a threshold, the breaker trips, and enters the open state.
- *Open.* The subsystem is not permitted to open.
- *Half-open.* The system can run, but a single failure will send it back into the "open" state.



