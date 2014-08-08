# Package Management and Dependency Management
[link](http://jsforallof.us/2014/08/01/package-management-and-dependency-management/)

Package Management: A package just means a piece of code. JQuery, dodgy hacks, 3rd party pieces of code, vendor libraries, JQuery plugins are all examples of a package.

If you want to use JQuery, you either find the CDN link or go to the JQuery site and download a zip file or a JS file with the source.

Bower is a "package manager for the web". Doing `npm install bower -g` means you install Bower globally. You should have the `bower_components` directory. Other package managers: `npm`, `Jam`, `jspm`.

Dependency management: Inclusion order in JS is important. `Browserify` allows you to use `CommonJS` modules in the browser.

Stuff like `module.exports` means that you don't need to add several `<script></script>` tags to the index page. *We tell the dependency manager what we want, and let it worry about including it on the page.*

    var _ = require('underscore');

    var array = [1, 3, 5];
    _.map(array, function(item) {
      return item * 2;
    });

    module.exports = array;

- Browserify will look at this file, see the `require` function, go find Underscore.js and let us use it below. By downloading Underscore using npm, Browserify knows to look in the nearest `node_modules` folder it can find for the most appropriate module.
- *We use a package manager to pull in code for the project, and we use a dependency manager to use that code in our application.*
- Now, you can pull in what you get from this file into other files via other `require` statements.


