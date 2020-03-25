# The Ahead-of-Time (AOT) compiler
[Reference](https://angular.io/guide/aot-compiler)

- An Angular application mainly consists of components and their HTML templates.
- The Angular AOT compiler converts your Angular HTML and TS code into efficient JS code during the build phase *before* the browser downloads and runs that code. This provides a faster rendering in the browser.
- Why?
  - Faster rendering: the app is pre-compiled.
  - Fewer asynchronous requests: the compiler inlines external HTML templates and CSS stylesheets within the application Javascript, eliminating separate Ajax requests for those source files.
  - No need to download Angular compiler if the app is already compiled, and the compiler is roughly half of Angular itself.
  - Detect template errors earlier.
  - Better security: the HTML templates and components are compiled into JS files long before they are served to the client. With no templates to read from, there are fewer opportunities for injection attacks.
- How AOT works:
  - The Angular AOT compiler extracts metadata to interpret the parts of the application that Angular is supposed to manage.
  - You can specify the metadata explicitly in decorators such as `@Component()` and `@Input()`, or implicitly in the constructor declarations of the decorated classes. The metadata tells Angular how to construct instances of your application classes and interact with them at runtime.
- Phases of AOT compilation:
  - Code analysis: Create a representation of the source: the collector does not attempt to interpret the metadata it collects, it represents the metadata as best it can and records errors when it detects a metadata syntax violation.
  - Code generation: the compiler's `StaticReflector` interprets the metadata collected in phase 1, performs additional validation of the metadata, and throws an error if it detected a metadata restriction violation.
  - Template type checking: In this phase, the Angular template compiler uses the TS compiler to validate the binding expressions in templates.
