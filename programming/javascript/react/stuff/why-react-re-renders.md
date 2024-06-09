# Why React Re-Renders
[Reference](https://www.joshwcomeau.com/react/why-react-re-renders/)

- Every re-render in React starts with a state change.
- **When a component re-renders, it also re-renders all of its descendants.**
- **Re-renders only affect the component that owns the state + its descendants (if any). The App component, in this example, doesn't have to re-render when the count state variable changes.**
- **Big Misconception #2: A component will re-render because its props change.**
- React will attempt to re-render, to be safe, especially if you pass a `ref` as a prop.
- By wrapping a `Decoraton` component` with `React.memo`, we're telling React that it's a pure component.

