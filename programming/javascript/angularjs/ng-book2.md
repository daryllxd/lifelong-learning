## ng-book 2

- ES6 Shim - ES6 provides shims so that legacy JS engines behave as closely as possibly to ECMAScript 6. THis isn't needed for newer versions of Safari, Chrome, but it is required for older versions of IE. A shim is code that helps adapt between cross browsers to a standardized behavior.
- Angular2 polyfills - provides standardization across browsers.
- SystemJS - module loader -- it helps us create modules and resolve dependencies.
- RxJS - RxJS gives us tools for working with Observables, which emits streams of data. Angular uses Observables in many places when dealing with asynchronous code.


import { bootstrap } from 'angular2/platform/browser';
import { Component } from 'angular2/core';

@Component({
  selector: 'hello-world',
  template: `
  <div> Hello WOrld</div>

  `
})


class HelloWorld {

}

bootstrap(HelloWorld);

- TypeScript is typed JS. In order to use Angular in our browser, we need to tell the TS compiler where to find some typing files. The
- The `reference` statements specify the path to some typing files (ending in `d.ts`).
- The `import` statement defines the modules we want to use to write our code. Here we're importing two things: `Component` and `bootstrap`.
- The structure of this `import` is of the formal `import { things } from wherever`. In the `{ things }` part what we are doing is called destructuring.
- `import` is like `require` in Ruby -- we are pulling in these dependencies from another module and making these dependencies available for use in this file.

Component has: annotation, component definition.

`@Component` - annotations - declaring that this is a component. `selector` - defining this as a new tag.

 Templates are done between backticks (these are used for multiline strings). Problem with putting inline views are that many editors don't support syntax highlighting of the internal strings (yet).

 `bootstrap(HelloWorld)` -- starting the application -- the main component of our application is the `HelloWorld` component.

 Starting the app

    $ npm run go
