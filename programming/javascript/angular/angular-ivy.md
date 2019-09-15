# What is Angular Ivy?
[Reference](https://blog.ninja-squad.com/2019/05/07/what-is-angular-ivy/)

- In Angular, when you write a component, you write the component in TS and its template in HTML, augmented by Angular template syntax. *This HTML will never touch the browser. It will be compiled by Angular into JS instructions, to create the appropriate DOM when the component appears on the page, and to update the component when its state changes.*
- Think about this as the React Fiber rewrite, which offered a more incremental rendering.
  - Better build times
  - Better build sizes/compatible with tree-shaking
  - Metaprogramming/higher order components, lazy loading of components instead of modules, a new change detection system not based on zone.js.
- Ideally, this should just be a switch to turn on for most projects.
- Angular pre-Ivy generates an `ng_factory`, a function defining a view definition with two parts: A static description of the DOM to generate, and a function called when the state of the component changed.
- Angular post-Ivy inlines the generated code in a static field. A `@Directive` decorator becomes a field called `ngDirectiveDef`, same with Injectable and Component.
- When we use an app with an Ivy-ready library, then we don't need to recompile the components of the library.
- Tree-shakeable: If you don't use a particular feature of Angular, the instructions corresponding to that feature won't be in your final bundle.
- Angular compiler option: `fullTemplateTypeCheck`.
- It is also backward-compatible with non-Ivy updated libraries. Angular built a compatibility compiler: takes the `node_modules` of our app, looks for Angular libraries and converts the JS code in those libraries to be Ivy-compatible.
