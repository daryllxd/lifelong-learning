- Define an app by `ng-app` then inject the modules in it, such as high charts, the router, etc. The module is basically the boostrapper of the app.
- You can only have one app at a time in a page.
- You separate the app by the controllers. In the controllers you also inject stuff inside.
- Directives, these are defined like `ng-thingie`, then you can have different behaviors on them, they are kind of like jQuery binding events.
- Inside a controller, you can access its variables using the `$scope`. You can define it in the controller itself, and it is accessible in the view.
- 2 way binding means the view (html element) is automatically synced with the model (JSON stuff).
- Factories = provide data from API endpoints on your site or somewhere else.
- To use Ruby in your JS, add `erb` extension, then put tags around. Don't forget to add quotations because the Ruby is inserted in.
- Coffeescript indenting.
- *A directive is a fancy name for a function that's attached to a DOM element. Directives have the ability to execute methods, define behavior, attach controllers and `$scope` objects, manipulate the DOM, and more.*

`$scope.apply`
[link](http://jimhoskins.com/2012/12/17/angularjs-and-apply.html)

- To see if any values have changed, use `$scope.$apply()`. You rarely call this because most events/controllers/http callbacks are wrapped in `$scope.$apply`.

*You use `$scope.apply` if you are going to run code in a new turn, and if that turn isn't being created from a method in the Angular library. Inside that new turn, you should wrap your code in apply.* Sample is when you are updating something.

    function Ctrl($scope) {
      $scope.message = "Waiting 2000ms for update";

        setTimeout(function () {
            $scope.message = "Timeout called!";
            // AngularJS unaware of update to $scope
        }, 2000);
    }

    function Ctrl($scope) {
      $scope.message = "Waiting 2000ms for update";

        setTimeout(function () {
            $scope.$apply(function () {
                $scope.message = "Timeout called!";
            });
        }, 2000);
    }

In this case, you can use `$timeout`, which is like `setTimeout`, but it wraps your code in `$apply` by default. Use that, not this.


If your code isn't wrapped in a function passed to $apply, and it throws an error, that error is thrown outside of AngularJS, which means any error handling being used in your application is going to miss it. $apply not only runs your code, but it runs it in a try/catch so your error is always caught, and the $digest call is in a finally clause, meaning it will run regardless of an error being thrown. That's pretty nice.

- In JQuery, you control the visibility of elements by working with the element based on data. In AngularJS, *you control the visibility by tying it to the data and then manipulating the data.*
- Managing the whole page? You need a service that encapsulates the data, so every controller can have the service injected.
- Timeout works only if you inject the `$timeout`, otherwise you need to do the wrapping it in `$scope.$apply`.
- Autocomplete is not super supported?
- Controller dependency injection needs the arguments, which is weird.
- Wrap specialized controllers for each part of the page.

Deferred/promise:

- Inject `$q` into the service/controller. Create a deferred object using `$q.defer()`. Then create a promise object with 2 functions - the first is called when the deferred object is resolved, and second when the deferred object is rejected. To resolve, call `deferred.resolve(params)`, the parameter will be passed onto the promise object's function. Or, you can use the promise method outside. To reject, call `deferred.reject(params)`.

