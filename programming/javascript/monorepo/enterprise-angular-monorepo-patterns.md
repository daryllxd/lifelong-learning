# Enterprise Angular Monorepo Patterns

- Scope - logical grouping.
-  Type - `ui`, `data-access`, `feature`.
- `scope:shared,type:feature,platform:desktop`.
- **Don't organize by file type. When organising by file type, we need to traverse the folder tree multiple times to locate the needed files.**
- Feature lib:
  - `RouterModule.forChild` - `forRoot` is for apps only.
  - UI module: `CommonUiButtonsModule`.
  - Data access libraries: `CustomersDataAccessModule`.
- Utility libraries: `util`.
- Sharing libraries:
  - One of the main advantages of using a monorepo is that there is more visibility into code that can be reused across many different applications.
- Note on using libraries:
  - The `src/index.ts` is the barrel file - the public API to interact with the library and to ensure that any constants, enums, classes, and functions are all in this barrel file.
  - Relative paths vs using the workspace Alias:
  - **Components and classes contained within a library should be imported with relative paths only. Referring to them with the workspace-relative paths lead to linting errors.**
- CLI options: `--lazy`, `--directory`, `--routing`, `--parent-module`, `--publishable`.

## Constraints

- A lib cannot depend on an app.
- A project cannot have circular dependencies.
- A project that lazy loads another project cannot import it directly.

## Workplace Schematics

- These can run against the files and directories and can add, modify, copy, move or remove as needed.

## Development Challenges in a Monorepo

- How can they communicate the changes to the check-in team to ensure that nothing is broken?
- Reduce CI time?
- What branches should we maintain?

- Minimise code changes
  - Disallow plain merges.
  - Ensure that PRs are very small in scope.
  - Use feature toggles.
  - Be aware of changes to shared code.

- Angular console

## Appendix C: How-tos

- Where to put libs?
  - Attempt to make libs as generic as possible to be able to be put in a new shared library.
  - If cannot be generic, create a new app-specific library in a new grouping folder under shared.
- Domain-agnostic libs: `shared-data-access`.
- Domain-specific libs: `libraries.
- Reuse or create a feature library?
  - Most feature libraries are app-specific.
- Custom MaterialModule.
