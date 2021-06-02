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

# Introduction to services and dependency injection
[Reference](https://angular.io/guide/architecture-services#introduction-to-services-and-dependency-injection)

- Ideally, a component's job is to enable the user experience and nothing more. A component should present properties and methods for data binding, in order to mediate between the view (rendered by the template) and the application logic (which often includes some notion of a model).
- ***A component can delegate certain tasks to services, such as fetching data from the server, validating user input, or logging directly to the console.*** By defining such processing tasks in an injectable service class, you make those tasks available to any component. You can also make your app more adaptable by injecting different providers of the same kind of service, as appropriate in different circumstances.

## DI

- To define a class as a service in Angular, use the @Injectable() decorator to provide the metadata that allows Angular to inject it into a component as a dependency.
- The injector is the main mechanism. Angular creates an application-wide injector for you during the bootstrap process, and additional injectors as needed. You don't have to create injectors.
- *An injector creates dependencies, and maintains a container of dependency instances that it reuses if possible.*
- A provider is an object that tells an injector how to obtain or create a dependency.
- ***For any dependency that you need in your app, you must register a provider with the app's injector, so that the injector can use the provider to create new instances.***
- `constructor(private service: HeroService) { }`
  - Does the injector have existing instances of that service? If it doesn't, make one, add to the injector, and then return the service to Angular.
- Providing services:
  - Your must register at least on provider of any service you are going to use.
  - This can be part of the services' own metadata, or you can register providers with specific modules or components.
  - ***When you do `providedIn: root`, Angular creates a single, shared instance of `HeroService` and injects it into any class that asks for it. Registering the provider in the `Injectable()` metadata allows Angular to optimise an app by removing the service from the compiled app if it isn't used (tree-shaking).***
  - ***When you register a provider with a specific NgModule, the SAME INSTANCE OF A SERVICE is available to all components in that NgModule.***
    - Do this: `@NgModule({providers: [BackendService, Logger]})`.
  - ***When you register a provider at the component level, you get a new instance of the service with each new instance of that component.***
    - Do this: `@Component{ providers: [HeroService]}`.

# Hierarchical injectors
[Reference](https://angular.io/guide/hierarchical-dependency-injection#hierarchical-injectors)

- `ModuleInjector`: Using `NgModule()` or `Injectable()` annotation.
  - `@Injectable providedIn` is preferable  to the `NgModule()` providers array because with `Injectable`, can tree-shake/remove services that your app isn't using and results in smaller bundle sizes.
- `ElementInjector`: Created implicitly at each DOM element.
- `ModuleInjector` can be reached by following the `NgModule.imports` recursively. Child `ModuleInjector`s are created when lazy loading other `NgModules`.

## `PlatformInjector`

- `platformBrowserDynamic` creates an injector configured by a `PlatformModule`, which contains platform-specific dependencies.
- `NullInjector` - top of the tree, this gets an error unless you use an `Optional`.
- While the name root is a special alias, other `ModuleInjectors` don't have aliases. You have the option to create `ModuleInjectors` whenever a dynamically loaded component is created, such as with the Router, which will create child `ModuleInjectors`.
- If you configure an app-wide provider in the `@NgModule()` of `AppModule`, it overrides one configured for root in the @Injectable() metadata. You can do this to configure a non-default provider of a service that is shared with multiple apps.
  - This is how our setting services work?
- A component is a special type of directive, which means that directives as well as components can provider providers using the `providers` property.
- Resolution rules: When a component declares a dependency , Angular will try to satisfy it first with its own `ElementInjector`. If the component's injector lacks the provider, it passes the request up to the parent component's `ElementInjector`.
- Resolution modifiers:
  - `@Optional`: What to do if Angular doesn't find what you're looking for - `@Optional()`.
  - `@SkipSelf`: Where to start looking?
  - `@Host()` and `@Self()` - where to stop looking?

## Providing Services in a `@Component()`

- Provider vs View Provider; `https://stackblitz.com/angular/jdmbognrnby?file=src%2Fapp%2Fchild%2Fchild.component.ts`.
- Technically can swap out a part of a service inside a component with `providers: []` in the component, but thinking about what's the use case.

## Modifying Service Visibility

- `@SkipSelf()`: Look for the `FlowerService` at the `app-root` injector, then go up to the DI chain.

## `ElementInjector` use case examples

- Service isolation: If you provide a service in component metadata and nowhere else, the service becomes available only in that component and its sub-component tree. Now, that service is a singleton with respect to that component.
- Multiple edit sessions/having the service do the computations:
  - This opens up the possibility of having the service just do everything, and having the component get its information via getter and setter from the service.
  - But that means that each component has its own computation.
- Specialised providers.

# Dependency providers
[Reference](https://angular.io/guide/dependency-injection-providers)

- When you configure an injector with a provider, you are associating that provider with a dependency injection token, or DI token. The injector allows Angular create a map of any internal dependencies. The DI token acts as a key to that map.
- This is what happens in the normal syntax: `[{ provide: Logger, useClass: Logger }]`
  - `useClass` is what we use for mock services and overriding setting services.
  - `useExisting`: Alias shit.
  - `useExisting` with `forwardRef` is used in our CVA implementations.
- Injecting an object: can with `useValue`.
- Injecting a configuration object: To provide and inject the configuration object, can specify in the `@NgModule()` providers array.
- Using an `InjectionToken` object:
  - `import { InjectionToken } from '@angular/core';`
  - `export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');`
  - The optional type parameter, `<AppConfig>`, and the token description, app.config, specify the token's purpose.
  - Though the TypeScript `AppConfig` interface supports typing within the class, the `AppConfig` interface plays no role in dependency injection. In TypeScript, an interface is a design-time artifact, and doesn't have a runtime representation, or token, that the DI framework can use.
  - When the transpiler changes TypeScript to JavaScript, the interface disappears because JavaScript doesn't have interfaces.
  - Since there is no interface for Angular to find at runtime, the interface cannot be a token, nor can you inject it.
- Using factory providers:
  - To create a changeable, dependent value based on information unavailable before run time, you can use a factory provider.

[Reference](https://angular.io/guide/dependency-injection-providers)
[Reference](https://angular.io/api/core/InjectionToken)
[Reference](https://angular.io/guide/dependency-injection-in-action)
[Reference](https://stackoverflow.com/questions/37867503/what-are-providers-in-angular2?rq=1)
[Reference](https://medium.com/frontend-coach/self-or-optional-host-the-visual-guide-to-angular-di-decorators-73fbbb5c8658)
[Reference](https://medium.com/slackernoon/when-to-use-angulars-forroot-method-400094a0ebb7)
[Reference](https://angular.io/guide/lightweight-injection-tokens)


# `@Optional`

```
class Engine {}

@Injectable()
class Car {
  constructor(@Optional() public engine: Engine) {}
}

const injector =
    Injector.create({providers: [{provide: Car, deps: [[new Optional(), Engine]]}]});
expect(injector.get(Car).engine).toBeNull();
```


- What services should be the only ones that are in root?
  -



- So - `LoyaltyProgramApiService` should just be in TC module itself? What if it's used in both TC and RC (ex: `CurrencyConversionsApiService`.
- `CartItemApiService` should not be provided in root, but in `NgModule` and then GC imports it?
- When would we need `ElementInjector`? Feels like I never see when this would be used. Unless this is like a utility class-type of service?
- Moving out of setting services - so:
  - A setting service would do Angular things, but not be overridden.
  - A setting service would have a `TenantGcConfiguration` injected in, and THAT is overridden. And those are all primitives.
- `PlatformInjector` - when to use?
- `NullInjector` and `Optional` - when to use?
- `Host`, `Self`, `SkipSelf` - when to use?
- What the fuck does this mean? While the name root is a special alias, other `ModuleInjectors` don't have aliases. You have the option to create `ModuleInjectors` whenever a dynamically loaded component is created, such as with the Router, which will create child `ModuleInjectors`.
- Can `PaymentGatewayService` be `Optional` then, so it's not loaded if it doesn't actually exist i.e. WLs with no payment?
- What is `viewProviders`? - This just means some swapping can be done when content projected.
- Technically can swap out a part of a service inside a component with `providers: []` in the component, but thinking about what's the use case.
- Back to `GiftCardApiService`: Do we want to scope this to GC module or elements itself? (`https://angular.io/guide/hierarchical-dependency-injection#elementinjector-use-case-examples`)
- Still have to read `InjectionToken` more but is this how the setting service token would be.
