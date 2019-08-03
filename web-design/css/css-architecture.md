# 8 simple rules for a robust, scalable CSS architecture
[Reference](https://github.com/jareware/css-architecture)

- High-level goals:
  - Component oriented: The best way to deal with UI complexity is to split the UI into smaller components.
  - Sandboxed: Features like the cascade and the single, global namespace for identifiers will actively work against you in this regard.
  - ***Local by default, and global only as an exception.***

- *Always prefer classes.* If you think there will be "one of something", inevitably, it will get more and more. *There is no situation where targeting and ID would be a better idea than targeting a class, so let's just not, ever.*
  - Don't target elements (e.g. `p` directly, too. It's often OK to target elements that belong to a component, but on their own, eventually you'll have to undo those styles anyway.
- *Co-locate component code.* When working on a component, it will help if everything related to that component lives very close to each other. Don't do the separation of `styles`, `tests`, `docs`.
- *Class namespacing.* We can do `app-Component-class`.
- *Maintain a strict mapping between namespaces and filenames.* All styles affecting a specific component should go to a file named after the component, no exceptions. It would rather be easier if the person who will maintain the code to look according to file than look according to grep.
- *Prevent leaking styles outside the component.*
- *Prevent leaking styles inside the component.* [Reference](https://github.com/jareware/css-architecture#6-prevent-leaking-styles-inside-the-component)
  - Either: Never target element names in stylesheets.
  - Or: Use the `>` combinator if you want to apply the style to the first layer.
- *Prevent external styles from leaking in to the component:*
  - CSS reset for everything?
  - `all: initial` to stop inherited properties from flowing in.
  -  Shadow DOM?
  - `iframe` lol.
- *Integrate external styles loosely.*
  - If you want to extend, then just `@include` the mixin in the class that you made up. Don't use anything in Bootstrap.
