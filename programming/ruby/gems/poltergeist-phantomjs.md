# PhantomJS Site
[link](http://phantomjs.org/best-practices.html)

To evaluate JavaScript or CoffeeScript code in the context of the web page, use evaluate() function. The execution is "sandboxed", there is no way for the code to access any JavaScript objects and variables outside its own page context. An object can be returned from evaluate(), however it is limited to simple objects and can't contain functions or closures.

When a page requests a resource from a remote server, both the request and the response can be tracked via `onResourceRequested` and `onResourceReceived` callback.

Headless testing. One major use case of PhantomJS is headless testing of web applications. It is suitable for general command-line based testing, within a precommit hook, and as part of a continuous integration system.

Page automation.

