# Docs
[Reference](https://ngrx.io/guide/store/actions)

- Actions: unique events that can happen throughout your application.
- Base interface:

```
interface Action {
  type: string;       // Provides context of what type of action it is, and where an action was dispatched from
                      // Minimum part of the interface
  payload: {          // Optional, but gives context for the action
    username: string, // So if the user is logging in then we want to know which user is logging in and what password
    password: string,
  }
}
```

- Writing good actions:
  - Upfront - Write actions before developing features to understand
  - Divide - Categorize actions based on the event source
  - Many - The more actions, the better yo express flows in your application
  - Event-driven - ***Captures events, not commands - actions are the description of an event and the handling of that event.***
  - Descriptive - Provide context so an event can be debugged

```
import { Action } from '@ngrx/store';

export class Login implements Action {
  readonly type = '[Login Page] Login';

  constructor(public payload: { username: string; password: string }) {}
}
```

- *Actions are written as classes to provide a type-safe way to construct an action when it's being dispatched.*
- Example of action being consumed:

```
click(username: string, password: string) {
  store.dispatch(new Login({ username: username, password: password }));
}
```

- '[Login Page] Login'
  - Category in square brackets
  - "Login" description

- Consumers of actions
  - Reducers or effects
  - Then they figure out what action happened to determine whether they need to handle the action
- Actions are grouped together by feature area, but we also need to expose the action type info

# Reducers

- Transitioning from one state to the other.
- ***Pure function, produce the same output for a given input.*** No side effects and handle each state transition synchronously.
- The reducer function
  - An interface or type that defines the shape of the state
  - The arguments including the initial state or current state and the current action
  - The switch statement

# Selectors
[Reference](https://ngrx.io/guide/store/selectors)

- Pure functions used for obtaining slices of store state.
  - When using the `createSelector` and `createFeatureSelector` functions, the `@ngrx/store` keeps track of the latest arguments in which your selector function was invoked. Because selectors are pure functions, the last result can be returned when the ak
