# Stateful vs. Stateless Functional Components in React
[Reference](https://code.tutsplus.com/tutorials/stateful-vs-stateless-functional-components-in-react--cms-29541)

- Components are the self-sustaining/describe part of your UI.
- Component architecture allows us to think of each piece in isolation.
- React philosophy: props are dropped down.
- State: owned by the component where it is declared, and the scope is limited to the current component.

- Functional components: Just JS functions. They take in an optional input (props).
- ES6 (arrow functions) for defining components.
- `const Hello = ({ name }) => (<div>Hello, {name}!</div>);`

- Class components: Offer more features (state).
- Either the `React.createClass()` or extending `React.Component`.
- Best practice: using the constructor for all class components.
- `constructor(props) { super(props); }`

- Stateful vs stateless components
  - You can then use the state inside any class methods, including `render()`.
  - Just remember that to update state, you need to do `this.setState()` to avoid race conditions.
  - This is how you do it: `this.setState((prevState) => { count: prevState.count +1 });`
  - Stateless: unless you need to use a lifecycle hook in your components, you should go for stateless functional components.

- Container components vs Presentational components
  - Presentational: Just how the view or how things look. Reusable and should stay decoupled from the behavioral layer.
  - Use functional components first, unless a state is required. If a presentational component requires a state, it should only be concerned with the UI state, and not actual data.
  - Container components
    - Tells the presentational component what should be rendered using props.

- `PureComponent`
  - A component is pure if it is guaranteed to return the same result given the same props and state. Ex: functional component.
  - When the lifecycle method `shouldComponentUpdate` is called, instead of updating a component, it performs a shallow comparison, just the immediate contents are compared.
  - Used for performance.

# React Stateless Functional Components: Nine Wins You Might Have Overlooked
[Reference](https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc)

- Plain functions have less cruft.
- No `this` keyword.
- Stateless functional components are useful for dumb/presentational components. State should be managed by higher-level container components, or Flux/Redux.
- High signal to noise ratio.
- Easier to spot a bloated component.
- Performance?
- Downsides: You need to convert it to a class to use lifecycle methods, or want to optimize performance.
