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
