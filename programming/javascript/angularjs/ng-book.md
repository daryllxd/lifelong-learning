# ng-book. Reference repo: `angulearn`

AngularJS features: Separation of app logic/data models/views, Ajax services, dependency injection, browser history, testing.

JQuery, extend the custom JS objects and manipulate DOM from outside. Angular adds shit to HTML to give it native MVC capabilities. So you can encapsulate a portion of the web page as one application rather than forcing the entire page to be an entire app.

As opposed to Rails, Angular create live templates -- `ng-app` declares that everything inside of it belongs to a specific Angular app. Controller doesn't have to worry about rendering the view.

*By setting the `ng-app` attribute on an element in the DOM, you are declaring that everything inside of it belongs to this Angular app, and that's how we nest an Angular app inside of a web app.*

We bind `name` attribute to the input field using the `ng-model` directive on the containing model object (`$scope`).

This is just bi-directional binding in the view. For back-front end, we have to use Controllers. Declaring `ng-controller` attribute on a DOM element means that all the elements inside it belong to this controller.

The controller function takes one parameter, the `$scope` of the DOM element. This `$scope` object is available on the element and the controller and is the bridge by which we'll communicate from the controller to the view.

## Communicating with a Controller

    <div ng-controller='MyController'>
      <h1>Hello {{ clock }}</h1>
    <div>

    function MyController($scope) {
      var updateClock = function() {
        $scope.clock = new Date();
      };

      setInterval(function() {
        $scope.$apply(updateClock();
      }, 1000);

      updateClock();
    };

*The controller function takes the `$scope` of the DOM element. This is available on the element and the controller, and it will be the bridge by which we'll communicate from the controller to the view.*

*When the timer fires, it will call the `updateClock` function, which wll set the new `$scope.clock` variable to the current time. Within an Angular controller, you can reference the variables inside the `{{ }}`.*

Better to bind references in the views by an attribute on an object, rather than the raw object itself.

    <h1>Hello {{ clock.now }}</h1>

    $scope.clock = {
      now: new Date()
    }

## Modules

Placing functional code in the global namespace is rarely a good idea. It can cause collisions that are tough to debug and cost us development time.

Module - where you put the application code. An app can contain several module, each one containing code for a specific function.

Why?

- Cleaner global namespace
- Tests are easier to write
- Easier to share code between applications
- Allow app to load different parts of the code in any order

Defining a module (setter):

    angular.module('myApp', []); # First parameter is the name of the module we are creating. Second parameter is the list of dependencies, otherwise known as injectibles.

Fetching an app (getter):

    angular.module('myApp')

Properties: `name` and `requires`

## Scopes

Scope = execution context for the expressions. This is where we define the biz functionality of the app, methods in the controllers, and properties in the views.

Just before out app renders the view to the user, the view template links to the scope, and the app sets up the DOM to notify Angular for property changes.

Scope = source of truth for the application state. Live binding means `$scope` can be updated immediately when the view modifies it.


