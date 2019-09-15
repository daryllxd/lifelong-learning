# Practical Ways to Write Better JavaScript
[Reference](https://stackoverflow.blog/2019/09/12/practical-ways-to-write-better-javascript/)

- TS: This makes refactoring larger applications possible.
  - *Most of the pain of refactoring JS is due to the fact that it doesn't enforce function signatures.*
  - When TS is setup correctly, it will be difficult to write code without first defining your interface and classes. This provides a way to share concise, communicative architecture proposals.
  - I believe forcing developers to define interfaces and APIs first results in better code.
- Use modern features:
  - `async` and `await`: this is functionally equivalent to `Promise`.
  - `let` and `const` and `arrow` or anonymous functions.
  - Spread operator, template literals/interpolating, object destructuring.

```
function animalParty({ dog, cat }) {} // Can destructure in method signature

const myDict = {
  dog: 'woof',
  cat: 'meow',
};
```

- Assume your system is distributed.
  - JS is single threaded, but not single-file. Even though it isn't parallel, it's still concurrent.
  - JS solves HTTP blockage with the event loop. The event loop loops through registered events and executes them based on internal scheduling/prioritisation logic.
  - JS for loops should only be used if absolutely necessary. Otherwise, use `map`, `map` with index, `for-each`.
  - Map can be run concurrently.
- Lint your code and enforce a style. As they are opinionated, take it with a grain of salt.
- Test your code:
  - Test driver: Jest, Mocha, Jasmine, Ava.
  - Spies and stubs: Sinon.
  - Mocks: Nock.
  - Web automation: Selenium, Cypress, PhantomJS.

