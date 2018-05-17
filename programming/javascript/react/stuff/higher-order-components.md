# A gentle Introduction to React's Higher Order Components
[Reference](https://www.robinwieruch.de/gentle-introduction-higher-order-components/)

- Edge cases for `TodoList` components and its items: If null, if empty. Conditional renderings. Loading indicators if the thing is in a pending request.

``` jsx
function withTodosNull(Component) {
  return function (props) {
    return !props.todos
      ? null
      : <Component { ...props } />
  }
}
```

- Conditional rendering via the ternary operator, and props are passed using the JS spread operator.
- Loading indicator: We destructure the props, since the input component is not interested in the `isLoadingTodos` anyway.

``` js
const withLoadingIndicator = (Component) => ({ isLoadingTodos, ...others }) =>
  isLoadingTodos
    ? <div><p>Loading todos ...</p></div>
    : <Component { ...others } />
```

- Multiple HOCs:

``` js
const TodoListWithConditionalRendering = withLoadingIndicator(withTodosNull(withTodosEmpty(TodoList)));
```

## Recompose

``` js
import { compose } from 'recompose';

const withConditionalRenderings = compose(
  withLoadingIndicator,
  withTodosNull,
  withTodosEmpty
);
```

- `withCondition` HOC: enables you to re-use it everywhere for a conditional rendering that returns the input component or nothing.

``` js
const withCondition = (Component, conditionalRenderingFn) => (props) =>
  conditionalRenderingFn(props)
    ? null
    : <Component { ...props } />

const conditionFn = (props) => !props.todos;

const TodoListWithCondition = withCondition(TodoList, conditionFn);
```

- Currying to make it one-parameter only:

``` js
const withCondition = (conditionalRenderingFn) => (Component) => (props) =>
    conditionalRenderingFn(props)
        ? null
        : <Component { ...props } />

const withConditionalRenderings = compose(
    withLoadingIndicator,
    withCondition(conditionFn),
    withTodosEmpty
);

const TodoListWithConditionalRendering = withConditionalRenderings(TodoList);
```

# Use a Render Prop
[Reference](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)

- Higher-order components/HOCs: alternative technique for code reuse. Code is shared using a similar technique to decorators; you start with the component that defines the bulk of the markup, then wrap it in more components that contain the behavior you'd like to share.
- The problem with HOC: indirection (Where did the thing come from?) and naming collisions (Which React doesn't warn us about.).
- HOCs introduce a lot of ceremony due to the fact that they wrap components and create new ones instead of being mixed in to existing components. The component returned from the HOC needs to act as similarly as it can to the component that it wraps.
- ***Render prop: A function prop that a component uses to know what to render.***
- TODO: Find other examples?

# Mixins Are Dead. Long Live Composition
[Reference](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750)

- Utility functions: Use mixins.
- The problems with mixins:
  - The contract between a component and its mixins are implicit: mixins often rely on certain methods being defined on the component, but there is not way to see that from the component's definition.
  - As you use more mixins in a single component, they begin to clash. If you use something like `StoreMixin` and you add another `StoreMixin`, React throws an exception.
  - It tends to add more state to your component whereas you should strive for less.
- Mixins complicate performance optimizations. ???

``` js
function connectToStores(Component, stores, getStateFromStores) {
  const StoreConnection = React.createClass({
    getInitialState() {
      return getStateFromStores(this.props);
    },
    componentDidMount() {
      stores.forEach(store =>
        store.addChangeListener(this.handleStoresChanged)
      );
    },
    componentWillUnmount() {
      stores.forEach(store =>
        store.removeChangeListener(this.handleStoresChanged)
      );
    },
    handleStoresChanged() {
      if (this.isMounted()) {
        this.setState(getStateFromStores(this.props));
      }
    },
    render() {
      return <Component {...this.props} {...this.state} />;
    }
  });
  return StoreConnection;
};
```

- The wrappings looks like this:

``` js
var ProfilePage = React.createClass({
  propTypes: {
    userId: PropTypes.number.isRequired,
    user: PropTypes.object // note that user is now a prop
  },

  render() {
    var { user } = this.props; // get user from props
    return <div>{user ? user.name : 'Loading'}</div>;
  }
});

// Now wrap ProfilePage using a higher-order component:

ProfilePage = connectToStores(ProfilePage, [UserStore], props => ({
  user: UserStore.get(props.userId)
});
```
