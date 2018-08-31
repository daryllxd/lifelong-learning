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

## Passing Properties to a Component
