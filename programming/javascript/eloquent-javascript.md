# Eloquent JavaScript

## Chapter 10 - Modules

- Packages - Chunk of code that can be distributed (copied and installed). It may contain one or more modules and has information about what other packages it depends on.
- NPM: An online service and a program that helps you install and manage packages.
- Evaluating data as code:
  - Special operator `eval` - which will execute a string in the current scope. `eval("var x = 2")` creates a `var` from a string.
  - `Function` operator - Wraps code in a function value that has its own scope and won't do odd things with other scopes.
- CommonJS - The main concept of `CommonJS` is a function called require. When you call this with the module name of a dependency, it makes sure the module is loaded and returns its interface.

```
const ordinal = require("ordinal");
const {days, months} = require("date-names");
```

- The interface of `ordinal` is a single function, whereas `date-names` exports an object containing multiple things.

```
exports.formatDate = function(date, format) {
  return format.replace(/YYYY|M(MMM)?|Do?|dddd/g, tag => {
    ...
  });
};

```

- Using it:

```
const {formatDate} = require("./format-date");
```

Defining `require`

```
require.cache = Object.create(null);

function require(name) {
  if (!(name in require.cache)) {
    let code = readFile(name); => JS does not have, but browser and Node.js have
    let module = {exports: {}};
    require.cache[name] = module;
    let wrapper = Function("require, exports, module", code);
    wrapper(require, module.exports, module);
  }
  return require.cache[name].exports;
}
```

- The interface of `ordinal` is not an object, but a function.
- By defining `require`, `exports`, and `module` as parameters, the loader makes sure that these bindings are available in the module's scope.

## ECMAScript modules

- CommonJS modules are fine, but they are a duct-tape hack.
- ES modules:

```
import ordinal from "ordinal";
import {days, months} from "date-names";

export function formatDate(date, format) { /* ... */ }
```

- Imports happen before a module's script starts running - this means `import` declarations may not appear inside functions or blocks.

## Module design

- The best way to learn the value of well-structured design is to read or work on a lot of programs what works and what doesn't. Do not assume that a painful mess is "just the way it is". You can improve the structure of almost everything by putting more thought into it.
- **Focused modules that compute values are applicable in a wider range of programs than bigger modules that perform complicated actions with side effects.**
- **Relatedly, stateful objects are sometimes useful, but if something can be done with a function, then use a function. Several of the INI file readers on NPM provide an interface style that requires you to first create an object, then load the file into your object, and then use specialized methods to get at the results.**
  - OOP - instead of making a single function call and moving on, you have to perform the ritual of moving your object through various states.

## Chapter 13 - JavaScript and  the Browser

- TCP - one computer must be waiting/listening for other computers to start talking to it.
  - Each listener has a port associated with it.
  - Most protocols specify which port should be used by default - SMTP on port 25 for example.
- Web - connect a machine to the Internet and have it listen on port 80 with HTTP protocol so other computers can ask it for documents.
- Protocol - `http`
- Server - `eloquentjavascript.net`
- Path: `/13_browser.html`
- DNS - points `eloquentjavascript.net` to a machine that I control.

## Chapter 14 - The DOM
