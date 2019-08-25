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
