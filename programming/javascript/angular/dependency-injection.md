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
