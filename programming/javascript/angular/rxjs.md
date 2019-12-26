# What is RxJS? And Why You Should Know About It
[Reference](https://news.thisdot.co/what-is-rxjs-and-why-you-should-know-about-it-2a5afe58cea)

- RxJS solves "the ability to handle asynchronous calls with multiple events".
- If you're writing a function that carries data along a series of actions => if you are just using functions to handle the series of requests, there may be unnecessary steps that are taken to return the error.
- *Rather than passing the error through all the functions, you should just take the error and update the view without running through the now unnecessary Ajax requests.*
- Promises: can solve, but they:
  - Can only hold a single value.
  - Are not cancellable, meaning they have the potential to block the thread.
- RxJS:
  - Provides the developers the ability to treat everything that needs to fire an event as a single shaped thing.
  - Downside: A lot of language that requires a bit of time to learn.
  - Perks: When you know it, you can really do a lot of things with it.
  - When actions use observables, they all take the same shape and it becomes more exciting to use as it becomes more ubiquitous throughout your app.
  - Use case: Events where multiple actions that call for a reduction in complexity. (Ex: drag and drop)
- When:
  - Action triggering multiple events
  - If you have a lot of asynchrony and you are trying to compose it together
  - When you want to update something reactively
  - If you are handling huge sets of data in arrays and you need to process the sets of data in steps, you can use RxJS operators as a tranducer that processes those sets of data without creating intermediate arrays that need to be garbage collected.
- Your first operators:
  - `map`, `filter`, `scan`, `switchMap`, `concat`, `share` and `shareReplay`
  - Weird shit: `pairwise`, `bufferCount`, and `groupBuy`.
- Debugging RxJS:
  - When you return something from a `mergeMap` and its expecting an observable, but it returns something that is not an observable, people want to be able to see the function it's returning.
- Currently: Rx is 24k, they are trying to create T-Rx which takes it to just 3k.

# Understanding RXJS Subjects
[Reference](https://medium.com/@luukgruijs/understanding-rxjs-subjects-339428a1815b)

- Subjects can multicast. Multicasting basically means that one Observable execution is shared among multiple subscribers.
- Subjects are like `EventEmitters`, they maintain a registry of many listeners. ***When calling `subscribe` on a Subject, it does not invoke a new execution that delivers data. It simply registers the given Observer in a list of Observers.***

``` typescript
import * as Rx from "rxjs";

const subject = new Rx.Subject();

// subscriber 1
subject.subscribe((data) => {
    console.log(data); // 0.24957144215097515 (random number)
});

// subscriber 2
subject.subscribe((data) => {
    console.log(data); // 0.24957144215097515 (random number)
});

subject.next(Math.random());
```

- You can also use a Subject as a data consumer. You can convert Observables from unicast to multicast.
- If you encounter the scenario where your Observable subscriptions receive different values, use Subjects.

# Understanding RXJS `BehaviorSubject`, `ReplaySubject` and `AsyncSubject`
[Reference](https://medium.com/@luukgruijs/understanding-rxjs-behaviorsubject-replaysubject-and-asyncsubject-8cc061f1cfc0)

- The `BehaviorSubject` has the characteristic that it stores the “current” value. This means that you can always directly get the last emitted value from the `BehaviorSubject`.

```
import * as Rx from "rxjs";

const subject = new Rx.BehaviorSubject();

// subscriber 1
subject.subscribe((data) => {
    console.log('Subscriber A:', data);
});

subject.next(Math.random());
subject.next(Math.random());

// subscriber 2
subject.subscribe((data) => {
    console.log('Subscriber B:', data);
});

subject.next(Math.random());

console.log(subject.value)

// output
// Subscriber A: 0.24957144215097515
// Subscriber A: 0.8751123892486292
// Subscriber B: 0.8751123892486292
// Subscriber A: 0.1901322109907977
// Subscriber B: 0.1901322109907977
// 0.1901322109907977
```

- We first create a subject and subscribe to that with Subscriber A. The Subject then emits its value and A will log that number.
- Subject emits next value, A will log this again.
- B starts subscribing to the subject. Since the subject is a `BehaviorSubject`, the new subscriber will automatically receive the last stored value and log this.
- The subject emits a new value again, not both subscribes will receive the values and log them.
- *Last: We log the current subject's value by accessing `.value` => synchronous.*
- Can create BS with a start value.

```
import * as Rx from "rxjs";

const subject = new Rx.BehaviorSubject(Math.random());

// subscriber 1
subject.subscribe((data) => {
    console.log('Subscriber A:', data);
});

// output
// Subscriber A: 0.24957144215097515
```

- `ReplaySubject` can send old values to new subscribers.
- `AsyncSubject` is a Subject variant where only the last value of the Observable execution is sent to its subscribers, and only when the execution completes.

# RxJS: Don’t Unsubscribe
[Reference](https://medium.com/@benlesh/rxjs-dont-unsubscribe-6753ed4fda87)

- Keeping too many subscription objects around is a sign that you're managing your subscriptions imperatively, and not taking advantage of the power of RxJS.

```
 onMount() {
   const data$ = this.getData();
   const cancelBtn = this.element.querySelector(‘.cancel-button’);
   const rangeSelector = this.element.querySelector(‘.rangeSelector’);
   const cancel$ = Observable.fromEvent(cancelBtn, 'click');
   const range$ = Observable.fromEvent(rangeSelector, 'change').map(e => e.target.value);

   const stop$ = Observable.merge(cancel$, range$.filter(x => x > 500))
   this.subscription = data$.takeUntil(stop$).subscribe(data => this.updateData(data));
 }
```

- Composed a stream of `stop$` events that kill the data stream. When we decide to add another condition to kill the data stream, just merge a new observable in.
- This also completes the observable. So you're actually wiring everything up by calling `subscribe` in one place.
- Very very little performance hit when compared to calling `unsubcribe` manually.
- Killing a stream in a more `Rx-y` way:
  - `take(N)`: Emits N values before stopping the observable.
  - `takeWhile(predicate)`: Test the emitted values against a predicate, if it returns `false`, it will complete.
  - `first()`: Emits the first value and completes.
  - `first(predicate)`: Checks each value vs a predicate function, if it returns `true`, emit that value and complete.
- Using `takeUntil`, `takeWhile` is: more composable, fires a completion event when you kill your stream, has less code, less to manage, and fewer actual points of subscription.

# Angular/RxJs When should I unsubscribe from `Subscription`
[Reference](https://stackoverflow.com/questions/38008334/angular-rxjs-when-should-i-unsubscribe-from-subscription/41177163#41177163)

# Using the `takeUntil` RxJS Operator to Manage Subscriptions Declaratively
[Reference](https://alligator.io/angular/takeuntil-rxjs-unsubscribe/)

- Angular takes care of unsubscribing from observables using `async` pipe.
- The `takeUntil` operator can be used to declaratively manage subscriptions.
- To unsubscribe declaratively, just use `takeUntil` and destroy the subscription on `ngOnDestroy`.
- This means no need to keep references to the subscriptions anymore.
- This will also complete the observable.
