# Building large apps with AngularJS
[link](https://coderwall.com/p/y0zkiw)

The path to successfully build a large, fast, and stable application with Angular lies in finding and following conventions for you and your dev team.

*Models:* Use Services to separate your Model layer or business logic from the View and Controller patterns. `$rootScope` and `$scope` can become a mass of messy prototypal inheritance chains.

In a large Angular application, it is important to have a source of truth for your data. *Keep your data in your Angular Services and use your controllers to expose your data to your views.*

*File Organization:* The `angular-seed` project recommends something like the following for project file organization:

    partials/
      home.html
      login.html
      users.html
      orders.html
    js/
      controllers.js
      directives.js
      fileters.js
      services.js
      app.js

Monolithic folders:

    js/
      controllers/
        homeController.js
        loginController.js
      directives/
        usersDirective.js
        ordersDirective.js
      filters/
      services/
        userService.js
        orderService.js
        loginService.js

Preference is by feature:

    orders/
      directives/
      services/
    users/
      directives/
      services/
    home/
      controllers/

*Modules:* Except for loading 3rd-party Angular code into your app and mocking during testing, there is no reason to use more than one module.

*`$scope` life cycle:* The `$rootScope` is your biggest scope and all of its child `$scopes` contain `$watch` expressions. This is the magic of Angular's two-way data binding.

Various events trigger what's called a `$digest` loop that checks with the `$watch` expression to see if the value being watched has changed. If it has changed, then Angular executes all of the listeners for that variable.

*3rd-party integration with Angular.* Angular thrives on `$digest`, giving you the two-way data-binding magic. *3rd-party libraries don't know what Angular does. If your 3rd-party library changes something in the DOM, or returns you a value via an AJAX call, Angular doesn't know about it and continues doing its thing.* The keys to 3rd-party integration with Angular are `$scope.$apply()`, `$scope.$evalAsync`, `$q.when()`, and `$timeout`.

When something happens with a 3rd-party library, then you'll probably need to manually kick off a `$digest` loop via `$scope.$apply()`. This way Angular can react to whatever your 3rd-party library did. Angular's `$q` promise library is a very useful tool for asynchronously resolving the result of whatever your 3rd-party is going to do. Doing something like:

    $scope.$apply(function () {
        // do something with 3rd-party lib
    });


    $timeout(function () {
        // do something with 3rd-party lib
    }, 0);

