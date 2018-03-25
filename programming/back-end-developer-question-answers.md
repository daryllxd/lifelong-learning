## Questions about Languages

- 3 worst defects of your preferred language (my answer)
  - Too easy to have nils in the code and the error message associated with `nil` doesn't lead to the right line number. `nil` really doesn't mean anything.
  - No type system, which was nice at first but you get to bugs at some point, so you have to put guard clauses.
  - Not really a problem with Ruby, but with Rails, since most development projects are in Rails, the lack of organization past MVC is really a problem. Everyone makes a service object at some point anyway. Also, a cursory comparison between Rails and Elixir's Phoenix shows the speed of Phoenix.
  - Single threaded (but I haven't really reached the point where this actually hurt me).
  - Huge tool system/very optimum for RAD (rapid application development).
  - According to others: [Reference](http://nirvdrum.com/2009/09/17/lessons-learned-in-large-computations-with-ruby.html) [Reference](https://www.amberbit.com/blog/2014/9/9/ruby-the-bad-parts/)
    - Creating large numbers of objects.
    - Profiler.
    - Memoization at the class method level.
    - Symbols: What's the difference between this and strings? That's why we need things like `HashWithIndifferentHashes`.
    - `true`? But I can just use `present?` if I have ActiveSupport loaded.
- Why is there a rising interest on Functional Programming?
  - [Reference](https://stackoverflow.com/questions/128057/what-are-the-benefits-of-functional-programming), [Reference](https://www.quora.com/What-are-the-advantages-of-functional-programming-over-object-oriented-programming-What-are-some-languages-that-are-mainly-functional), [Reference](https://stackoverflow.com/questions/292033/is-functional-programming-relevant-to-web-development)
  - Concept of immutability and just making sure that you don't get bugs from modification. Ex of state: counters in a loop.
  - Lazy evaluation.
  - Vs imperative, modular functions vs longer functions in imperative languages.
  - Possible to be both FP and OO.
  - Side effects: common source of bugs because you won't know if it does something besides operate on its arguments.
  - Same like Elixir/Phoenix philosophy, receive and HTTP request and produce an HTML result. This can be considered a function from requests to pages.
  - Desktop apps, long running process, stateful UI, data flow in several directions, suited to OO.

## Web development

- Why are first-party cookies and third-party cookies treated so differently?
- How would you manage Web Services API versioning?
- From a Back End perspective, are there any disadvantages or drawbacks on the adoption of Single Page Applications?

## Questions about Software Architecture

- Pros and cons of caching:
  - Pros:
    -
  - Cons:
    - Stale data.
    - Memory/disk usage because you have to store the cache somewhere. But good to reduce slow operations (calculations, parsing, database calculations)
    - Overhead and increased complexity re: other dependency, maintaining caching orchestrator/retrieval/error handling, etc.

## Questions




- Functional programming in web development?
