# Advanced Components

- View encapsulation: By default, Angular styles are encapsulated by the component context by default.
- Encapsulation properties:
  - Emulated: Default option, encapsulates styles using what we have.
  - Native: Angular will use the Shadow DOM.
  - None: Angular won't encapsulate the styles at all, allowing them to leak to other elements on the page.
- By using the Shadow DOM, the component uses a unique DOM tree that is hidden from other elements on the page.

- Host Elements:
  - We attach behaviors to an element or a component by using a directive.
  - Components are directives and components always have a view. Directives may or may not have a view.
- If w want to learn more about the host element a directive is bound to, we can use the built-in `ElementRef` class. This holds information about a given Angular element, including the native DOM element using the `nativeElement` property.
- To see the elements our directive is binding to, we can do this:

```
@Directive({
  selector: '[popup]'
});

export class PopupDirective {
  constructor(_elementRef: ElementRef) {
    console.log(_elementRef);
  }
}
```

- `HostListener` decorator allows a directive to listen to events on its host element.

# Angular Architecture - Smart Components vs Presentational Components
[Reference](https://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why/)

- Structuring application
  - What types of components are there?
  - How should components interact?
  - Should I inject services into any component?
  - How do I make my components reusable across views?
- Example, a table can have `lessons` input, which means that it might be a list of all lessons available, lessons might be a list of all the lessons, or could be lessons that were searched for.
- Smart component - components that would be hard to reuse in another application.
- Smart component injects data to the presentation component via `@Input`, and received any actions that the presentation component might trigger via `@Output`.
  - Dumb component only knows it emitted an event.
  - Smart component only knows that an event was triggered, doesn't know what triggered the event.
- Custom events don't bubble up.
- Organisation/readability are enough reasons to create a component even if it's only used in one place.
- The best approach to get a great set of well-designed components is by continuous refactoring, which can be done without burden by using the Angular CLI.
- Smart vs Presentation Components is a useful distinction.
  - Would this presentation logic be useful elsewhere in the application?
  - Would it be useful to split things up further?
  - Are we creating unintended tight coupling in the application?

# Angular Architecture - Container vs Presentational Components Common Design Pitfalls
[Reference](https://blog.angular-university.io/angular-component-design-how-to-avoid-custom-event-bubbling-and-extraneous-properties-in-the-local-component-tree/)

- Container vs presentational
  - Container: Know how to retrieved data from the service layer.
  - Presentational: Components take data as input and know how to display to the screen, and can emit custom events.
- One important thing: the lessons$ observable is being subscribed two times. In this case, it would not pose a problem because the observable coming from the service layer is designed to prevent multiple requests to the backend, for example using `publishLast().refCount().`.
- Design issue: Extraneous properties in intermediate components. It looks like we are passing inputs like `firstName` over the local component tree, but the intermediate components are not using the inputs.
- Design issue: subscribe event is repeated multiple times.
- Fix: Make the component that forces unnecessary double passing down an input a smart component.

- Are smart components able to receive Input, too?

`this.userService.user$.subscribe(user => this.firstName = user.firstName );` => this one doesn't work with change detection.
`this.firstName$ = this.userService.user$.map(user =>  user.firstName );` => this one works with change detection.
