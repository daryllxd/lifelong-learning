## Anatomy of a Rails Service Object
[text](http://multithreaded.stitchfix.com/blog/2015/06/02/anatomy-of-service-objects-in-rails/)

- Concerns/mixin modules: they are global to the VM and can have confusing side-effects.

#### Designing an SO

- *Do not store state.* Methods should operate on only what's passed to them, and the results should be completely describable *in the return value.* In order words, calling a method should not affect the internal state of the service object in any way. *We have a few service objects that store state, and it's been a nightmare to use them. Many of them cannot effectively be used in multi-threaded code because race conditions could squash the internal state of these objects, leading to hard-to-diagnose errors.*
- *Use instance methods.* All Resque methods are available via `Resque`, which means that *any Ruby VM has exactly one Resque it can use.* If it was implemented as an object, instead of a global, any code that needed to access a different Resque instance would not have to change.
- *Have few public methods.*
- *Methods should return rich result objects not booleans.
-
