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
