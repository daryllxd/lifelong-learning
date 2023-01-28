# Overview of React.js

- We determine the value of a prop before the component is built.
- The value of a prop will never change (read-only) once they're passed into components.
- State:
  - State can be tracked globally, and data can be shared between components as needed.
  - Data can be asynchronous.
  - Modified via `setState`.

# Singleton Pattern

```
let instance;

class Counter
  constructor() {
    if (instance) {
      throw error
    }
    instance = this;
  }
```

- Freezing the object:

```
const singletonCounter = Object.freeze(new Counter());
export default singletonCounter;
```

- Disadvantage of singleton:
  - Since objects are passed by reference, modifying the value of count in either of a component's consumer will modify the value on the `singletonCounter`.
  - Hard to test since there is just one instance.
  - Can access the global variable all throughout the app.
  - **In Redux, since only pure function reducers can update the state, we can at least make sure that the global state is mutated in the way we intend it.**

# Proxy Pattern

- Used to add validation to updating.

