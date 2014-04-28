# Gotchas from StackOverflow

- Doesn't access external CDNs.
- Bower is for front-end dependencies, npm is for back-end stuff like grunt tasks, node dependencies.
- Grunt is a task runner.
- Biggest difference is that npm has a nested dependency thing. For Bower it has a flat file structure.

# Meet Bower: A Package Manager For The Web
[link](http://code.tutsplus.com/tutorials/meet-bower-a-package-manager-for-the-web--net-27774)

Bower is just a package manager -- no concatenation, minification of code. No module system. It is just to manage package.

    $ npm install -g bower
    $ bower search bootstrap
    $ bower install bootstrap
    $ bower install jquery#1.7.0
    $ bower install pogi --save # save installed packages into the project'a bower.json dependencies
    $ bower install pogi-testing --save-dev # save installed packages into the project's dev dependencies (for testing and shit)
    $ bower update
    $ bower uninstall
    $ bower list # show the packages you currently have installed

## `bower.json`

    $ bower init # create the bower.json in your directory.
    $ bower install jquery lodash # this installs JQuery and lodash to app/bower_components but it is not yet linked in the bower.json file
    $ bower install jquery --save # it's now linked to the bower.json file
    $ bower install # if you have a bower.json and you need to install the files into the component directory, execute this.

## Configuring Bower using the `.bowerrc` file

Sample `.bowerrc`:

    {
      "directory": "app/assets/bower_components",
      "json": "libraries.json"
    }

# Day 1: Bower--Manage Your Client Side Dependencies
[link](https://www.openshift.com/blogs/day-1-bower-manage-your-client-side-dependencies)

## Why Should I Care?

1. Saves time -- instead of going to the jQuery website and downloading the package/CDN version, you can just type a command and you will get jQuery install on your local machine. No need to remember versions numbers (!!!).
2. You can work offline -- it installs the library in your app folder + another in the `.bower` directory.
3. `bower.json` where you can specify all the client side dependencies.
4. Easier to update (`bower update`).

After you do the `bower install`, you still have to link it, via Sprockets or something. If not:

    <script type="text/javascript" src="bower_components/jquery/jquery.min.js"></script>

