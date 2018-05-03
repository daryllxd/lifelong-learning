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
