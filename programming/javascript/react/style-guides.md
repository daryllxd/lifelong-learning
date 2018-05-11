# Airbnb React/JSX Style Guide
[Reference](https://github.com/airbnb/javascript/tree/master/react)

- One React component per file, but multiple Stateless/Pure components are allowed.
- JSX syntax.
- Do not use `React.createElement` unless you're initializing the app from a file that is not JSX.

- Internal state: `React.createClass`.
- No state or refs, prefer normal functions.
- Do not use mixins.
- Filename: `PascalCase`.
- Alignment:

``` js
// good
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
/>
```

- TODO: Get back to this.
