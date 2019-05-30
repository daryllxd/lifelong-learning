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

