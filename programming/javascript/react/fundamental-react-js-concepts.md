# All the fundamental React.js concepts, jammed into this single Medium article
[Reference](https://medium.freecodecamp.org/all-the-fundamental-react-js-concepts-jammed-into-this-single-medium-article-c83f9b53eac2)

- React is about components. You define small components and put them together to form bigger components.
  - The simplest form is a plain-old JavaScript function.
  - Component name starts with a capital letter. Lowercase: HTML elements.

``` jsx
function Button (props) {
  // Returns a DOM element here. For example:
  return <button type="submit">{props.label}</button>;
}
// To render the Button component to the browser
ReactDOM.render(<Button label="Save" />, mountNode)
```

``` jsx
function Button (props) {
  return React.createElement(
    "button",
    { type: "submit" },
    props.label
  );
}
// To use Button, you would do something like
ReactDOM.render(
  React.createElement(Button, { label: "Save" }),
  mountNode
);
```

- React's `createElement` function is a higher-level function that can do what `document.createElement` does.

``` jsx
# `createElement` creates a tree.
# First argument, either html or ReactComponent
# Second argument, markup for attributes or props. Null or empty if no attrs/props are needed for the element.
# Third argument, list of children for the created element.
# We use classname instead of class
const InputForm = React.createElement(
  "form",
  { target: "_blank", action: "https://google.com/search" },
  React.createElement("div", null, "Enter input and click Search"),
  React.createElement("input", { name: "q", className: "input" }),
  React.createElement(Button, { label: "Search" })
);
```

``` jsx
const InputForm =
  <form target="_blank" action="https://google.com/search">
    <div>Enter input and click Search</div>
    <input name="q" className="input" />
    <Button label="Search" />
  </form>;
// InputForm "still" uses the Button component, so we need that too.
// Either JSX or normal form would do
function Button (props) {
  // Returns a DOM element here. For example:
  return <button type="submit">{props.label}</button>;
}
// Then we can use InputForm directly with .render
ReactDOM.render(InputForm, mountNode);
```

```
# The const is still not HTML.
# The thing that looks like HTML is still JS.
# This compiles to the example above.
const InputForm =
  <form target="_blank" action="https://google.com/search">
    <div>Enter input and click Search</div>
    <input name="q" className="input" />
    <Button label="Search" />
  </form>;
// InputForm "still" uses the Button component, so we need that too.
// Either JSX or normal form would do
function Button (props) {
  // Returns a DOM element here. For example:
  return <button type="submit">{props.label}</button>;
}
// Then we can use InputForm directly with .render
ReactDOM.render(InputForm, mountNode);
```

### Fundamental #3: You can use JS expressions anywhere in JSX.

- Only expressions. Can't use `if` statements inside.

```
// Only display ErrorDisplay if there is an errorMessage string passed to it and an empty div.
const MaybeError = ({errorMessage}) =>
  <div>
    {errorMessage && <ErrorDisplay message={errorMessage} />}
  </div>;

// The MaybeError component uses the ErrorDisplay component:
const ErrorDisplay = ({message}) =>
  <div style={ { color: 'red', backgroundColor: 'yellow' } }>
    {message}
  </div>;
// Now we can use the MaybeError component:
ReactDOM.render(
  <MaybeError
    errorMessage={Math.random() > 0.5 ? 'Not good' : ''}
  />,
  mountNode
);
```

### Fundamental #4: You can write React components with JavaScript classes

```
// These are the same
// Define a class that extends React.Component, and define a single instance function, render(), and that render function returns the virtual DOM element.
class Button extends React.Component {
  render() {
    return <button>{this.props.label}</button>;
  }
}

function Button (props) {
  // Returns a DOM element here. For example:
  return <button type="submit">{props.label}</button>;
}

---

// Customizing a component instance
class Button extends React.Component {
  constructor(props) {
    super(props);
    this.id = Date.now();
  }
  render() {
    return <button id={this.id}>{this.props.label}</button>;
  }
}
// Use it
ReactDOM.render(<Button label="Save" />, mountNode);

// Using class properties

// Written using class-field syntax.
// You still need to use a compiler like Babel configured to understand this.
// clickCounter also implemented using the same class-field syntax.
// We pass in the reference of the function, not the actual function.
class Button extends React.Component {

  clickCounter = 0;

  handleClick = () => {
    console.log(`Clicked: ${++this.clickCounter}`);
  };

  render() {
    return (
      <button id={this.id} onClick={this.handleClick}>
        {this.props.label}
      </button>
    );
  }
}

```

### Fundamental #5: Events in React: Two Important Differences

```
// React element attributes are named with camelCase.
// Actual JS function handler
```

### Fundamental #6: Every React component has a story

- The life cycle:
  - We define a template for React to create elements from the component.
  - Then, we instruct React to use it somewhere. For example, inside a `render` call of another component, or with `ReactDOM.render`.
  - Then, instantiate and give the element a set of `props` that we can access with `this.props`.
  - Since it's all JS, the constructor method will be called.
  - Compute the output of the render method.
  - Since this is the first time React is rendering the element, React will communicate with the browser to display the element there. This is called mounting.
  - React then invokes `componentDidMount` to do something on the DOM that we now know exists in the browser.
  - Some component stories end here. Other components get unmounted from the browser DOM for various reasons. Before an unmount happens, it invokes `componentWillUnmount`.
  - The state of any mounted element might change, and the parent of that element might re-render. In either case, the mounted element might receive a different set of props. This is when you actually need react.

### Fundamental #7: React components can have a private state

```
class CounterButton extends React.Component {

  // The special state field is initialized with an object that holds a clickCounter that starts with 0, and a currentTimestamp that starts with new Date().
  state = {
    clickCounter: 0,
    currentTimestamp: new Date(),
  };

  // Modifies the component instance using special method setState.
  // References the previous state with the lambda?
  // Impt: setState merges what you pass with the existing state.
  handleClick = () => {
    this.setState((prevState) => {
     return { clickCounter: prevState.clickCounter + 1 };
    });
  };

  // Modifies the state on an Interval basis. Started inside componentDidMount.
  // We're writing to the satate, not reading it.
  componentDidMount() {
   setInterval(() => {
     this.setState({ currentTimestamp: new Date() })
    }, 1000);
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click</button>
        <p>Clicked: {this.state.clickCounter}</p>
        <p>Time: {this.state.currentTimestamp.toLocaleString()}</p>
      </div>
    );
  }
}
// Use it
ReactDOM.render(<CounterButton />, mountNode);
```

### Fundamental #8: React will react

- React gets its name from the fact that it reacts to state changes.
- Changes when the component gets updated gets reflected in the browser DOM if needed.
- The render function's input are:
  - The props that get passed by the parent.
  - The internal private state that can be updated anytime.
  - When the input of the render function changes, its output might change.

### Fundamental #9: React is your agent

- Instead of us manually going to the browser and invoking DOM API operations to find and update the element every second, changing a property on the state of the component allows React to communicate with the browser and change it also.

### Fundamental #10: Every React component has a story (part 2)

- A component might need to re-render when its state gets updated or when its parent decides to change the props that it passed to the component.
- If the latter happens, React invokes `componentWillReceiveProps`.
- If either the state object, or the passed-in props are changed, React asks: should the component be updated in the DOM? We invoke `shouldComponentUpdate` here. This is an actual question, so if you need to customize or optimize the render process on your own, you have to answer that question by returning either true or false.
- If no `shouldComponentUpdate`, `componentWillUpdate` is invoked. Compute the new rendered output and compare it with the last rendered output.
- If the rendered output is exactly the same, React does nothing.
- If there is a difference, React takes that differences to the browser.
- Final lifecycle method is invoked (`componentDidUpdate`).

# Yes, React is taking over front-end development. The question is why.
[Reference](https://medium.freecodecamp.org/yes-react-is-taking-over-front-end-development-the-question-is-why-40837af8ab76)

- React gives developers the ability to work with a virtual browser that is more friendly than the real browser.
- React enables developers to declaratively describe their User Interfaces and model the state of those interfaces. Developers just describe the interfaces in terms of a final state, like a function.
- Just like JS, there is a very small API to learn, just a few functions and how to use them.
- Virtual DOM/reconciliation algorithm.
- React is used to describe Web User Interfaces. Describe, because we just tell what we want and React will build the actual user interfaces, on our behalf, in the Web browser.
- Reusable, composable, and stateful components. We can think of components as simple functions. Their inputs are props and state, and a component out put is a description of a User interface.
- Reactive updates. No need to worry about how to reflect these changes, or even manage when to take changes to the browser. React will simply react to the state changes and automatically update the DOM when needed.
- The virtual DOM: Used to render an HTML first, and every time a state changes, we get a new HTML tree. React just writes the difference between the old and the new tree (called Tree Reconciliation).
