# Blogged Answers: A (Mostly) Complete Guide to React Rendering Behavior
[Reference](https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/#memoize-everything)

- During the rendering process, React starts at the root of the component tree and then loops downwards to find all components that have been flagged as needing updates.
  - If a component needs update, then it will call `FunctionComponent(props)` and save the render output for th next steps of the render pass.
- Then it collects all the outputs (virtual DOM), check this against the current DOM, and make the real DOM look like the desired output (reconciliation).

## Render and Commit Phases

- Render -> All the work of rendering components and calculating changes.
- Commit -> Applying the changes to the DOM.
- After you update the DOM in the commit phase, update all refs and then runs `componentDidMount` and `useLayoutEffect`.
- `useTransition` - the ability to pause the work in the rendering phase.

## How Does React Handle Renders?

- How to queue a re-render? `setState` and `useReducer`.
- Or, `useReducer` that increments a counter.
- **When a parent component renders, React will recursively render all child components inside of it!**
  - In normal rendering, React does not care whether "props changed", it will render child components unconditionally just because the parent rendered!
  - This means that calling `setState()` in your root <App> component, with no other changes altering the behavior, will cause React to re-render every single component in the component tree. After all, one of the original sales pitches for React was "act like we're redrawing the entire app on every update".
  - Now, it's very likely that most of the components in the tree will return the exact same render output as last time, and therefore React won't need to make any changes to the DOM. But, React will still have to do the work of asking components to render themselves and diffing the render output. Both of those take time and effort.

## Rules of React Rendering

- No side effects.
- Render logic must not:
  - Mutate existing variables and objects
  - Can't create random values
  - Can't make network requests
  - Can't queue state updates
- React logic may:
  - Mutate objects that were newly created while rendering
  - Throw errors
  - "Lazy initialize" data that hasn't been created yet, such as a cached value

## What is a Fiber

- React stores an internal data structure that tracks all the current component instances in the application.
- The core piece of this data structure is called a "fiber".

```
export type Fiber = {
  // Tag identifying the type of fiber.
  tag: WorkTag;

  // Unique identifier of this child.
  key: null | string;

  // The resolved function/class/ associated with this fiber.
  type: any;

  // Singly Linked List Tree Structure.
  child: Fiber | null;
  sibling: Fiber | null;
  index: number;

  // Input is the data coming into this fiber (arguments/props)
  pendingProps: any;
  memoizedProps: any; // The props used to create the output.

  // A queue of state updates and callbacks.
  updateQueue: Array<State | StateUpdaters>;

  // The state used to create the output
  memoizedState: any;

  // Dependencies (contexts, events) for this fiber, if any
  dependencies: Dependencies | null;
};
```

- These store the real component props and state values.
- React hooks work because React stores all of the hooks for a component as a linked list attached to that component's fiber object.

## Component Types and Reconciliation

- How does React know when the output of a component changed?
  - If different element (div vs span).
  - The `key` pseudo-prop. (props.key will always be undefined).
  - Use keys not with numerical indices, but with IDs. [Explanation](https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/#rules-of-react-rendering:~:text=Here%27s%20an%20example,list%20items%20changed.)


## Render Batching and Timing

- Each call to `setState` cause React to start a new render pass, execute it synchronously, and return.
  - Render also applies a sort of optimisation automatically - render batching.
  - Render batching is when multiple calls to `setState()` result in a single render pass being queued and executed.
- Async rendering, closures, state snapshots.
- This is not going to work:

```
function MyComponent() {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter(counter + 1);
    // ❌ THIS WON'T WORK!
    console.log(counter);
    // Original value was logged - why is this not updated yet??????
  };
}
```

- This arrow function is a closure which means it only sees the values of variables as they existed when the function was defined.
- Since `handleClick` was defined during the most recent render of this function component, it can only see the value of counter as it existed during that render pass. When we call `setCounter()`, **it queues up a future render pass, and that future render will have a new counter variable with the new value and a new `handleClick` function... but this copy of `handleClick` will never be able to see that new value.**

## Improving Rendering Performance

- `React.memo()` - a built-in "higher-order component" type.
  - Check if the props have changed, if not, prevent a re-render.
- Preventing an element from re-rendering:

``` jsx
function OptimizedParent() {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  const memoizedElement = useMemo(() => {
    // This element stays the same reference if counter 2 is updated,
    // so it won't re-render unless counter 1 changes
    return <ExpensiveChildComponent />;
  }, [counter1]);

  return (
    <div>
      <button onClick={() => setCounter1(counter1 + 1)}>
        Counter 1: {counter1}
      </button>
      <button onClick={() => setCounter1(counter2 + 1)}>
        Counter 2: {counter2}
      </button>
      {memoizedElement}
    </div>
  );
}
```

- Everything in and including `ExpensiveChildComponent` would re-render only if `counter1` changes.

## How New Props References Affect Render Optimizations

```
const MemoizedChildComponent = React.memo(ChildComponent);

function ParentComponent() {
  const onClick = () => {
    console.log('Button clicked');
  };

  const data = { a: 1, b: 2 };

  return <MemoizedChildComponent onClick={onClick} data={data} />;
}
```

- If `ParentComponent` re-renders, even though NOTHING CHANGED, `MemoizedChildComponent` will still re-render, because
  - The callback function will be a different function.
- What you need to do here is to do `useCallback` for the `onClick` and `useMemo`.
- You also really only need to add `useCallback` and `useMemo` if you are passing the stuff down to the child.

## Context and Rendering Behavior

- **Context is not a "state management" tool. You have to manage the values that are passed into context yourself. This is typically done by keeping data in React component state, and constructing context values based on that data.**
- Updating context values
- **By default, any state update to a parent component that renders a context provider will cause all of its descendants to re-render anyway, regardless of whether they read the context value or not!**

## Future React Improvements

- Context selectors!

# Summary

- React always recursively renders components by default, so when a parent renders, its children will render
- Rendering by itself is fine - it's how React knows what DOM changes are needed
- But, rendering takes time, and "wasted renders" where the UI output didn't change can add up
- It's okay to pass down new references like callback functions and objects most of the time
- APIs like React.memo() can skip unnecessary renders if props haven't changed
- But if you always pass new references down as props, React.memo() can never skip a render, so you may need to memoize those values
- Context makes values accessible to any deeply nested component that is interested
- Context providers compare their value by reference to know if it's changed
- A new context values does force all nested consumers to re-render
- But, many times the child would have re-rendered anyway due to the normal parent->child render cascade process
- So you probably want to wrap the child of a context provider in React.memo(), or use {props.children}, so that the whole tree doesn't render all the time when you update the context value
- When a child component is rendered based on a new context value, React keeps cascading renders down from there too
- React-Redux uses subscriptions to the Redux store to check for updates, instead of passing store state values by context
- Those subscriptions run on every Redux store update, so they need to be as fast as possible
- React-Redux does a lot of work to ensure that only components whose data changed are forced to re-render
- connect acts like React.memo(), so having lots of connected components can minimize the total number of components that render at a time
- `useSelector` is a hook, so it can't stop renders caused by parent components. An app that only has `useSelector` everywhere should probably add React.memo() to some components to help avoid renders from cascading all the time.
- The "React Forget" auto-memoizing compiler may drastically simplify all this if it does get released.
