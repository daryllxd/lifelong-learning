# Angular 2 Component Constructor Vs OnInit [duplicate]
[Reference](https://stackoverflow.com/questions/35845554/angular-2-component-constructor-vs-oninit)

- Constructor is predefined default method of the TS class.
- No relation between ng and `constructor`.
- ***Normally we use `constructor` to define/initialise some variables, but when we have tasks related to Angular's bindings, we move to Angular's `ngOnInit` hook.***
- `constructor()`, `ngOnChanges`, `ngOnInit()`.
- The "good practice":
  `export class BlablaComponent implements OnInit {`
  - Implement this interface to execute custom initialization logic after your directive's data-bound properties have been initialized.
- `ngOnInit` is called right after the directive's data-bound properties have been checked for the first time, and before any of its children have been checked. It is invoked only once when the directive is instantiated.
- ***So you should use constructor() to setup Dependency Injection and not much else. `ngOnInit()` is better place to "start" - it's where/when components' bindings are resolved.***
- Must use `ngOnInit()`: If you're going to be doing any manipulation of the component's DOM, the native elements will not be available during the constructor phase.

```
export class App implements OnInit, AfterViewInit, AfterContentInit {
  @Input() myInput: string;
  @ViewChild() myTemplate: TemplateRef<any>;
  @ContentChild(ChildComponent) myComponent: ChildComponent;

  constructor(private elementRef: ElementRef) {
     // this.elementRef.nativeElement is undefined here
     // this.myInput is undefined here
     // this.myTemplate is undefined here
     // this.myComponent is undefine here
  }

  ngOnInit() {
     // this.elementRef.nativeElement can be used from here on
     // value of this.myInput is passed from parent scope
     // this.myTemplate and this.myComponent are still undefined
  }
  ngAfterContentInit() {
     // this.myComponent now gets projected in and can be accessed
     // this.myTemplate is still undefined
  }

  ngAfterViewInit() {
     // this.myTemplate can be used now as well
  }
}
```

- Antipatterns on the constructor
  - A lot of code in constructor makes the method hard to extend, read, and test.
  - Pattern:

```
class Some {
  constructor() {
    this.init();
  }

  init() {...}
}
```
- The primary role of class constructors in Angular is dependency injection. Constructors are also used for DI annotation in TypeScript. Almost all dependencies are assigned as properties to class instance.
- ***Average component/directive constructor is already big enough because it can have multiline signature due to dependencies, putting unnecessary intialization logic to constructor body contributes to the antipattern.***
- Asynchronous initialisation constructor can be a smell because *class instantiation can finish before asynchronous routine does, and this can create race conditions.*
- Easier to unit test (not called automatically on component compilation in unit tests, so you can mock it.)
- Inheritance: child classes can choose whether `super.ngOnInit()` is called and when.

# Angular — Understanding Angular lifecycle hooks with a Sample Project
[Reference](https://medium.com/bb-tutorials-and-thoughts/angular-understanding-angular-lifecycle-hooks-with-a-sample-project-375a61882478)

- `ngOnInit()`: Occurs only one time. Use case: when getting data from API, initialising 3rd party JS library.
- `ngOnChanges()`: Occurs every time there is a change in the Input.
  - Implement `OnChanges` and take in a `SimpleChanges` Object as an input parameter. This checks both `currentValue` and `previousValue`.
  - When something changes in the `@Input` data property, we can do more changes in this method by comparing previous and current values.
- `ngDoCheck()`: Occurs every time a change detection happens and manually triggers this.
  - When something gets updated from the `@Input`, and you have to update an internal property.
- `ngOnDestroy`: Used to unsubscribe all operations and detach event handlers to avoid memory leaks.
  - RXJS `takeUntil` operator: Allows subscribing until the certain condition meets true.
- `ngAfterViewInit()`: Called once view and all other child views are loaded.
- `ngAfterViewChecked()`: Called once after `ngAfterViewInit` and every time after `ngDoCheck`.
- `ngAfterContentInit()`: After content inside `ng-content` is projected.
- `ngAfterContentChecked()`: Called after external content is projected into component's view.
