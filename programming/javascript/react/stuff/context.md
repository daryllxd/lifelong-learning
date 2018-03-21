# Context in ReactJS Applications
[Reference](https://javascriptplayground.com/context-in-reactjs-applications/)

- You should use this very rarely in your own React components. However, if you're writing a library of components, it can come in useful.
- If a child component wants to communicate back to its parent, it can do so through props, most commonly by its parent providing a callback property that the child can call when some event happens:

```
const ParentComponent = () => {
  const letMeKnowAboutSomeThing = () => console.log('something happened!');

  // Pass the reference to the prop
  return <ChildComponent letMeKnowAboutSomeThing={letMeKnowAboutSomeThing} />;
};

const ChildComponent = props => {
  const onClick = e => {
    e.preventDefault();

    // The child calls the parent which was referenced from the prop
    props.letMeKnowAboutSomeThing();
  };

  return <a onClick={onClick}>Click me!</a>;
};
```

- The communication is explicit. Looking at the code above, you know how the components are communicating, where the `letMeKnowAboutSomeThing` function comes from, who calls it, and which two components are in communication.
- **React is very explicit as a rule, and this leads to clearer code that's much easier to maintain and debug when something goes wrong.**
- If you need to pass things from a gigantic `ParentComponent` down to a deeply nested `ChildComponent`, you can use context.

## Why You Should Use It

- Hard to find the source.
- You essentially bind components to a specific parent. You need to then have a parent that supplies context, not any random parent.
- Harder to test.
- Unclear semantics around context value changes and re-renders.

## When To Use

- `ReactRouter`, because they allow the components to talk to each other. Same with `React Redux`.
- Router example:

``` jsx
const { Component, PropTypes } = React;

class Router extends Component {
  getChildContext() {
    const router = {
      register(url) {
        console.log('registered route!', url);
      },
    };
    return { router: router };
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}
Router.childContextTypes = {
  router: PropTypes.object.isRequired,
};

class Route extends Component {
  componentWillMount() {
    this.context.router.register(this.props.path);
  }
  render() {
    return <p>I am the route for {this.props.path}</p>;
  }
}

Route.contextTypes = {
  router: PropTypes.object.isRequired,
};
```

- The contract with Router and Route is that they should be required. Then, Route can use Router='s methods with `this.context.router`.
