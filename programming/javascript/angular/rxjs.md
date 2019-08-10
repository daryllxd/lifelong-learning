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
