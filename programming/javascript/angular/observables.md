# Understanding, creating and subscribing to observables in Angular
[Reference](https://medium.com/@luukgruijs/understanding-creating-and-subscribing-to-observables-in-angular-426dbf0b04a3)

- ***Observables are lazy collections of multiple values over time.***
  - Observables are lazy. You only send values to whatever is subscribed to you.
  - Pulling: the data consumer decides when it gets its data from the data producer.
  - Observables push. The producer decides when the consumer gets the data.
  - JS: promises, but unlike functions, the promise is in charge of determining precisely when that value is "pushed" to the callbacks.
- Observables can:
  - Have multiple values over time
  - Are cancellable (promises are not cancellable).
  - If the promise is handed to you, the process that will produce that promise's resolution is already underway, and you generally don't have access to prevent that promise's resolution from executing.
- Angular's HTTP returns observables. Since a method returns an observable, we have to subscribe to it. Subscribing to it:
  - Async pipe. Angular will automatically subscribe and unsubscribe for you.
  - `$` means its an observable.
- Subscribing to the observable: using the actual `subscribe()` method: used if you want to do something with the data before displaying it.

```
public ngOnInit() {
    this.client.fetchUsers().subscribe((users: IUser[]) => {

        // do stuff with our data here.
        // ....

        // asign data to our class property in the end
        // so it will be available to our template
        this.users = users
    })
}
```

- Creating an observable:

```
import { Observable } from "rxjs/Observable"

// create observable
const simpleObservable = new Observable((observer) => {
  // observable execution
  observer.next("bla bla bla")
  observer.complete()
})

// subscribe to the observable
simpleObservable.subscribe()

// dispose the observable
simpleObservable.unsubscribe()
```

- Three functions available to send data to the subscribers of the observable:
  - `next`: send any value.
  - `error`: sends a JS error or exception.
  - `complete`: does not send any value.
- `next` can be done infinitely, but when `complete` and `error` is called, the execution stops and no more data will be delivered to the subscribers.
- Disposing observables: `unsubscribe()`.

# Understanding hot vs cold Observables
[Reference](https://medium.com/@luukgruijs/understanding-hot-vs-cold-observables-62d04cf92e03)

- ***When the data is produced by the Observable itself, we call it a cold Observable. When the data is produced outside the Observable, we call it a hot Observable.***
  - If your Observable produces a lot of different values, it can happen that two Observables that subscribe at more or less the same receive two different values.

``` typescript
// cold
import * as Rx from "rxjs";

const observable = Rx.Observable.create((observer) => {
    observer.next(Math.random());
});

// subscription 1
observable.subscribe((data) => {
  console.log(data); // 0.24957144215097515 (random number)
});

// subscription 2
observable.subscribe((data) => {
   console.log(data); // 0.004617340049055896 (random number)
});
```

``` typescript
// hot

import * as Rx from "rxjs";

const random = Math.random() <- The value is produced outside of the observable syntax.

const observable = Rx.Observable.create((observer) => {
    observer.next(random);
});

// subscription 1
observable.subscribe((data) => {
  console.log(data); // 0.11208711666917925 (random number)
});

// subscription 2
observable.subscribe((data) => {
   console.log(data); // 0.11208711666917925 (random number)
});
```

- Hot Observable: Able to share data between multiple subscribers.
- Ex of use cases: generating a random number, DOM events.

```
// Example of tracking clicks

import * as Rx from "rxjs";

const observable = Rx.Observable.fromEvent(document, 'click');

// subscription 1
observable.subscribe((event) => {
  console.log(event.clientX); // x position of click
});

// subscription 2
observable.subscribe((event) => {
   console.log(event.clientY); // y position of click
});
```

- As the data is produced outside of the observable, the data gets created, regardless if there is a subscriber or not.
- Use a hot Observable unless:
  - You want to make sure multiple subscribers get the same data.
  - Instantiating something outside of the observable (something shared between multiple consumers, like a web socket connection).
