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

# Thoughtful CSS Architecture
[Reference](https://seesparkbox.com/foundry/thoughtful_css_architecture)

- Benefits
  - Fewer styling rules
  - Fewer styling collisions
  - Long-term maintainability
  - Faster ramp-up for new team members
  - Easier collaboration between team members
  - Smoother project hand-offs
- Types of CSS Rules
  - Base styles: Stuff that you want to normalise across all browsers. Typography, box-sizing, etc. (The common mistake is to create defaults that you don't really want.)
  - Objects: Objects are rules that focus only on structure and layout. No decorative styles allowed. Look for structural patterns in your designs and create object classes that can be used across multiple components or sections of the site. Grid systems fit into the Objects category.
  - Components: Discrete, self-contained pieces of UI. The key to creating robust components is to make them independent from any other parts of the page and self-contained. You should be able to drop a component anywhere on any page and it will maintain its structure and design.
  - State: Helpers that modify the state of a component. It's common to add/remove state classes with JavaScript. Rather than manipulating styles with JS, you can just update a state class and allow the stylesheet to determine what each state looks like.
  - Themes: Theme classes simply alter a component to use unique colors, fonts, or other decorations.
  - Utilities: Single-purpose helpers that apply one specific styling rule. Things like adding space between components, clearing floats.
  - Javascript hooks: Whenever possible, decouple any dependencies between your JavaScript and styling. Using class names that are used for both styling and DOM selection with JS can cause issues later when the CSS is refactored.
- BEM Naming Convention
  - `Block__Element-Modifier`
  - Readability: Using clearly described class names for most of your elements will make it easier for someone else to read through your HTML or CSS files.
  - Self-description: Using hierarchical names makes it clear which elements belong to which base components.
  - Specificity: It seems excessive to add a class to every element in your component, but you can keep the specificity of each of your selectors low, making overrides much more straightforward.
- Namespacing:
  - Objects: `.o-`
  - Components: `.c-`
  - State: `.is-` OR `.has-`
  - Theme: `.t-`
  - Utilities: `.u-`
  - Javascript hooks: `.js-`
- Use variables when any value needs to be used more than once. Prefix your variable names to help identify their purpose and also to make code-completion more useful.
- Ordering CSS classes:
  - Settings: Variables and other settings
  - Tools: Custom functions and mixins
  - Generic: Font-face, box-sizing, normalize, etc.
  - Elements: Bare element defaults like headings and links
  - Objects: Layout and structure classes
  - Components: Individual components
  - Trumps: Utilities and other rules meant to be a final trump over everything else
