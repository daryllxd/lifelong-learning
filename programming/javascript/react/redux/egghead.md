## Redux
[Reference](https://egghead.io/lessons/react-redux-the-single-immutable-state-tree)

- Everything in your application, both in the data and the UI state, which we call the state, or the state tree.
- The straight tree is read-only. You need to dispatch an action to change it. The action is the minimal representation of the change of the data.
  - Things to change: type which is a string. What do we need to describe these change?
  - Adding or removing a counter: just "INCREMENT."
  - Adjusting a counter: You need to have an index to know which counter in addition to "`ADD_COUNTER`"/.
- Pure vs Impure functions.
  - Pure: no observable side effects, such as network or database calls.
- State mutations in your app need to be described that takes in the previous state and the action being dispatched and returns the next state of your application.
  - There is one function that does this. You must not modify the state that is given to it. Even in large apps, there is a big function that calculates the state. Changing a part of the state should not change other parts of the state which don't need it. **This function is called the reducer.**
- Things get easier to test in Redux I think, because of the pure functions?
- Defining the initial state?
   - The convention is that if you receive a state of `undefined`, it returns the state of the application.

``` js
function counter(state, action) {
  if (typeof state === 'undefined') {
    return 0;
  }
}
```

``` js
// Cleaner

const counter = (state = 0, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
```

``` js
const createStore = Redux;

const store = createStore(counter);
```

``` js
// Communicating from child to parent
class ParentComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  getChildContext() {
    return { foo: 'bar' };
  }

  swaggy = () =>  {
    this.setState( (prevState) => {
      return { count: prevState.count + 1 }
    })
    console.log(this.state.count);
  }

  render () {
    return <ChildComponent letMeKnowAboutSomeThing={this.swaggy} />;
  }
};

ParentComponent.childContextTypes = {
  foo: PropTypes.string,
}

const ChildComponent = (props, context) => {
  const onClick = e => {
    e.preventDefault();
    props.letMeKnowAboutSomeThing();
  };

  return <a onClick={onClick}>Click me!</a>;
};
```
