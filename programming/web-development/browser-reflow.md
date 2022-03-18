# Minimizing browser reflow
[Reference](https://developers.google.com/speed/docs/insights/browser-reflow)

- Reflow: the browser process for re-calculating the positions and geometries of elements in the document, for the purpose of re-rendering part or all of the document.
- Actions that can trigger a reflow:
  - Resizing browser window.
  - JS methods involving computed styles.
  - Adding/removing elements from the DOM.
  - Changing element's classes.
- Minimising reflow:
  - Reduce unnecessary DOM depth. Changes at one level in the DOM tree can cause changes at every level of the tree, all the way up to the root.
  - Minimise CSS rules.
  - If you make complex rendering changes such as animations, do so out of the flow. Use position-absolute or position-fixed to accomplish this.
  - Avoid unnecessary complex CSS selectors which require more CPU power to do selector mapping.

# Animations
[Reference](https://developers.google.com/web/fundamentals/design-and-ux/animations)

- Changing the `box-shadow` of an element requires a much more expensive paint operation than changing its text color.
- Changing the width of an element in likely to be more expensive than changing `transform`.
- `will-change` [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change) - hints to browsers how an element is expected to change. Browsers may set up optimisations before an element is actually changed. Try not to use it as much as possible.
- Performance
  - CSS-based animations, and Web Animations where supported natively, are typically handled on a thread known as the "compositor thread". This is different from the browser's "main thread", where styling, layout, painting, and JavaScript are executed. This means that if the browser is running some expensive tasks on the main thread, these animations can keep going without being interrupted.
- If any animation triggers paint, layout, or both, the "main thread" will be required to do work. This is true for both CSS- and JavaScript-based animations, and the overhead of layout or paint will likely dwarf any work associated with CSS or JavaScript execution, rendering the question moot.
- To check: [Reference](https://csstriggers.com/)


## CSS Versus JavaScript Animations

- CSS for one-shot transitions.
  - For smaller, self-contained states.
- JS for advanced effects.
  - If you need control for this.
  - `requestAnimationFrame` if you want to orchestrate an entire scene by hand.
- Use Web Animations API or the framework.
- CSS animation using `transform` and `transition`.
  - Classes toggled via JS `classList`.
- JS Web Animations API - written inline like:

```
var target = document.querySelector('.box');
var player = target.animate([
  {transform: 'translate(0)'},
  {transform: 'translate(100px, 100px)'}
], 500);
player.addEventListener('finish', function() {
  target.style.transform = 'translate(100px, 100px)';
});
```
