# `ng-book`

- Controllers are instantiated only when they are needed and discarded when they are not. Every time we switch a route or reload a view, the current controller gets cleaned up by Angular.
- Services provide a method to keep data around for the lifetime of the app and communicate controllers in a consistent manner.
- *Services are singleton objects instantiated once per app and are loaded only when necessary.*

## Registering a Service

1. Use the `angular.module` `factory`:

    angular.module('myApp.services', [])
      .factory('githubService', function() {
        var serviceInstance = {};
        return serviceInstance;
      }
    });

This means that `githubService` is now registered with the AngularJS app using the name `githubService` as its name.

2. Bracket notation:

    angular.module('myApp.services', [])
      .factory('githubService', [function($http) {
      }]);

## Using Services

To use a service, we need to identify it as a dependency for the component where we're using it: a controller, a directive, a filter, or another service.

    angular.module('myApp', ['myApp.services'])
      .controller('ServiceController',
        function($scope, githubService){...

*If your application requires authentication from a back-end service, we might want to create a `SessionsService` that handles user authentication and holds onto a token passed by the back-end service.*

## Options for Creating Services

1. `factory()`

`factory` takes in two arguments, `getFn(function)`. This function gets run when angular creates the services.

    angular.module('myApp.services', [])
      .factory('githubService', [function($http) {
        return {
          'username': 'auser'
        }
      }]);

2. `service`

We can use this to register a constructor function for our service object.

    var Person = function($http) {
      this.getName = function(){
        return $http({
          method: 'GET',
          url: '/api/user'
        });
      };
    };

    angular.services('personService', Person);

The `service()` function will instantiate the instance using the `new` keyword when creating the instance.

3. `provider`

These are created through the `$provide` service, which is responsible for instantiating these providers at run time. A provider is an object with a `$get` method. The `$injector` calls the `$get` method to create a new instance of the service. `$provider` exposes several different API methods for creating a service, each with a different intended use.

The `provider()` method is responsible for registering services in the `$providerCache`. `factory` is shorthand for doing something through `provider`.

> Factory

    angular.module('myApp.services', [])
      .factory('githubService', [function($http) {
        return {
          'username': 'auser'
        }
      }]);

> Provider

    .provider('myService', {
      $get: function() {
        return {
          'username': 'auser'
        }
      }
    });

Use the `provider` method because it gives you the ability to configure service returned by the `.provider()` method using the Angular `.config()` function. We can inject a special attribute into the `config()` method.

*If you want to configure the services in the `config()` function, we must use `provider()` to define our service.*

4. `constant()`

We can register an existing value as a services that we can later inject into other parts of our app as a services.

    angular.module('myApp')
      .constant('apiKey', '123123123')

Injection:

    angular.module('myApp')
      .controller('MyController',
        function($scope, apiKey) {
          $scope.apiKey = apiKey;
        });

5. `value()`

[TODO]: THIS.

6. `decorator()`

[TODO]: THIS.

# Angular: Service vs. Provider vs. Factory
[link](http://stackoverflow.com/questions/15666048/angular-js-service-vs-provider-vs-factory)

*Services:* When declaring `serviceName` as an injectable argument, you will be provided with an instance of the function. You get `new FunctionYouPassedToService()`.

*Factories:*  You get the value that is returned when the function reference is invoked.

*Providers:* (`module.provider('providerName' ,function)`). When declaring `providerName` as an injectable argument you will be provided with `ProviderFunction().$get()`. They can be configured during the module configuration phase.

# AngularJS Step-by-Step: Services
[link](http://blog.pluralsight.com/angularjs-step-by-step-services)

When I say service, I really just refer to a simple object that does some sort of work. The main public members of a service are functions, not properties, especially since having properties suggests some sort of state.

SRP: The controller's job is to wire up the scope. If your controller is also responsible for making AJAX calls to fetch and update data, this is a violation of the SRP principle. Logic like that should be abstracted out into a separate service, then injected into the objects that need to use it.

DIP: Objects should depend on abstractions, not concretions. In JS, you can look at any parameter of any function (constructor or otherwise) as an abstractions, since you can pass in any object for that parameter so long as it has the members on it that are used within that method. The key here is the ability to use DI--the ability to inject into other objects.

