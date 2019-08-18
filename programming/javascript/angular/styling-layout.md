# Angular Flex-Layout: Flexbox and Grid Layout for Angular Component
[Reference](https://blog.angularindepth.com/angular-flex-layout-flexbox-and-grid-layout-for-angular-component-6e7c24457b63)

- Layout functions used to create a foundation of application UI could be written in the markup, not the CSS file.
- Do not use inline style attributes, but you can use `angular-flex-layout` to build it in Angular templates.
- `fxLayout="column"`: Corresponding to `display: flex` and `flex-direction`.
- `fxLayoutGap="32px"`: `margin-bottom: 32px ` for each child except the last.
- Also does Grid stuff (`gdArea` etc.)

# Strategies for responsive layouts?
[Reference](https://www.reddit.com/r/Angular2/comments/5bx4fj/strategies_for_responsive_layouts/)

- An element with `display: none` is not in the Browser render tree at all (different from the DOM).
- You can try and remove stuff from the DOM with `ngIf` but it might be premature optimization. It is unlikely to provide more performance than just hiding the element with CSS, unless you're running some heavy JS constantly in the components and need to disable them.
- *Maintaining state and adding them back to the DOM is more heavy than a repaint.*

# How Browsers Work: Behind the scenes of modern web browsers
[Reference](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#Render_tree_construction)

- Browser: Requests from the server and displays it in the browser window.
- Resource is usually an HTML document, but may also be a PDF, image, or some other type of content.
- Browser UI: Address bar, back and forward buttons, bookmarking, refresh/stop, home.
- Components
  - UI
  - Browser engine: Marshals actions between UI and rendering engine
  - Rendering engine: Responsible for displaying requested content
  - Networking: For network calls such as HTTP requests
  - UI backend: Used to draw basic widgets
  - JS interpreter: Parse and execute JS
  - Data storage: `localStorage`, `IndexedDB`, `WebSQL`, `FileSystem`.
- *Browsers such as Chrome run multiple instances of the rendering engine: one for each tab. Each tab runs in a separate process.*
- Rendering engine:
  - IE: Trident
  - Firefox: Gecko
  - Safari: WebKit
  - Chrome/Opera: Blink, a fork of WebKit
- Rendering engine starts getting the document's contents from the networking layer, usually done in 8KB chunks.

