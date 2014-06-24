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

Anything we attach to this `$scope` object will become available to the view. Any changes that the controller makes to the model will show up as changes in the view.

To explicitly create a `$scope` object, we'll attach a controller object to a DOM element using the `ng-controller` directive on an object.

    %div{ "ng-controller" => "MyController"}

Now, `MyController` sets up a $scope.
