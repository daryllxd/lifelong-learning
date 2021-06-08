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

# Angular Components - The Fundamentals
[Reference](https://blog.angular-university.io/introduction-to-angular-2-fundamentals-of-components-events-properties-and-actions/)

- Browser components like `select`: We don't need to be aware of its internal structure in order to be able to reason about the  component. We only need to know its public API.
- Angular component API:
  - Input property `options`, via which we provide a list of countries. Input model is passed into the component, then based on the model, the view will be built accordingly.
  - Events: the output that a component produces. They report to the outside world a relevant change of the component internal state.

```
<div class='color-me'>
    <h4>Type red, green, yellow, etc.</h4>
    <input type="text" #input (keyup) [value]="color">
    <div class='color-panel' [style.background]="input.value"></div>
</div>
```

- Local variable is defined using `#input`.
- Input property `value` of the input box is being filled in with the color name via `[value]="color"`.
  - Properties are not only a mechanism for passing data inside a component, they can be generally used to write to any valid DOM element property.
  - The color would be applied on `keyup` as there is `(keyup)` event.
- Background CSS property is bound to the value of the input box via `[style.background]="input.value"`.
- Properties should be avoided when passing constant string values to the component. Prefer `Attribute` annotation instead.

- How to NOT use properties:
  - Properties should be avoided when: passing constant string values to the component. Use `Attribute` annotation instead.
  - Properties (DOM) are different from attributes (HTML).

```
constructor() {
  document.getElementById('scroll-up').addEventListener('click',
      () => this.scroll -= 30 );
}
```

- This thing is the same as a `(click)` event on Angular.
- Events: With events, it's very easy to fall into the situation of using an event to trigger an action in an external component. The emitter should report about changes on its internal state.
- `Element.scrollTop`: Gets or sets the number of pixels that an element's content in scrolled vertically.
