# What is the purpose of Node.js module.exports and how do you use it?
[Reference](https://stackoverflow.com/questions/5311334/what-is-the-purpose-of-node-js-module-exports-and-how-do-you-use-it)

- `module.exports` is the object that's actually returned as the result of a `require` call. `exports` variable is set to that same object so in the module code, you do this:

``` js
var myFunc1 = function() { ... };
var myFunc2 = function() { ... };
exports.myFunc1 = myFunc1;
exports.myFunc2 = myFunc2;

And in the calling code you do this:

var m = require('./mymodule');
m.myFunc1();

You can also alias the name:

// Exporter
var myVeryLongInternalName = function() { ... };
exports.shortName = myVeryLongInternalName;
// add other objects, functions, as required

// Caller
var m = require('./mymodule');
m.shortName(); // invokes module.myVeryLongInternalName
```

- NodeJS uses the CommonJS module system which works like this:
  - If a file wants to export something, it has to declare it using `module.export` syntax.
  - If a file wants to import something, it has to declare it through `require('file')` syntax.
- Modules get cached.
- Modules are loaded in synchronous.
