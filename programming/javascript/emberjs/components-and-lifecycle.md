# Components
[Reference](https://guides.emberjs.com/release/components/defining-a-component/)

- Components are two parts: JS that defines behavior, and Handlebars template that defines the markup for the component's UI.
- Each component is backed by an element under the hood. Ember will use a `div` element to contain your component's template.
- Dynamically rendering a component: `{{component}}`. So you can render foo or bar depending on the `componentName`.

``` js
{{#each model as |post|}}
  {{!-- either foo-component or bar-component --}}
  {{component post.componentName post=post}}
{{/each}}
```

## Lifecycle

- A component allows direct DOM manipulation, listening and responding to browser events, and using 3rd party JS libraries in your Ember app.
- As they are rendered, re-rendered, and finally removed, Ember provides lifecycle hooks that allow you to run code at specific times.
- On initial render: `init()`, `didReceiveAttrs()`, `willRender()`, `didInsertElement()`, `didRender()`.
- On re-render: `didUpdateAttrs()`, `didReceiveAttrs()`, `willUpdate()`, `willRender()`, `didUpdate()`, `didRender()`.

- `didUpdateAttrs()`: Runs when attrs have changed, but not when the component is re-rendered. This is an effective alternative to an observer, as it will run prior to a re-render, but after an attribute has changed.
  - You can use this in a profile editor so that when you change a user attribute, you can use `didUpdateAttrs()` to clear any error state built up from editing the previous user.

- `didReceiveAttrs()`: Called every time a component's attributes are updated, whether on render or re-render, so you can use the hook to act as an observer. (???)

- `didInsertElement()`: By the time `didInsertElement()` is called, the component's element has been both created and inserted into the DOM, and the component's element is accessible via the component's `$()` method. So you can do this (access the component element):

```
export default Component.extend({
  didInsertElement() {
    this._super(...arguments);
    this.$('input.date').myDatePickerLib(); #
  }
});
```

- This is a place where you can attach event listeners for handling custom events or other browser events which do not have a built-in event handler.

- `willDestroyElement()`: When a component detects that it's time to remove itself from the DOM, Ember will trigger `willDestroyElement()`, allowing for any teardown logic to be performed.


- When do you initiate a re-render internally?
- use cases of `willDestroyElement()`

