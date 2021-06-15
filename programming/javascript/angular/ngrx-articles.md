# `@ngrx/store`
[Reference](https://ngrx.io/guide/store)

- Actions - unique event that are dispatched from components an services.
- State changes = pure functions called reducers.
- Selectors = pure functions to select, derive, and compose pieces of state.

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

- Features of selectors: portability, memoization, composition, testability, type safety.
- Selecting multiple pieces of state: `createSelector`, can take up to 8 selector functions.
- Selectors with props - will be deprecated.
- `createFeatureSelector`: a convenience method for returning a top level feature state. Returns a typed selector function for a feature slice of state.
- Selectors: Read model, reducers: write model.
- Advanced usage:
  - Can connect selector with pipe operator.

``` ts
import { select } from '@ngrx/store';
import { pipe } from 'rxjs';
import { filter } from 'rxjs/operators';

export const selectFilteredValues = pipe(
  select(selectValues),
  filter(val => val !== undefined)
);

store.pipe(selectFilteredValues).subscribe(/* .. */);
```

  - Last n state transitions.

# Angular Service Layers: Redux, RxJs and Ngrx Store - When to Use a Store And Why?
[Reference](https://blog.angular-university.io/angular-2-redux-ngrx-rxjs/)

- You have a piece of data that needs to be used in multiple places in your app, and passing it via props makes your components break the single-responsibility principle (i.e. makes their interface make less sense)
- Redux solves the `props feel extraneous` issue.
- If we try to solve this ^ with `scope.broadcast`, we will easily end up with event soup scenarios, where the events chain themselves in unexpected ways, and it becomes hard to reason about the application.
- When components consuming the new version of the data do not know what caused the data to change, the stores are decoupled.
- Stores solve:
  - Component interaction via `Observable` pattern.
  - Client-side cache if needed, to avoid doing repeated Ajax requests.
  - A place to put temporary UI state.
  - Allows modification of client-side transient data by multiple actors.
- Alternate solutions:
  - Inject services deep in the component tree, inject components/services into each other, create shared data services.
  - Local state that cleans itself up: `providers` in the component decorator.
- The cost:
  - Unidirectional data flow in Angular: Making sure the view cannot update itself?
  - Expression has changed after it was checked?
