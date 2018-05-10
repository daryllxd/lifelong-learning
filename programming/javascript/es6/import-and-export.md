# [`export default was not found`](https://stackoverflow.com/questions/45995136/javascript-export-default-was-not-found)

- You have to specify `default` explicitly, or if you're trying to export multiple items from the same file, you need to import them with curly brackets.

``` js
file.js
export default function translateDate(date) { } import translateDate from file.js

// other_file.js
export function doWork(){}
export const myVariable = true;

import { doWork, myVariable} from "./other_file.js"
```

- [Reddit, on Styling React apps:](https://www.reddit.com/r/javascript/comments/8frypb/ive_been_learning_react_from_reading_their_docs/)
  - Styled Components. Webpack and `style-loader` and `sass-loader`.
  - Separate CSS?
  - CSS modules.
  - CSS-in-JS.

# Why Is `export default const` invalid?
[Reference](https://stackoverflow.com/questions/36261225/why-is-export-default-const-invalid)

- `const` is like `let`, it is a `LexicalDeclaration` used to define an identifier in your block.
- You are trying to mix this with the `default` keyword, which expects a `HoistableDeclaration`, `ClassDeclaration`, or `AssignmentExpression` to follow it.
- So you also can't do things like this: `export default const a=1, b=3, c=4;`.
