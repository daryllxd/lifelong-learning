# When to use useCallback, useMemo and useEffect?
[Reference](https://stackoverflow.com/questions/56910036/when-to-use-usecallback-usememo-and-useeffect)

- `useEffect` - Alternative for `componentDidMount`, `componentWillUnmount`, `componentDidUpdate`.
- `useCallback` - on every render, everything inside a functional component will run again - if a child component has a dependency on a function from the parent component, the child will re-render every time the parent re-renders, even if that function "doesn't change".


# Understanding useMemo and useCallback
[Reference](https://www.joshwcomeau.com/react/usememo-and-usecallback/)

- `useMemo` - save a value between renders.

## Use case for `useMemo`: heavy computations.

- When a state variable changes, the entire component will re-render. An expensive computation needs to be cached between re-renders, so use `useMemo` there.
- As JS has just one main thread, we're keeping it super busy by running the code over and over again.
- `useMemo` will take in a function + a list of dependencies.
- During mount, when this component is rendered for the very first time, React will invoke this function to run all of this logic, calculating all of the primes.
  - For every subsequent render, however, React has a choice to make. Should it:
    - Invoke the function again, to re-calculate the value, or
    - Re-use the data it already has, from the last time it did this work.
  - **`useMemo` is essentially like a lil’ cache, and the dependencies are the cache invalidation strategy.**
- We can minimise `useMemo` use like this:

```
<>
  <Clock />
  <PrimeCalculator />
</>
```

- You can memoize an entire component, too.

```
function PrimeCalculator() {
}
export default React.memo(PrimeCalculator);
```

## Use case 2: Preserved references

```
const boxes = [
  { flex: boxWidth, background: 'hsl(345deg 100% 50%)' },
  { flex: 3, background: 'hsl(260deg 100% 40%)' },
  { flex: 1, background: 'hsl(50deg 100% 60%)' },
];

return (
  <>
    <Boxes boxes={boxes} />
    ... can change name here
```

- If another state changes, React will re-render the primary component, and will re-render the `boxes` array, and even though it's the same value, the REFERENCE will change, causing `Boxes` to re-render.
- You should protect it with `useMemo`.

```
const boxes = React.useMemo(() => {
  return [
    { flex: boxWidth, background: 'hsl(345deg 100% 50%)' },
    { flex: 3, background: 'hsl(260deg 100% 40%)' },
    { flex: 1, background: 'hsl(50deg 100% 60%)' },
  ];
}, [boxWidth]);
```

## The useCallback hook

- Only applies when you are passing a function into a component.

```
function handleMegaBoost() {
  setCount((currentValue) => currentValue + 1234);
}

return (
  <>
    Count: {count}
    <button
      onClick={() => {
        setCount(count + 1)
      }}
    >
      Click me!
    </button>
    <MegaBoost handleClick={handleMegaBoost} />
  </>
);
```

- A click will cause a re-rendering of `MegaBoost` because the function `handleMegaBoost` gets regenerated between renders.
- `useCallback` is the same as `useMemo` like this:

```
// This:
React.useCallback(function helloWorld(){}, []);
// ...Is functionally equivalent to this:
React.useMemo(() => function helloWorld(){}, []);
```

- Context Provider - good idea to memoize it.

```
function AuthProvider({ user, status, forgotPwLink, children }){
  const memoizedValue = React.useMemo(() => {
    return {
      user,
      status,
      forgotPwLink,
    };
  }, [user, status, forgotPwLink]);
  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
```
