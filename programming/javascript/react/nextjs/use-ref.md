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


