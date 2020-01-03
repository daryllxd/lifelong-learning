# Data Architecture in Angular

- To get data into your application: AJAX HTTP Requests, Websockets, IndexDB, LocalStorage, Service Workers.
- How can we aggregate all of these different sources into a coherent system?
- How can we avoid bugs caused by unintended side effects?
- How can we structure the code sensibly so that it's easier to maintain and onboard new team members?
- How can we make the app run as fast as possible when data changes?

- Model-View-Whatever: Angular 1's `$scope` provides a two-way data binding, the whole application shares the same data structures and a change in one area propagates to the rest of the app.
- Flux: Uses a unidirectional data flow. Stores hold data, Views render what's in the store, and Actions change thee data in the Store. There is a bit more ceremony to setup Flux, but the idea is that because data only flows in one direction, it's easier to reason about.
- Observables: Observables give us streams of data. We subscribe to the streams and then perform operations to react to changes. RxJS gives us powerful operators for composing operations on streams of data.

## Data Architecture with Observables

- Reactive Programming: A way to work with asynchronous streams of data.
