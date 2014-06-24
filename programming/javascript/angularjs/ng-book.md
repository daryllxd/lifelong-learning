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

Module - where you put the application code. An app can contain several modules, each one containing code for a specific function.

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

When Angular runs and generates the view, it will create a binding from the root `ng-app` element to the `$rootScope` (eventual parent object). The `$scope` is the connection between the view and the HTML.

    angular.module('myApp', [])
      .run(function($rootScrope) {
        $rootScrope.name = "World";
      });

This can be accessed like:

    %div{ng-app: "myApp"}
      %h1 Hello {{ name }}

*Different types of markup in a template:*

- Directives: The attributes or elements that change the existing DOM element into a reusable DOM component
- Value bindings: The `{{ }}` binds expressions to the view
- Filters: Formatting functions available in the view
- Form controls: User input validation controls

## What Can Scopes Do?

- Provide observers to watch for model changes
- Provide the ability to propagate model changes through the application as well as outside the system to other components
- They can be nested such that they can isolate functionality and model properties
- They provide an execution environment in which expressions are evaluated

Scopes are objects that contain functionality and data to user when rendering the view. You can think of scopes as `view models`.

## `$scope` Lifecycle

When the browser receives a JavaScript callback that executes inside Angular, `$scope` will be made aware of the model mutation.

If the callback executes outside of Angular, we can force the `$scope` to have knowledge of the change using the `$apply` method.

*Creation.* When we create a controller or directive, Angular creates a new scope with the `$injector` and passes this new scope for the controller or directive at runtime.

*Linking.* When the `$scope` is linked to the view, all directives that create `$scopes` will register their watches on the parent scope. These watches watch for and propagate model changes from the view to the directive.

*Updating.* During the `$digest` cycle, all of the children scopes will perform dirty digest checking. All the watching expressions are checked for any changes, and the scope calls the listener callback when they are changed.

*Destruction.* When a `$scope` is no longer needed, the child scope creator will need to call `scope.$destroy()` to clean up the child scope.

Directives generally don't create their own scopes, but sometimes they do.

## Controllers

Controllers in Angular exist to augment the view of an AngularJS application. When we create a new controller on a page, Angular passes it a new `$scope`.

Constructor:

    function FirstController($scope) {
      $scope.message = "hello";
    }

Functions on the scope of the controller.

    %{ng-controller: "FirstController"}
      %button{ng-click: "add(1)"} Add
      %button{ng-click: "subtract(1)"} Subtract
      %h4 Count: {{ counter }}

    app.controller('FirstController', function($scope) {
      $scope.counter = 0;
      $scope.add = function(amount) { $scope.counter += amount }
      $scope.subtract = function(amount) { $scope.counter -= amount }

Setting up the controller in this manner allows us to call `add` or `subtract` functions defined on the `FirstController` scope.

AngularJS developers can use dependency injection to access services.

*The controller is not the appropriate place to do any DOM manipulation or formatting, date manipulation, or state maintenance beyond holding the model data. It is simply the glue between the view and the $scope model.*

## Controller Hierarchy

Every part of an AngularJS application has a parent scope, regardless of the context within which it is rendered. Every part of an AngularJS app has a parent scope, regardless of the context within it is rendered.

With the exception of isolate scopes, all scopes are created with prototypal inheritance, meaning they have access to their parent scopes. We move up to a scope's parent and so on until you reach `$rootScope`. If the user object can't be found, then move on and update the view.

Controllers should be as slim as possible. Stuff like this:

    $scope.shouldShowLogin = true;
    $scope.showLogin = function() {
      $scope.shouldShowLogin = !$sscope.shouldShowLogin;
    }

    $scope.clickButton = function(){
      $('#btn span').html('Clicked');
    }

    $scope.onLogin = function(user) {
      # Ajax shit
    }

With directives and services, it will become this:

    angular.module('MyController', function($scope, UserSrv) {
      # Scope controlled by directives

      $scope.onLogin = function(user) {
        UserSrv.runLogin(user);
      }
    })

## Expressions

Expressions are roughly similar to `eval(javascript)`.

- All expressions are executed in the context of the scope and have access to local `$scope` variables.
- An expression doesn't throw errors if it results in a `TypeError` or a `ReferenceError`.
- No conditionals.
- They can accept a filter/filter chains.

Expressions all operate on the containing scope within which they are called, so we can call variables bound to the containing scope inside of an expression, which allows us to loop over variables, call a function, or use variables for math expression.

## Interpolating a String

Inject the `$interpolate` service:

    angular.module('myApp', []).controller('MyController',
      function($scope, $interpolate) {
        // We have access to $scope and $interpolate
      }

[TODO]: INTERPOLATION_BITCHES>

## Filters

Filters are formate to the data we display to the user.

    {{ name | uppercase }}

    app.controller('DemoController', ['$scope', '$filter',
      function($scope, $filter){
        $scope.name = $filter('lowercase')('Ari');

Filters: currency, date, custom filter function, `json` (transforms a JSON to a string, for debugging purposes)

## Form Validation: Combine HTML5 + Angular

Examples: `required`, `ng-minlength=5`, `ng-pattern="/a-zA-z/"`, `input-type="email"`.

Custom validation using directive:

    angular.module('validationExample', [])
      .directive('ensureUnique', function($http) {
        return {
          require: 'ngModel',
          link: function(scope, ele, attrs, c) {
            $http({
              method: 'POST',
              url: '/api/check/' + attrs.ensureUnique,
              data: {'field': attrs.ensureUnique}
            }).success(function(data, status, headers, cfg) {
              c.$setValidity('unique', data.isUnique);
            }).error(function(data, status, headers, cfg) {
              c.$setValidity('unique', false);

Control variables in forms: Unmodified (`formName.inputFieldName.$pristine`), modified (`formName.inputFieldName.$dirty`)... Angular also adds CSS classes to forms, such as `.ng-pristine`, `.ng-dirty`.

[TODO]: $PARSERS,$FORMATTERS,THE_FORM_THING

## Introduction to Directives



