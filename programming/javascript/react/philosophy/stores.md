# Documentation
[Reference](https://redux.js.org/basics/store)

- Holds app state.
- Allows access to state via `getState()`.
- Allows state to be updated via `dispatch(action)`.
- Registers listeners via `subscribe(listener)`.
- Handles unregistering of listeners via the function returned by `subscribe(listener)`.

# Redux - multiple stores, why not?
[Reference](https://stackoverflow.com/questions/33619775/redux-multiple-stores-why-not)

- OP:
  - Reliable: we use selectors to dig through the app state and obtain context-relevant information.
  - Fast: 100 reducers, only a handful of reducers process data on any given dispatch, the others just return the previous state.
  - Easier to debug.
  - Our structuring:

``` js
{
  apis: {
    api1: {}...
    api2: {}
  },
  components: {},
  session: {}
}
```

- `Normalizr` to normalize the data based on a schema.

- Dan Abramov
  - To make the code more modular, we use reducer composition.
  - Having multiple reducers that are further split into a reducer tree is how you keep updates modular in Redux.
  - Reducer can call other reducers.
  - Easy to persist, hydrate, and read the state. Just one data storage that needs to be filled and rehydrated on the client.
  - Makes it possible to do time travel features.
  - Subscriptions are called only after the dispatch has been processed.
