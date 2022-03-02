# Pros and Cons of Using Monorepos
[Reference](https://fossa.com/blog/pros-cons-using-monorepos/)

- Pros: Better visibility and collaboration, simplified dependency management, code refactoring.
- Cons: Build pipelines, version control, limiting access control, vulnerability checking.

# Nx - Workspace Structure
[Reference](https://nx.dev/structure/applications-and-libraries)

- Each Nx library has a "public API", represented by `index.ts` barrel file.
- 80% of logic in libs, 20% in apps.
- Moving code into libraries can be done from a pure code organization perspective. Ease of re-use might emerge as a positive side effect of refactoring code into libraries by applying "API thinking".
- Should I make a new library?
  - The more granular your libraries are, the more effective `nx affected` and Nx's computation cache will be.
  - `nx graph` shows it.
  - Enforcing constraints.
- Should I add? Related code should be together, and also if we are prototyping, we should just code fast.
- Library types:
  - Feature libraries - UI logic, form validation code, app-specific, often lazily-loaded. Depend on data access and UI.
  - UI libraries - contains only presentational components. Depend on UI and util libraries.
  - Data access libraries - interacting with back-end system. Depend on data-access and util libraries.
  - Utility libraries . Depend only on util libraries. Collection of utilities or pure functions.
- Grouping libraries
  - `@nrwl/angular:move` generator.
  - `@nx g remove booking-some-library`.

- Example workspace

```
apps/
  booking/
  check-in/
libs/
  booking/                 <---- grouping folder
    feature-shell/         <---- library

  check-in/
    feature-shell/

  shared/                  <---- grouping folder
    data-access/           <---- library

    seatmap/               <---- grouping folder
      data-access/         <---- library
      feature-seatmap/     <---- library
```

- Sharing libraries
  - More visibility into code that can be reused across many different applications.
- Publishable and buildable libraries - they exist.

# 12 Things to Help Large Organizations Do Angular Right
[Reference](https://blog.nrwl.io/12-things-to-help-large-organizations-do-angular-right-f261a798ad6b)

- Large and small organizations
  - Care about consistency.
  - Need to write robust, error-proof code.
  - They need to write maintainable, self-documenting code.
  - They want to be able to make changes with confidence.
- At scale
  - 10 devs can reach a consensus on best practices by chatting over lunch, 500 devs cannot. Need best practices, team standards, and tools to promote them.
  - Code ownership concepts become more important as the code size and complexity scales. Need to define and automate the ownership model.
- At some point, the CI process has to take care of "what parts of the project need to check why it changed".

## Angular is a Good Framework for Large Organizations

- No fragmentation - CLI, Angular router, most use NgRx - consistency.
- Semantic version.
- Angular and typescript.
- Automation.

## How to Do It

- Apps
- App-specific libs
- Reusable libs
- Third-party libs and tools
- **The ease with which developers can do all of these has a big impact on your teams’ velocity and your projects’ code quality.
If it takes a day to create a new reusable library (create a repo, set up CI, publish it to a local npm registry), few will do it.** As a result, developers will either duplicate the code or put it in a place where it does not belong.

## Best Practices

- Reusable libraries - even 30 lines, to 50 lines if need.
- Schematics for code generation.
- Lint checks.
- Automate everything using formatters.

## Architect Checklist

- Standard tools - CLI, Nx, NgRx, RxJS, other things.
- Define a process for creating/extracting a new library.
- Define a process for verifying a code change to a reusable lib does not break any apps and libs that depend on it.
- Define a process for refactoring multiple apps and libs.
- Define a process for assigning and checking ownership. Without a good ownership model in place a chaos will ensue.
- Define an explicit policy of managing third-party dependencies.
- Define state management and side effect management best practices. (What's in state, effect, etc.) Automate as much as possible.
- Define testing best practices. Automate as much as possible.
- Create an organization-specific `tslint` package from the get go. It’s a great way to promote best practices.
- Create an organization-specific schematics package from the get go. It’s a great way to promote best practices.
- Automate everything that can be automated (e.g., set up automatic formatting).
