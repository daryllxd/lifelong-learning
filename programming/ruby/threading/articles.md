## How Do I Know Whether My Rails App Is Thread-safe or Not?
[Reference](https://bearmetal.eu/theden/how-do-i-know-whether-my-rails-app-is-thread-safe-or-not/)

- Apps are not thread-safe if you share mutable state between threads in your app.
- None of the core data structures in Ruby are thread safe. The structures are mutable, and when shared between threads, there are no guarantees the threads won't overwrite each other's changes.
- *GIL: This does not make your code thread-safe. It only guarantees that two threads can't run Ruby code at the same time.* Thus it does inhibit parallelism. However, threads can still be paused and resumed at any given point.
- Rails and its dependencies were declared thread-safe already in version 2.2, but the consensus was that so many third party libraries were not thread-safe that the whole request in Rails was enclosed within a giant mutex lock. *Basically, Rails and its dependencies are thread-safe. You don't have to do anything to "turn that feature on."*

### Making your app code thread-safe

- Global variables. Bad.
- Class variables and class instance variables. It's okay to use them, but not to mutate them. If you are not going to mutate a class variable, in many cases a constant is again a better choice.
- Memoization: Can be a thread safety issue if it is used to store data in class variables or class instance variables, or because `||=` is actually 2 operations, so potential context switch happening in the middle of it.
- If you have to share the result across threads, use a mutex to synchronize the memoizing part of the code.
- Constants: *The real issue is that the constancy of constants only applies to the object reference, not the referenced object. And if the referenced object can be mutated, you have a problem.* To fix, do the `CON = [1,2,3].freeze`.
- `ENV`: Really just a hash-like construct referenced by a constant.
