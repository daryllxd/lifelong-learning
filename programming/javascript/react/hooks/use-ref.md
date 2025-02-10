# useRef
[Reference](https://react.dev/reference/react/useRef)

- `useRef` is a React Hook that lets you reference a value that’s not needed for rendering.

```
import { useRef } from 'react';

function MyComponent() {
  const intervalRef = useRef(0);
  const inputRef = useRef(null);
```

- You can mutate `ref.current` (not like `useState`), but if it holds an object **used for rendering**, then you shouldn't mutate that object.
- Changing `ref.current` does not re-render your component.
- Do not write or read `ref.current` when rendering, it makes the component behaviour unpredictable.

## By using a ref, you ensure that:

- You can store information between re-renders (unlike regular variables, which reset on every render).
- Changing it does not trigger a re-render (unlike state variables, which trigger a re-render).
- The information is local to each copy of your component (unlike the variables outside, which are shared).

## Don't read or write a ref while rendering

```
function MyComponent() {
  // ...
  // 🚩 Don't write a ref during rendering
  myRef.current = 123;
  // ...
  // 🚩 Don't read a ref during rendering
  return <h1>{myOtherRef.current}</h1>;
}
```

- This makes your components impure.

```
function MyComponent() {
  // ...
  useEffect(() => {
    // ✅ You can read or write refs in effects
    myRef.current = 123;
  });
  // ...
  function handleClick() {
    // ✅ You can read or write refs in event handlers
    doSomething(myOtherRef.current);
  }
  // ...
}
```

## Manipulating the DOM with a ref

```
import { useRef } from 'react';

function MyComponent() {
  const inputRef = useRef(null);
  // ...
```
```
// ...
return <input ref={inputRef} />;
```

After React creates the DOM node and puts it on the screen, React will set the current property of your ref object to that DOM node. Now you can access the `<input>`’s DOM node and call methods like focus():

```
function handleClick() {
  inputRef.current.focus();
}
```

## Avoiding recreating the ref contents

```
function Video() {
  const playerRef = useRef(null);
  if (playerRef.current === null) {
    playerRef.current = new VideoPlayer();
  }
```

- Typescript way

```
function Video() {
  const playerRef = useRef(null);

  function getPlayer() {
    if (playerRef.current !== null) {
      return playerRef.current;
    }
    const player = new VideoPlayer();
    playerRef.current = player;
    return player;
  }
```

# React `useRef` Use Cases and Examples
[Reference](https://medium.com/@zahidbashirkhan/react-useref-use-cases-with-examples-d7680d48a6e1)

- **Unlike the useState hook, updating a useRef does not trigger a re-render of the component.**
- Accessing DOM elements:

```
import React, { useRef } from 'react';

const ExampleComponent = () => {
  const inputRef = useRef(null);

  const handleClick = () => {
    // Focus the input element on button click
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
};
```

- Storing previous values

```
import React, { useEffect, useRef } from 'react';

const PreviousValueComponent = ({ value }) => {
  const prevValueRef = useRef();

  useEffect(() => {
    prevValueRef.current = value;
  }, [value]);

  return (
    <div>
      <p>Current Value: {value}</p>
      <p>Previous Value: {prevValueRef.current}</p>
    </div>
  );
};
```

- Working with external libraries

```
import React, { useEffect, useRef } from 'react';
import externalLibrary from 'some-external-library';

const ExternalLibraryComponent = () => {
  const dataRef = useRef([]);

  useEffect(() => {
    // Update the external library with the latest data
    externalLibrary.updateData(dataRef.current);
  }, []);

  // ... rest of the component
};
```

- Remember that since useRef doesn't trigger re-renders, if you need to update the component and reflect the changes in the UI, you should use useState instead. Use useRef only when you need to manage a mutable value or reference that should not affect the component's rendering.

# Understanding the React useRef Hook
[Reference](https://refine.dev/blog/react-useref-hook-and-ref/#introduction)


# useState() vs. useRef(): Understand the Technical Difference
[Reference](https://dzone.com/articles/usestate-vs-useref-understand-the-technical-differ)

- useState() Triggers a Re-Render When Its Value Changes, While useRef() Does Not
- useState() Is Used to Manage State, While useRef() Is Used to Store Mutable Values
-

