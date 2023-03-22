# When does React re-render components?
[Reference](https://felixgerschau.com/react-rerender-components/)

- Virtual DOM - consists of your React application's elements.
  - If only the attribute of an element changes, React will only update the attribute of the HTML element by calling `document.setAttribute` on it.
  - When the VDOM gets updated, React compares it to the previous snapshot and then only updates what has changed in the real DOM. The process of comparing the old with the new one is diffing.
- **Execution of the render function doesn't always imply an update of the UI.**

- The two tile components will re-render, even though the second one didn't receive any props.
```
const App = () => {
  const [message, setMessage] = React.useState('');
  return (
    <>
      <Tile message={message} />
      <Tile />
    </>
  );
};
```
