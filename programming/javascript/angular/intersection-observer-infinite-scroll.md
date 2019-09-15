# Intersection Observer API
[Reference](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

- This is an API that allows us to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.
- Applications:
  - Lazy-loading of images or other content as a page is scrolled.
  - Implementing "infinite scrolling" web sites, where more and more content is loaded and rendered as you scroll, so that the user doesn't have to flip through pages.
  - Reporting of visibility of advertisements to calculate ad revenues.
  - Deciding whether to perform tasks or animation processes based on whether or not the use will see the result.
- ***The Intersection Observer API lets code register a callback function that is executed whenever an element they wish to monitor enters or exits another element (or the viewport), or when the amount by which the two intersect changes by a requested amount. This way, sites no longer need to do anything on the main thread to watch for this kind of element intersection, and the browser is free to optimize the management of intersections as it sees fit.***
- The degree of intersection between the target element and its root is the intersection ratio. This is a representation of the percentage of the target element which is visible as a value between 0.0 and 1.0.

# Build an Infinite Scroll Component in Angular
[Reference](https://netbasal.com/build-an-infinite-scroll-component-in-angular-a9c16907a94d)

- Get current element of a component: `this.host.nativeElement;`
- Strategy is inside the infinite scroll component inside, you create an `ng-content` with an empty `<div #anchor>` inside to serve as the target element that we watch.
- Checking the element's visibility status: look at the `isIntersection` property.
- Checking if something is scrollable:

```
  private isHostScrollable() {
    const style = window.getComputedStyle(this.element);

    return style.getPropertyValue('overflow') === 'auto' ||
      style.getPropertyValue('overflow-y') === 'scroll';
  }
```

- Because `overflow: auto` + `overflow-y: scroll` is the combination to cause the scrollbars to appear.
- To support IE, you can load a polyfill.
