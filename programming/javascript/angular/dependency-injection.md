# Dependency Injection in Angular
[Reference](https://angular.io/guide/dependency-injection)

- DI is a coding pattern in which a class asks for dependencies from external sources rather than creating them itself.
- **In Angular, the DI framework provides declared dependencies to a class when that class is instantiated.**
- If combining a component and service in the same file, it is important to define the service first, and then the component.
  - But, you can define the component first with the help of `forwardRef`.
- `Injectable` decorator marks the class we created as a service that can be created, but Angular can't actually inject it anywhere until you configure an Angular DI with a provider of that service.
- The injector is responsible for creating service instances and injecting them into classes.
  - Angular creates injectors for you as it executes the app, starting with the root injector that it creates during the bootstrap process.
- Provider: tells an injector how to create a service.
  - This can be the service class itself, so that the injector can use `new` to create an instance.
  - Injectors are inherited. So a component can get services from its own injector, from the injectors of its component ancestors, from the injector of its parent `NgModule`, or from the root injector.
- Configuring with providers = setting a metadata value at one of three places: `Injectable`, `NgModule`, `Component`.
  - `providedIn` metadata option: you can look for the injector of a specific `NgModule`?
- Services are singletons within the scope of an injector. *There is at most one instance of a service in a given injector.*
- Nested injectors can create their own service instances.
- Services that need other services: Injectable decorator is required for all services.
- ***When Angular creates a class whose constructor has parameters, it looks for type and injection metadata about those parameters so that it can inject the correct service.*** If Angular can't find that parameter information, it throws an error. Angular can only find the parameter information if the class has a decorator of some kind.
- DI Token: When you configure an injector with a provider, you associate that provider with a DI token. The injector maintains an internal token-provider map that it references when asked for a dependency.
- Optional dependency: `@Optional` annotation.

# Dependency Injection - `ng-book`

- To access dependencies, can `import` a file.
- Can substitute out the implementation of `B` for `MockB` during testing.
- Share a single instance of the B class across the app (Singleton pattern).
- Create a new instance of the B class every time it is used (Factory pattern).
- DI - think about "the injector" as a replacement for the `new` operator.
- DI - the client component doesn't need to be aware of how to create the dependencies, but it just needs to know how to interact with those dependencies.
- Angular's DI system: Instead of directly importing and creating new instances of a class, instead we will:
  - Register the "dependency" with Angular.
  - Describe *how* the dependency will be injected.
  - Inject the dependency.
- DI Parts
  - To register a dependency, we have to bind it to something that will identify that dependency.
  - *The provider:* Maps a token (string or class) to a list of dependencies. Tells Angular how to create an object, given a token.
  - *The injector:* Holds a set of bindings and is responsible for resolving dependencies and injecting them when creating objects.
  - *The dependency:* The one being injected.
- Using the injector manually:

```
export class UserDemoInjectorComponent {
  constructor() {
    // Create an _injector_ and ask for it to resolve and create a UserService
    const injector: any = ReflectiveInjector.resolveAndCreate([UserService]);

    // Use the injector to get the instance of the UserService
    this.userService = injector.get(UserService);
  }
}
```

- The `ReflectiveInjector` is a concrete implementation of `Injector` that uses reflection to look up the proper parameter types.
- `NgModule`:
  - What we'd normally do would be to use `NgModule` to register what we'll inject.
  - Use decorators to specify what we're injecting.
 - To be injectable as a singleton, add it to the providers key of `NgModule`:

```
@NgModule({
  imports: [CommonModule],
  providers: [UserService],
  declarations: []
})
export class UserDemoModule {
}
```

- Because Angular is managing the instance, we don't have to worry about doing it ourselves. Every class that injects the `UserService` will receive the same singleton.
- *When we put the `UserService` on the constructor, Angular knows what to inject because we listed `UserService` in the providers key of our `NgModule`. It does not inject arbitrary classes. You must configure an `NgModule` for DI to work.*
- To resolve injected dependencies in Angular, we can:
  - Inject a (singleton) instance of a class.
  - Inject a value.
  - Call any function and inject the return value of that function.
- When we do `providers: [UserService]`, it is actually shorthand for `providers: [{ provide: UserService, useClass: UserService }]`.
- `provide` is the token that we use to identify the injection, and the second `useClass` is how and what to inject.
- The token and the injected thing aren't required to have the same name.
- We can also use a value:
  - `providers: [{ provide: 'API_URL', useValue: 'http://....' }]`.
- Injecting with a string:

```
export class AnalyticsDemoComponent {
  constructor(@Inject("API_URL") apiUrl: string) {
    // Can now do something with this.apiUrl
  }
}
```

- Configurable Services
  - Ex: `AnalyticsService` should define the interface for recording events, but not the implementation for handling the event.
  - If we want to record metrics, we can create an `interface` for a `Metric` and an interface for an `Implementation`:

```
export interface Metric {
  eventName: string;
  scope: string;
}

let metric: Metric = {
  eventName: "loggedIn",
  scope: "nate"
}

export interface AnalyticsImplementation {
  recordEvent(metric: Metric): void;
}

export class AnalyticsService {
  constructor(private implementation: AnalyticsImplementation) {
  }

  record(metric: Metric): void {
    this.implementation.recordEvent(metric);
  }
}
```

- We can't use regular `useClass` injection mechanism, we have to configure the provider to use a factory.
- To use our `AnalyticsService`, we need to create an implementation that conforms to `AnalyticsImplementation`, and add it to `providers` with `useFactory`.

```
@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: AnalyticsService, // the token is the class
      useFactory() {
        const loggingImplementation = ...

        return new AnalyticsService(loggingImplementation);
      }
  ]
});
```

- Using a factory is the most powerful way to create injectables, because we can do whatever we want within the factory function - and sometime the factory function will have dependencies of it's own. If we wanted to configure `AnalyticsImplementation` to make an HTTP request, we can do this:

```
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    { provide: "API_URL", useValue: "http://devserver.com" },
    {
      provide: AnalyticsService, // the token is the class
      deps: [HttpClient, "API_URL"],
      useFactory() {
        const loggingImplementation = ...

        // Use HTTP here

        return new AnalyticsService(loggingImplementation);
      }
  ]
});
```

- `deps` is an array of injection tokens and these tokens will be resolved and passed as arguments to the factory function.

## Dependency Injection in Apps

- Create the dependency. This is called the `Injectable` because it is the thing that our components will receive via the injection.
- Configure the injection (register it with Angular in our `NgModule`) - A provider provides the injectable that you want. In Angular, when you want to access an injectable, you inject a dependency into a function and Angular's dependency into a function (often a constructor) and Angular's dependency injection framework will locate it and provide it to you.
- Declare the dependencies on the receiving component.
