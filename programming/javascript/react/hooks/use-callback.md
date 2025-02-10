# `useCallback`
[Reference](https://react.dev/reference/react/useCallback)

- Use at the top level of your component to cache a function definition between re-renders.
- If you change the internal state, the component will re-render, but increment will not re-run. Only


```
'use client';
import { useState, useCallback, useEffect } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  const increment2 = () => setCount((prevCount) => prevCount + 1);

  useEffect(() => {
    console.log('reuse increment');
  }, [increment]);

  useEffect(() => {
    console.log('reuse increment2');
  }, [increment2]);

  return (
    <div>
      <h2 className="lg:hidden lg:block">Count: {count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={increment2}>Increment2</button>
    </div>
  );
};
```

# Your Guide to React.useCallback()
[Reference](https://dmitripavlutin.com/react-usecallback/)

- What does `useCallback` solve? The functions equality check.
  - All functions are not equal via `===` even though they are literally the same thing.
- Why you want to have a single function in between renderings:
  - A functional component wrapped inside React.memo() accepts a function object as prop
  - If that function object is a dependency to other hooks
  - When the function has internal state, so you don't want it to be a different "instance" if the component re-renders.
- **Given the same dependency values deps, the hook returns the same function instance between renderings (aka memoization).**

```
import { useCallback } from 'react';

export function MyParent({ term }) {
  const onItemClick = useCallback(event => {
    console.log('You clicked ', event.currentTarget);
  }, [term]);

  return (
    <MyBigList
      term={term}
      onItemClick={onItemClick}
    />
  );
}
```

- We want to use `useCallback` here so that if `MyParent` re-renders, we don't have to re-render `MyBigList`.
- Why not to use:
  - `useCallback` gets ran every time `MyComponent` renders.
  - `useCallback` increases the complexity of the code.
