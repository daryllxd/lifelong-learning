# From JavaScript to Typescript to Elm
[Reference](https://itnext.io/from-javascript-to-typescript-to-elm-5c36fca70b4a)

- JS: Okay for supportability because old websites still work, but not good for maintainability because it's a scripting runtime programming language, which means anything you write will always run.
- So it's prone to crash at runtime. You'll run into errors that users know about and you might not even know about.
- TypeScript prevents you from: possible null/undefined objects, unused parameters, and checks on if an object is in a certain state.
- The problem with TS: It supports 100% of what JS can do.
  - So the code will always be prone to unsecured types, and developers eventually forget to properly type their things and will let slip errors here and there.
  - TS allows you to cheat when using the `any` type - you can basically skip all type checks and tell TS that a certain piece of code can do anything. This is very easy to use when you just want to use it as a quick exit door to get their feature done faster.
- TS does not protect you from side effects, which affect state mutability.

## Elm

- No compromises. So no runtime errors.
- Nothing can ever be in a state of `null` or `undefined`.
- Data immutability, Bundles and minifies code, and enforces type safety. Developers cannot cut corners.
- Functional language so you cannot get into a weird state caused by side-effects. Your code becomes easily testable.
- Elm forces you to handle all the cases, which will strain you, but this is good strain. An API call must have `Failure`, `Success`, and `Loading`.
