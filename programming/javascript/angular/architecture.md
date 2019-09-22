# Angular: Recurring problems I face as a Front-End Consultant
[Reference](https://medium.com/@michelestieven/angular-recurring-problems-i-face-as-a-front-end-consultant-d2a9c1826a3a)

- If someone else can't understand your code, it's a problem. Even if you say you "understand it", you're probably just lying to yourself. Can you look at you wrote weeks before, and say that you understand it?
- Right directories and modules.
- These are not tricks:
  - `users.filter(user => !! user.admin);`
  - `const { name, surname } = user;`
  - `const username = user.name || 'John';`
  - `const username = (user && user.info && user.info.name) || 'John'`
- A presentational component:
  - *Takes Inputs and emits Outputs, nothing else.* May have inner state, as long as it has an output that tells the parent about the change. At least it's manageable from the outside and it can also work on its own.
  -It should not have dependencies from other modules.
  - It should not modify `Input` data directly. (Btw, can include `ng-store-freeze` to ensure nothing like that works.) If you need to modify the `Input` data, clone it.
  - Do not use models from other modules just because they share the same shape.
  - `ChangDetectionStrategy.OnPush` and `ngOnChanges`. If you need derived data, apply getters/setters on your inputs or use the `ngOnChanges`.
- Container: The component which hosts all the presentational components of that "view" or route: it's the only one which should use services to get/update data, the one which should use the Redux store, dispatch actions, and which should pass its inner state (or slices) to the child components.
  - *All the child components are presentational and should not even know where the data has come from or what the consequences of their Outputs will be.*
  - Delegate some responsibilities to a service: If the `InvoiceComponent` does a lot of calculations, create an `InvocieService` that will handle complex operations, transformations, etc.
  - Containers shouldn't make assumptions. The Effect should be the one to decide what to do next, based on the rest of the app's state (app state includes what route we are in.
- Components with duplicated logic:
  - Use directives, which are components without a template. These are components without a template. Instead, they can inject the template of the component they're applied to. Don't make a `CardComponentWithModal`, just create a directive which listens for clicks on the host element and apply it to specific components.
  - Content projection, `ContentChildren`.
- Huge forms:
  - `ControlValueAccessor` to create sub-forms. This is just an interface that we can implement in our components to make them act as valid `FormControls`. It helps keep the form state united and it works with template-driven and reactive forms.
  - Your sub-forms become reusable, and they are components, and you can validate them from the outside or from the inside implementing the Validator interface.
  - The form state is in one single place.
- RxJS:
  - Flattening operations (`mergeMap`, `switchMap`, `concatMap`, and `exhaustMap`) and see how they suit different scenarios.
  - Combining multiple streams (`combineLatest`, `withLatestFrom`, `forkJoin`, `merge`, `race`).
  - Managing subscriptions and how to filter streams (`unsubscribe`, `filter`, `take`, `takeWhile`, `takeUntil`).
  - `Subject`, `ReplaySubject`, `BehaviorSubject`, `AsyncSubject`.

# Designing scalable Angular applications
[Reference](https://medium.com/@OlegVaraksin/designing-scalable-angular-applications-6629b5158277)

- Main design recommendation: an additional layer between component and service classes. It is normally called "Abstraction" or "Facade" layer.
  - UI components stay lightweight because dependencies like `async` or state management are not injected into the UI components.
  - UI components and the entire application become better testable. We can more easily mock the application's parts.
  - Better separation of concerns. Components don't need to know who provides the data and where they save the data.
  - Software artifacts in separate layers can be developed in isolation.
- Redux gives us:
  - Centralised application's state/single source of truth.
  - Immutable application's state which allows us to boost performance of Angular apps by using `OnPush`.
  - Truly debuggable applications because you can always reproduce the past state (time-travel debugging).
  - Unidirectional data flow.
- Weaknesses in container components:
  - Real-time GUIs, where back-end services push data to the front-end.
  - In GUIs with Canvas/WebGL, they don't have HTML markup for every graphic element. Only a canvas tag is present in the DOM. So, only one component's template would exist for the entire thing.
- Improved scalable architecture:
  - Group the code horizontally by software layer: view, facade, and service. Every layer has its own responsibility.
  - Group the code vertically by software layer: feature modules.
  - Service => facade => view layer. Dispatching state management goes into the opposite direction: view => facade => service layer.
  - Stuff like workflow steps reside in facades (smart facade), needed when you have bidirectional communication and the data in real-time.
  - View layers of separate modules should not depend on each other. The view layer of one feature module should not have dependencies from the view part of another feature module.
- Example: Having the facade be the one to actually dispatch the events to the service layer, and subscribe to something in the `MessagingService`.
