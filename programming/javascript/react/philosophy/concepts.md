# React - Basic Theoretical Concepts
[Reference](https://github.com/reactjs/react-basic)

- Transformation: The same input should give the same output (pure functions).
- Abstraction: Breaking down UIs into multiple functions.
- Composition: Creating containers that compose other abstractions.
- State: A UI is not just a replication of server/biz logic. So we prefer our data model to be immutable.
- Memoization: if we know the function is pure, then we can use this.
- Lists: Most UIs are some form of lists that then produce multiple different values for each item in the list. This creates a natural hierarchy.
- Currying (`bind`) in JS can help move some of the boilerplate out by deferring the execution of a function.
- State map: We can use composition to avoid reimplementing the same pattern over and over again.
- Memoization map: We can do a memoization thing through composability.
- Algebraic effects: Having a shortcut to pass through two abstractions without involving the intermediates.
