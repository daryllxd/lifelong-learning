# `props vs state`
[Reference](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md)

- Props and state are plain JS objects.
- Props and state changes trigger a render update.
- Both props and state are deterministic. The component should render just one thing if both props and state are rendered.

- Does this go inside props or state?
  - **If a Component needs to alter one of its attributes at some point in time, that attribute should be part of its state, otherwise it should just be a prop for that Component.**
  - `props`: a components' configuration. They are received from above and are immutable as far as the Component receiving them is concerned.
  - `state`: starts with a default value when a Component mounts, and then suffers form mutations in time (from user events), it's a serializable representation of one point in time, a snapshot.
  - A component manages its own state internally, but besides setting an initial state, has no business fiddling with the state of its children. You could say the state is private.

## Component types:

- **Stateless component.** Only props, no state.
- **Stateful component.** Both props and state. State managers, they are in charge of client-server communication, processing data and responding to user events.

## ReactJS: Props vs. State

- What does `props` even mean?
  - Props can have default ones: `Welcome.defaultProps`.
  - Consider them to be immutable.
- State:
  - Created in the component via the `constructor` method.
  - Changeable, but only use `setState`. This updates the state object and re-renders the component automagically.
  - Do not do this: `this.state.count = this.state.count + 1`.
  - Also, do not use this: `this.SetState({count: this.state.count + 1})`.
  - Do this: `this.setState((prevState, props) => { return { count: prevState.count + 1 }); }`.
  -
