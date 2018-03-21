# Typechecking With PropTypes
[Reference](https://reactjs.org/docs/typechecking-with-proptypes.html)

- You need to install it in `package.json`.
- `npm install --save prop-types`.

``` js
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```

# PropTypes in React.js
[Reference](https://developer.fortnox.se/blog/proptypes-in-react-js/)

- While the props in React can be of any type, if I'm using a component written by another developer, I have to figure out what props that component wants.
- Think of this as a type system, and there is a better error message.

``` js
propTypes: {
  size: React.PropTypes.number,
  position: React.PropTypes.string.isRequired,
  otherPosition: React.PropTypes.oneOf(['fixed', 'absolute']),
  email: function(props, propName, componentName) {
    if (!/emailRegex/.test(props[email])) {
      return new Error("Give me a real email");
    }
  },
  user: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    age: React.PropTypes.number
  }).isRequired
}
```

The error message:

```
Invalid prop `menuVisible` of type `string` supplied to `Header`, expected `boolean`. Check the render method of `App`.
```

# What is the importance of PropTypes in React?
[Reference](https://stackoverflow.com/questions/39677545/what-is-the-importance-of-proptypes-in-react)

- Advantages:
  - Validate the prop passed to a child and warn the dev when a wrong props is passed.
  - When a member of the team creates a component, you won't know what to do with that unless you see the `PropTypes`.
  - Not compulsory.
- You'll be writing extra code anyway with validators.
- Since states is not shared across components, and it is only passed down via props, you don't need to validate it.

# Why React PropTypes are important
[Reference](https://wecodetheweb.com/2015/06/02/why-react-proptypes-are-important/)

- The propTypes object kinds of defines the interface for using a component. Always put it near the top of your component. Define a prop in the propTypes before you write any code using the actual prop. This prevents you from forgetting and makes you more aware of the dependencies your component has to external data.
