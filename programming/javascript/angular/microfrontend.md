# What to Expect from Angular 14 in 2022: Is Micro Frontend Coming?
[Reference](https://itnext.io/what-to-expect-from-angular-14-in-2022-is-micro-frontend-coming-7932566f773)

- Better typing re: `@angular/forms`.
- Independent components from module:
  - Module is not necessarily the smallest unit of re-use, which means you can't use directives, pipes, and components individually, outside the concept of the module.
  - So, components must always be dependent on Modules and be part of the module, and it can't be standalone.
  - `bootstrapModule()`.
  - Angular tooling is tightly dependent on Modules during optimising the build performance.
- Micro front-end, why it is cool, and why Angular is perfect for it.
  - Module federation - lets you have multiple separated builds in a single application.

# How Micro Frontend changes the Future of Angular?
[Reference](https://itnext.io/how-micro-frontend-changes-the-future-of-angular-bb4deb2cfdad)

- Individual components or pages are hosted in separated domains and integrated in the main shell app.
- Micro-frontend as a page - we dedicate a separate page per each of the micro-app.
- Way to share data between micro-frontends:
  -  Make sure the app doesn't have data store state.
  - `localStorage`, `sessionStorage`, cookies, indexed DB, or router query params.
- Why Angular?
  - workspace
  - Project - micro-app per client.
  - Libraries - Good for sharing the reusable data between projects.
