# BehaviorSubject vs Observable?
[Reference](https://stackoverflow.com/questions/39494058/behaviorsubject-vs-observable)

- `BehaviorSubject` is a type of `Subject`. A subject is a special type of observable so you can subscribe to messages like any other observable.
- Unique features of `BehaviorSubject`:
  - Initial value so it must always return a value on subscription.
  - *Upon subscription, it returns the last value of the subject.*
  - At any point, you can retrieve the last value using `getValue` method.
- You can get an observable from `BehaviorSubject` using `asObservable()`.
- In Angular services, I would use BehaviorSubject for a data service as an angular service often initializes before component and behavior subject ensures that the component consuming the service receives the last updated data even if there are no new updates since the component's subscription to this data.
- Since observable is just a function, it does not have any state, so for every new Observer, it executes the observable create code again and again. BehaviorSubject stores observer details, runs the code only once
  - *Code run for each observable.*
- Subject is Hot by default, Observables are cold by default. The instant we create a subject, we can emit a value from it and that value will be emitted even if nobody is subscribed to it yet.
- *Behavior object takes in an initial "seed" value, so new subscribers instantly get that value.*
- As observable is just a function, it does not have any state, so for every new Observer, it executes the code again and again. `BehaviorSubject` stores observer details, runs the code only once and gives the result to all observers.
- `ReplaySubject` - no matter when you subscribe, you will receive all the broadcasted message. It has a history/can broadcast/emit a sequence of old values.
- Libraries will expose fields as observable, but may use Subject or BehaviorSubject behind the scenes (ex: ActivatedRoute).

# Observables vs Subjects vs BehaviorSubjects
[Reference](https://javascript.plainenglish.io/eli5-observables-vs-subjects-vs-behavior-subjects-f2494f14813d)

- Observables are synchronous like promises, but the key distinction is that Observables can return multiple values over time, and promises simply return a single value.
- Cold observable: When there's only one observer subscribed and listening for changes.
- Hot observable: When there are multiple observers listening for changes.
- Regular observable: Cold and unicast. They are usually used to read or update the current state.
- Subject/BehaviorSubject.
  - Can feed value to subject with `subject$.next`.
  - BehaviorSubject - You can access the value at any time with `getValue`. This makes it useful for storing data in a service to share across your app. It can be sort of a store that acts as a single source of truth.

# Sharing data between components using BehaviorSubject
[Reference](https://medium.com/codex/how-to-share-data-between-components-in-angular-a-shopping-cart-example-b86ce8254965)

- Requires an initial value when instantiated, which allows us to set a default value for our state.
- Emits the latest value on subscription.
- We can get snapshots of its value with `getValue()` if we need it for synchronous purposes.
- It can be used as a type of projection to derive data without modifying the original state.
