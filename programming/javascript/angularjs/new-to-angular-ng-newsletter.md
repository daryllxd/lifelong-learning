# `ng-newsletter` Part 1: How to Get Started
[link](http://www.ng-newsletter.com/posts/beginner2expert-how_to_start.html)

Backbone/Ember require developers to extend from JavaScript objects that are specific to their frameworks. This pollutes your object space and requires you to have intimate knowledge of abstract objects that exist in memory.

Instead of manipulating the DOM directly, you annotate the DOM with metadata (directives), and Angular manipulates the DOM for you.

AngularJS does not depend on other frameworks, you can build AngularJS apps in non-AngularJS frameworks.

*AngularJS is an MV framework that is ideal for use when building client-side single-page apps. It is not a library, but a framework for building dynamic web pages. It focuses on extending HTML and providing dynamic data binding, and it plays well with other frameworks (jQuery).*

The Hello World gives you bi-directional data binding without any work. This basically means that if you change data on the back end, your changes will show up in your view automatically, and vice-versa. It also shows bi-directional data using the `ng-model`, and it has a directive called `{{ yourName }}`.

## `angular.module`

To define an AngularJS app, we need to define an `angular.module`. A module is a collection of functions that are run when the application is booted. We need to define the module in our `main.js`:

    var app = angular.module('myApp', []);

You can set `ng-app` on any element in the DOM, and that's where Angular will launch on the page.

# `ng-newsletter` Part 2: Scopes

A `$scope` is an object that ties a DOM element to the controller. Both the controller and the view have access to the `$scope` so ti can be used for communication between the two. This `$scope` object will house both the data and the functions that we'll want to run in the view.

Anything we attach to this `$scope` object will become available to the view. Any changes that the controller makes to the model will show up as changes in the view. The root scope is the topmost scope that is created on the DOM element that contains the `ng-app` directive.

To explicitly create a `$scope` object, we'll attach a controller object to a DOM element using the `ng-controller` directive on an object.

    %div{ "ng-controller" => "MyController"}

With one exception, all scopes are created with prototypal inheritance, meaning that they have access to their parent scopes. By default, for any property that Angular cannot find on a local scope, Angular will crawl up to the containing (parent) scope and look for the property or method there.

(The exception: Some directives can optionally create an isolate scope and do not inherit from their parents.)

# `ng-newsletter` Part 3: Data Binding
[link](http://www.ng-newsletter.com/posts/beginner2expert-data-binding.html)

To set up binding, we use `ng-model`.

## AJAX

Out of the box, Angular supports AJAX through the `$http` service.

    $http({
      method: 'JSONP',
      url: 'https://api.github.com/events?callback=JSON_CALLBACK'
    }).success(function(data, status, headers, config) {
      // data contains the response
      // status is the HTTP status
      // headers is the headers getter function
      // config is the object that was used to create the HTTP request
    }).error(function(data, status, headers, config) {
    });

The `$http` service is a core AngularJS service that helps facilitate communication with remote HTTP servers via the `XMLHttpRequest` or through `JSONP`.

The `$http` service takes in a configuration object, which defines how the HTTP request is constructed. It will return a promise that has two methods, success and failure.


# `ng-newsletter` Part 4: Directives
[link](http://www.ng-newsletter.com/posts/beginner2expert-how_to_start.html)

*A directive is a fancy name for a function that's attached to a DOM element. Directives have the ability to execute methods, define behavior, attach controllers and `$scope` objects, manipulate the DOM, and more.*

When the AngularJS app is bootstrapped and the AngularJS compiler starts walking through the DOM tree, it will parse the HTML looking for these directive functions. When it finds a DOM element with one or more, it will collect, sort, and run the directive functions in priority order.

Ex: `ng-model`. This directive binds the value of the input DOM element to the `$scope` model in the controller. To do that, it sets up a `$watch` (similar to the JavaScript event listener) on the value.

## Expressions ({{ }})

- All expressions are executed in the context of the scope and have access to local `$scope` variables.
- They do not throw errors if an expression results in a `TypeError` or a `ReferenceError`.
- *They do not allow for any control flow.*
- They can accept filter chains.

## Directive List

- `ng-init`: A function that runs at bootstrap time. Allows us to set default variables prior to running any other functions.
- `ng-click`: Registers a listener with the DOM element. When the DOM listener fires, Angular executes the expression and updates the view as normal.
- `ng-show`/`ng-hide`.
- `ng-repeat`. This loads a template for each item in a collection. The template it clones is the element upon which we call `ng-repeat`. Each copy of the template gets its own scope.

# `ng-newsletter` Part 6: Services
[link](http://www.ng-newsletter.com/posts/beginner2expert-how_to_start.html)

Services are singletons, which are objects that are instantiated only once per app (by the `$injector`). They provide an interface to keep together methods that relate to a specific function. Ex: `$http`.

Angular comes with several built-in services which we'll interact with consistently. It makes it easy to create our own services, simply by registering the service. Once a service is registered, the Angular compiler can reference it and load it as a dependency for runtime use.

To create a service:

    angular.module('myApp.services', [])
      .factory('githubService', function() {
        var serviceInstance = {};
        return serviceInstance;
      })

`$timeout` - for timeouts between actions.

    app.controller('ServiceController', ['$scope', '$timeout', 'githubService',
      function($scope, $timeout, githubService) {
        // The same example as above, plus the $timeout service
        var timeout;
        $scope.$watch('username', function(newVal) {
          if (newVal) {
            if (timeout) $timeout.cancel(timeout);
            timeout = $timeout(function() {
              githubService.events(newVal)
              .success(function(data, status) {
                $scope.events = data.data;
              });
            }, 350);
          }
        });
      }]);

Services are the way to share data across several controllers. If our application has a settings page where we set the user's Github username, we'll want to share the username to the other controllers in our application. To share the username across controllers, we can add a method to the service that stores the username.

## Services in our app

Simplest service to abstract: `audio`.

    app.controller('PlayerController', ['$scope', '$http',
      function($scope, $http) {
        var audio = document.createElement('audio');
        $scope.audio = audio;
      }
    )

Instead of setting up the audio element in the controller, we can create a singleton service to manage the audio element.

    app.factory('audio', ['$document', function($document) {
      var audio = $document[0].createElement('audio');
      return audio;
    }]);

*We are using the built-in `$document` service to give us a reference to the `window.document` element.* Now, in the `PlayerController`, we can reference this audio element instead of recreating the audio element in the controller itself. Now we can share this audio service with other applications, as it doesn't have any application-specific functionality tied to it.

*Player: The methods `play()` and `stop()` relate only to the functionality of playing audio and don't need to be tied to the `PlayerController`. The `PlayerController` calls the `player` services API to play the audio element rather than needing to know how to interact with the raw audio element itself.*

Now we can use the `audio` service we just created. Audio is injected into the player.

    app.factory('player', ['audio', function(audio) {
      var player = {};
      return player;
    }]);

Now we put all the logic for the player inside this service.

    app.factory('player', ['audio', function(audio) {
      var player = {
        playing: false,
        current: null,
        ready: false,

        play: function(program) {
          if (player.playing) player.stop();
          var url = program.audio[0].format.mp4.$text; // from the npr API
          player.current = program;                    // store the current program
          audio.src = url;
          audio.play();                                // play the URL
          player.playing = true;
        },

        stop: function() {
          if (player.playing) {
            audio.pause();
            player.ready = player.playing = false;
            player.current = null;
          }
        }

      return player;
    }]);

By using the `player` service, we don't need to reference our `audio` service because the `player` service will manage the audio for us.

`$rootScope`: We used this when we need to capture and event, and use `$apply` too.

We can also create methods in the player that fetches the `currentTime` and the `currentDuration` of the audio element.

    var player ...
      currentTime: function() {
        return audio.currentTime;
      },

      currentDuration: function() {
        return parseInt(audio.duration);
      }

[TODO]: OTHER_SERVICES.

# `ng-newsletter` Part 7: Routing
[link](http://www.ng-newsletter.com/posts/beginner2expert-config.html)

We can support different page views by including template code in line in the main HTML, but that will lead to unmanageable code. Rather than including multiple templates in the view (`ng-include` can help), we break out the view into a layout and template views and only show a particular view based upon the URL.

Angular allows us to break "partials" into views by declaring routes on the `$routeProvider`. We can use the browser's history API. To set up routing in the app, we specify where in our layout template we want to place the content of the new page. Ex:

    <header>
      <h1>Header</h1>
    </header>
    <div class="content">
      <div ng-view></div>
    </div>
    <footer>
      <h5>Footer</h5>
    </footer>

*The `ng-view` directive will inform the `$routeProvider` where to place the rendered template.* Then, to configure the routes, we'll configure the `$routeProvider` in our app.

