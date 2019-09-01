# Angular — A Comprehensive guide to unit-testing with Angular and Best Practices
[Reference](https://medium.com/bb-tutorials-and-thoughts/angular-a-comprehensive-guide-to-unit-testing-with-angular-and-best-practices-e1f9ef752e4e)

- `TestBed`: A dynamically constructed test module which emulates an Angular `NgModule`. The metadata that goes into `TestBed.configureTestingModule()` and `@NgModule` are pretty similar, and this is where we actually configure the spec file.
- `compileComponents()` method: This is async because we read these files from the file system before we even create a component, and this is asynchronous (why it's placed inside an async function).
- This is also why we have two `beforeEach` functions, one to asynchronously get everything, and one that is run after the first block which is when we create the actual specs.
- `NO_ERRORS_SCHEMA`: Causes us to just ignore the non-recognized elements in the test.
- Best practices:
  - Testing services: spy from jasmine.
  - When subscribing to observables, have both success and failure callbacks.
  - When testing components with service dependencies, use mock services instead of real services.
  - Access components with `debugElement`, not `nativeElement` as that is an abstraction for the underlying runtime environment.
  - `By.css` instead of `queryselector` if running the app on the server: because `queryselector` works only in the browser.
  - `fixture.detectChanges()` vs `ComponentFixtureAutoDetect`.
  - `compileComponents()` if running the tests in the non-CLI environment.
  - `PageObject` model for reusable functions across components.
  - Can use component stubs instead of `NO_ERRORS_SCHEMA` to interact with both components if necessary.
