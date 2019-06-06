# Understanding, creating and subscribing to observables in Angular
[Reference](https://medium.com/@luukgruijs/understanding-creating-and-subscribing-to-observables-in-angular-426dbf0b04a3)

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
