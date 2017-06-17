## The Error Model
[Reference](http://joeduffyblog.com/2016/02/07/the-error-model/)

- How do errors get communicated to programmers and users of the system?
- Fail-fast/abandonment for programming bugs.
- Statically checked exceptions for recoverable errors.

#### Ambitions and Learnings

###### Principles

- *Usable.* **It must be easy for developers to do the "right" thing in the face of an error, almost as if by accident.** The model should not impose excessive ceremony in order to write idiomatic code.
- *Reliable.* This is literally the foundation of the entire system's reliability.
- *Performant.* As close to zero overhead as possible for success paths. Added costs for failure paths must be "pay-for-play".
- *Concurrent.*
- *Diagnosable.* Must be easy to debug.
- *Composable.* At the core, the Error Model is a programming language feature. As such, it had to provide familiar orthogonality and composability with other features of the system.

###### Error Codes

- **Many high performance systems have been built using return codes.**
- C, Linux, Windows, Go, Rust.
- *Problem: Performance cost.* You now have 2 values to return (the actual return value and the possible error). Calls are less efficient.
- There are branches injected into callsites anywhere a callee can fail--checks are smeared across the code, making it difficult to measure the impact directly. Secondary effect that since there are more branches, you can confuse the optimizer.
- *Problem: Forgetting to check them.* You might end up with silently swallowed errors in your code. The inability to accidentally ignore a return value is important for the overall reliability of the system.
- *Problem: Programming Model Usability.* With error codes, you end up writing lots of `if` checks.
- What if the function wants to return a real value and the possibility of an error? We've burned the return slot already so...
  - Use the return slot for one of the two values and another slot for the other of the two. Multi-valued returns? `(return 0, errors.New("Bad things happened"))`
  )
  - Return a data structure that carries the possibility of both in its very structure. Rust has a `try!` macro boilerplate to show this:

``` rust

fn bar() -> Result<(), Error> {
    match foo() {
        Ok(value) => /* Use value ... */,
        Err(err) => return Err(err)
    }
}

fn bar() -> Result<(), Error> {
    let value = try!(foo);
    // Use value ...
}

```

###### Exceptions

_ If you can't react appropriately to failures, your system, by definition, won't be very reliably.
- *Problem: Unchecked exceptions.* Any function call/statement can throw an exception, transferring control non-locally somewhere else. Where? Who knows. There are no annotations or type system artifacts to guide your analysis. *As a result, it’s difficult for anyone to reason about a program’s state at the time of the throw, the state changes that occur while that exception is propagated up the call stack – and possibly across threads in a concurrent program – and the resulting state by the time it gets caught or goes unhandled.*
- Many people think these are "good enough". Happy path = okay, throwing an exception for the common exceptions gets you out of a pickle fast. This can work for a scripting language, but not for an OS.
- Asynchronous exceptions: Faults triggered by hardware faults, like access violations.

Deprecating `throws`

- Runtime checking
- Runtime performance overhead
- Lack of composition in generic code
