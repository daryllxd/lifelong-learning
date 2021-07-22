# Attribute, class, and style bindings
[Reference](https://angular.io/guide/attribute-binding)

- It is recommended that you set an element property with a property binding whenever possible.
  - Property binding = `[style]`, `[src]`.
  - Attribute binding = `[attr.aria-label]`. When the expression resolves to `null` or `undefined`, Angular removes the attribute altogether.
- Binding to `class` attribute.
  - Single class binding: `[class.sale]="onSale"`.
  - Multi-class binding: `[class]="classExpression"`. Strings, record of string, array of string.
- Binding to `style` attribute.
  - Use prefix `style` followed by a dot and the name of the CSS style property. Can also add a unit extension like `em` or `%`.
  - Multiple styles = either string or object.
  - Can do something like `[style.width.px]="width"`.
  - `NgStyle` sucks? Functionally it's the same as `[style]`? So what do we use.
- Styling precedence: Template bindings, directive host bindings, and component host bindings.

- ***Remember, use @Input() when you want to keep track of the attribute value and update the associated property. Use @Attribute() when you want to inject the value of an HTML attribute to a component or directive constructor.***

# Getting to Know the @Attribute Decorator in Angular
[Reference](https://netbasal.com/getting-to-know-the-attribute-decorator-in-angular-4f7c9fb61243)

- Attribute is more fixed/lesser change detection cycle.

# Angular Bad Practices: Revisited
[Reference](https://medium.com/angular-in-depth/angular-bad-practices-revisited-4f607fcb75da)

- We pipe


# When to use an attribute selector for Angular components
[Reference](https://medium.com/javascript-everyday/when-to-use-an-attribute-selector-for-angular-components-7e788ba1bfe7)

https://angular.io/guide/property-binding

# Angular ngIf: Complete Guide
[Reference](https://blog.angular-university.io/angular-ngif/)


# Template variables
[Reference](https://angular.io/guide/template-reference-variables)

Render Props
[Reference](https://medium.com/angular-in-depth/templaterefs-are-angulars-render-props-a2b97cbcc362)
[Reference](https://medium.com/javascript-everyday/react-render-props-in-angular-world-4b57cd93e29b)
[Reference](https://www.uxpin.com/studio/blog/react-design-patterns/)
