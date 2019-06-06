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

# Effects
[Reference](https://ngrx.io/guide/effects)

- In a service-based Angular application, components are responsible for interacting with external resources directly through services.
- Instead, effects provide a way to interact with those services and isolate them from the components.
- These are where you handle tasks such as fetching data, long-running tasks that produce multiple events, and other external interactions where your components don't need explicit knowledge of these interactions.

- Key concepts
  - Effects isolate side effects from components, allowing for more pure components that select state and dispatch actions.
  - Effects are long-running services that listen to an observable of every action dispatched from the store.
  - Effects filter those actions based on the type of action they are interested in, done by using an operator.
  - Effects perform tasks, which are sync or async and return a new action.

- Vs component-based side effects
  - Traditional component + service (getting from HTTP service) split:
  - Component `ngOnInit` to tell service to do a `getAll()` and subscribe after.
  - Service gets via HTTP.
- Component manages state, uses the service to perform a side effect (hit external API fetch movies), and changes the state of the movies within the component.
- Effects handle external data and interactions, allowing your services to be less stateful and only perform tasks related to external interactions.
- Effect: handle the fetching of data, store: handle where you put the data.

```
@Component({
  template: `
    <div *ngFor="let movie of movies$ | async">
      {{ movie.name }}
    </div>
  `
})
export class MoviesPageComponent {

  // From the store, select the movies in the state object
  movies$: Observable = this.store.select(state => state.movies);

  constructor(private store: Store<{ movies: Movie[] >}) {}

  // On init, tell the store to get movies
  // Note: Doesnt tell HOW they got the movies, all it says is to get it, wherever it is
  ngOnInit() {
    this.store.dispatch({ type: '[Movies Page] Load Movies' });
  }
}
```

# Writing Effects

- Effects are injectable service classes with distinct parts:
  - An injectable Actions service that provides an observable stream of all actions dispatched after the latest state has been reduced.
  - Observable streams are decorated with metadata using the `Effect` decorator.
  - Actions are filtered by `ofType`.
  - Effects are subscribed to the `Store` observable.
  - Services are injected into effects to interact with external APIs and handle streams.

```
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class MovieEffects {

  @Effect()

  // This listens for all dispatched actions through the Actions stream, but is only interested in the `[Movies Page] Load Movies` event
  loadMovies$ = this.actions$
    .pipe(
      ofType('[Movies Page] Load Movies'),
      mergeMap(() => this.moviesService.getAll()
        .pipe(

          // Dispatch this action when everything has loaded
          map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),

          // Dispatch this action if the action errored out
          catchError(() => of({ type: '[Movies API] Movies Loaded Error' }))
        ))
      )
    );

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService
  ) {}
}
```

- Registering: You must add them to the module to specify that they are part of the package so to speak.

# Selectors
[Reference](https://ngrx.io/guide/store/selectors)

- Pure functions used for obtaining slices of store state.
  - When using the `createSelector` and `createFeatureSelector` functions, the `@ngrx/store` keeps track of the latest arguments in which your selector function was invoked. Because selectors are pure functions, the last result can be returned when the ak










- `switch<ap`
- Flattening operator NGRX

