# Angular docs
[Reference](https://angular.io/start)

- A component has three parts:
  - `product-alerts.component.ts`
  - `product-alerts.component.html`
  - `product-alerts.component.css`

```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-alerts',
  templateUrl: './product-alerts.component.html',
  styleUrls: ['./product-alerts.component.css'] # No split right?
})
export class ProductAlertsComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }
}
```

- `@Component` decorator indicates the class is a component.
- `selector` used to identify the component - templates, styles, selector. Convention: `app-{COMPONENT_NAME}`.
- Passing in from outside:
  - `import { Input } from '@angular/core';`
  - `@Input() product;`
- Output/`EventEmitter` - WTF IS THIS LOL

# Architecture overview
[Reference](https://angular.io/guide/architecture#architecture-overview)

- ngModule = compilation context for components. NgModules collect related code into functional sets; an Angular app is defined by a set of NgModules.
- ***An app always has at least a root module that enables bootstrapping, and has many more feature modules.***
- Components
  - Define views => screen elements that Angular can choose/modify according to your program logic and data.
  - Use services => Provide specific functionality not directly related to views.
  - Service providers can be injected into components as dependencies, making your code modular, reusable, and efficient.
- Decorators: Mark components/services as class types and provide metadata that tells Angular how to use them.
  - The metadata (`templateUrl?`) associates it with a template that defines a view.
  - Directives and binding markup: allows Angular to modify the HTML before rendering it for display.
  - Metadata is used to make it available to components through dependency injection.
- NgModules: ***Declares a compilation context for a set of components that is dedicated to an application domain, a workflow, or a closely related set of capabilities.***
  - Root module: `AppModule`, providing the bootstrap mechanism that launches the application.
  - NgModules can import functionality from other NgModules, and allow their own functionality to be exported and used by other NgModules. To use the router service, import the `Router` NgModule.
- Templates, directives:
  - Directives provide program logic, binding markup connects your application data and the DOM.
  -  Event binding: Update application data based on user input.
  - Property binding: Interpolate values that are computed from your application data into the HTML.
- Pipes: Like filters?
- Services
  - ***For data that isn't associated with a specific view.*** Preceded by the `@Injectable()` decorator. Dependency injection = they delegate such tasks to services.

# Introduction to services and dependency injection
[Reference](https://angular.io/guide/architecture-services)

- Service is a broad category encompassing any value, function, or feature that an app needs.
- Try to separate your component's view-related functionality from other kinds of processing to make your component classes lean and efficient.
- ***Ideally, a component's job is to enable the user experience and nothing more. A component should present properties and methods for data binding in order to mediate between the view and the application logic.***
- What to delegate to services:
  - Validating user input
  - Fetching data from the server
  - Logging directly to the console
- Make those tasks injectable, so you can make them available to any component.
- Example of a service that depends on `Logger` and `BackendService` to get heroes:

```
src/app/hero.service.ts (class)
content_copy
export class HeroService {
  private heroes: Hero[] = [];

  constructor(
    private backend: BackendService,
    private logger: Logger) { }

  getHeroes() {
    this.backend.getAll(Hero).then( (heroes: Hero[]) => {
      this.logger.log(`Fetched ${heroes.length} heroes.`);
      this.heroes.push(...heroes); // fill cache
    });
    return this.heroes;
  }
}
```

# Dependency injection

- Components consume services, that is you can inject a service into a component, giving the component access to that service class.
- Declaring `Injectable` decorator to indicate that a component has a dependency:
  - Angular creates an application-wide injector for you during the bootstrap process.
  - An injector creates dependencies and maintains a container of dependency instances that it reuses if possible. (So this is why they do the `@Injectable`, cause this is like a cache or something?)
  - Provider: an object that tells an injector how to obtain or create a dependency.
  - ***For any dependency that you need in your app, you must register a provider with the app's injector.***
  - So a dependency doesn't have to be a service - it could be a function or a value.
