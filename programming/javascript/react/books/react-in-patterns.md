# Communication

- Input: props. This can even be another component.
- Output: rendered HTML.

- Event handlers


- Composition
- Special children prop.

# Proxy Pattern
[Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

- Proxy can be used to add validation.
  - Like this, but restrict the props to change.

```
const person = new Proxy(person, { get... set: ...}

```

- JS built-in `Reflect` - easier for us to manipulate the target object when working with proxies.
  - `haha[a]` vs `Reflect.get(haha, 'a')`.
  - `Reflect.set(haha, 'a', '1')`.

# Provider Pattern

- With the Provider pattern, we can make data available to multiple components.
- Wrap all components in in a `Provider`. Then, create a `Context` object, using `createContext`.
- Creating a hook for the context itself:

```
function useThemeContext() {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error("Must be within the themeProvider");
  }

  return theme;
}
```

## HOC component - Can try later

# Container/Presentational Pattern


