# Understanding React — Component life-cycle
[Reference](https://medium.com/@baphemot/understanding-reactjs-component-life-cycle-823a640b3e8d)

- `constructor`
  - ***Calling `super(props)` allows us to initialize ourselves, and so we can only have access to `this.prop` after we've initially called `super`.***
  - Do: Set any fields, or initialize state based on props received.
    - Prepare all class fields and bind functions that will be passed as callbacks.
  - Don't: Cause any side effects.
- `componentWillMount`
  - Called on the server, and `componentWillMount` will be called on the client.
  - Do:
    - Update state via `this.setState`.
    - Perform last minute optimization.
    - Cause side-effects, but only in case of server-side rendering.
  - Don't:
    - cause any side effects on the client side.
- `componentWillReceiveProps(nextProps)`
  - Ideal if you have a component whose parts of state are depending on props passed from the parent component as calling `this.setState` here will not cause an extra render call.
  - Do: to sync state to props.
  - Don't: cause any side effects.

```
componentWillReceiveProps(nextProps) {
  if(nextProps.myProp !== this.props.myProps) {
    // nextProps.myProp has a different value than our current prop
    // so we can perform some calculations based on the new value
  }
}
```

- `shouldComponentUpdate`
  - By default, all class-based Components will re-render themselves whenever the props their receive, or their state or context changes. If re-rendering the component is computation heavy, it is not recommended to update.
  - Do: To increase performance of components.
  - Don't To cause side effects.

- `componentWillUpdate`
  - Used to perform state and props sync.

- `componentDidUpdate`
  - Called after `render` is finished in each of the re-render cycles. This means you can be sure that the component and all its sub-components have properly rendered itself.
  - For side effects like AJAX calls.

- `componentDidCatch`
  - It can react to events happening in the child component.

- `componentDidMount`
  - This means that this component, as well as its sub-components, are rendered properly.
  - This is the perfect candidate for performing any side-effect causing operations such as AJAX requests.

- `componentWillUnmount`
  - Do cleanups like removing timers, listeners created in lifespan.

- Cycles:
  - Creation:
    - `constructor()`
    - `componentWillMount()`
    - `render()`
    - Create all direct-child components.
    - `componentDidMount()`
  - Re-rendering due to re-rendering of the parent component
    - `componentWillReceiveProps()`
    - `shouldComponentUpdate`
      - If false, do not re-render
    - `componentWillUpdate()`
    - `render()`
    - Send new props to all direct child components
    - `componentDidUpdate()`
  - Re-rendering due to internal change
    - `shouldComponentUpdate`
      - If false, do not re-render
    - `componentWillUpdate()`
    - `render()`
    - Send new props to all direct child components
    - `componentDidUpdate()`
  - Re-rendering due to `this.forceUpdate`
    - `componentWillUpdate()`
    - `render()`
    - Send new props to all direct child components
    - `componentDidUpdate()`.
  - Re-rendering due to catching an error = ?
