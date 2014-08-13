# Julie Ralph End to End Angular Testing with Protractor
[link](https://www.youtube.com/watch?v=aQipuiTcn3U)

The idea is that devs should write their own tests, and write their own end to end tests using Protractor. The devs don't want to worry about the environment.

So testing is having the confidence that your code is doing what your code is supposed to do.

End to end testing = how do the users see this? Do all the systems connect together?

WebDriver, aka Selenium, is becoming a web standard. In Protractor's case it's a Node app, but there are bindings to the different languages.

Protractor = for Angular, so we know how your app is structured, and we want to make the black box a little more grey.

    $ protractor protractor.js

Problem with end-to-end tests? Hard to get WebDriver running, tests are hard to write, slow, hard to debug, the whole "logging in process", cleaning up.

    $ webdriver-manager update
    $ webdriver-manager start

My general philosophy is that unit tests are great, we want to always have a unit test, but E2E tests have a place.

Configuration file setup: Similar to Karma. Test scaffolding = similar to what's out there (Jasmine). Protractor exports some global variables:

    browser # Wrapper around WebDriver, anything that WebDriver can do, Protractor can also do.
    element # Lets us interact with individual elements.
    element(by.model('value')).click()
    element(by.binding('value'))

Keeping the tests up to date, use Page Objects. The idea is that you separate the code where you actually find your elements and things specific to the webpage and the test logic itself.

    var AngularHomepage = function() {
      // ElementFinders
      this.nameInput = element(by.model('yourName'));
      this.greeting = element(by.binding('yourName'));

      this.get = function() {
        browser.get('http://www.angularjs.org');
      }

You can separate these into files, and since Protractor runs on Node, just `require` them when you need to use them.

## Slowness and Flakiness (`browser.waitForAngular()`);

Protractor automatically calls this before an event is called. So Angular knows about the `$http`, `$timeout`, so it can ask Angular if "hey, did this happen already?". You can also use the `$interval` service as a wrapper around `setInterval()`.

`elementexplorer.js`: Launches a browser you can interact with/shows the elements that you can open.

The `onPrepare` function runs after Protractor is loaded, but before the tests actually run. So we can do stuff like this:

> `protractor-conf.js`

    onPrepare: function() {
      // Disable animations so e2e tests run more quickly

      var disable ngAnimate = function() {
        angular.module('disableNgAnimate', []).run(function($animate) {
          $animate.enabled(false);
        });
      };

      browser.addMockModule('disableNgAnimate', disableNgAnimate);
    }

This asks Angular to pause and load some modules before launching the application. So tests run faster because animations are disabled.

What Protractor isn't good yet: "how do I log in before a test" and "how do I clear the database after every test".

Next:

- Formalize the contract with Angular.
- Migration.
- `elementexplorer` improvements.

