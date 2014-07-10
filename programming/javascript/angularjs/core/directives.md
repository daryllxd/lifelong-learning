# `ng-book` Introduction to Directives

Directives are Angular's method of creating new HTML elements that have their own customer functionality. *Directives can be combined with other directives and attributes (composition).*

When the browser loads our HTML page along with Angular, we only need one snippet of code to boot our Angular application. In our HTML we need to mark up the root of our app using the built-in directive `ng-app`. Normally we put this in the opening `html` tag.

Inside of our `<html>` element, we can now use any of the built-in or custom directives we want. Also, the directives we use within this root element will have access to `$rootScope` as a result of the prototypical inheritance of JS *only if the method of the directive has access to scope. Access to scope means that scope has been linked to the DOM.*

    angular.module('myApp', [])
      .directive('myDirective', function() {
        return {
          restrict: 'E',
          template: '<a href="http://google.com">Click me to go to Google</a>'
        }

*We register new directives by providing a name as a string, and a function. THE NAME OF THE DIRECTIVE SHOULD ALWAYS BE pascalCased, AND THE FUNCTION WE PROVIDE SHOULD RETURN AN OBJECT. The Angular directive in HTML is `my-directive`, but the directive definition must be `myDirective`.*

What happens is:

    <my-directive>
      <a href="http://google.com">Click me to go to Google</a>
    </my-directive>

By default, Angular nests the HTML provided by our template string inside of our custom HTML tag `<my-directive>` in the generated source code. To remove the custom element completely, we have `replace: true`.

Restricting

- E: Element `<my-directive>`
- A: Attribute `<div my-directive>`. A good rule of thumb to follow is to always declare our directive as an attribute.
- C: Class `<div class="my-directive">`
- M: Comment `<!-- directive: my-directive -->`

Expressions: When we do things like `ng-init="greeting = 'Hello World'"`, we pass greeting into the `$scope` variable. Then, we evaluate the expression inside the brackets.

## `ng-controller`

This directive exists for the purpose of creating a new child scope in the DOM. Basically inside of this controller, you can exist everything inside the controller's scope, the parent's scope, and the root scope. Other directives like `ng-include` and `ng-view` also do this.

## Passing Data into a Directive

We can do this:

    template: '<a href="{{myUrl}}">{{myLinkText}}</a>'
    <div my-directive my-url="http://google.com" my-link-text="Click me to go to Google"></div>

[TODO]: ISOLATE_SCOPE.

# `ng-book`: Built-in Directives


- `ng-disabled="someProperty"`
- `ng-readonly`
- `ng-checked`
- `ng-selected`
- `ng-href`: When dynamically creating a URL, always use `ng-href` instead of `href`. *By using href, Angular waits for the interpolation to take place before the user can click on the link.*
- `ng-src`: Same as `ng-href`.

## Directives with Child Scope

- Placing `ng-app` on any DOM element marks that element as the beginning of `$rootScope`.
- In JavaScript you access the `$rootScope` via the `run` method:

    angular.module('myApp', [])
      .run(function($rootScope) {
        $rootScope.someProperty = 'hello';
      });

- `ng-controller`: Its purpose is to provide child scopes for the directives nested inside.










# Build custom directives with AngularJS
[link](http://www.ng-newsletter.com/posts/directives.html)

Directives are, at their core, functions that get run when the DOM is compiled by the compiler. Using this powerful concept, AngularJS enables us to create directives that we can encapsulate and simplify DOM manipulation. We can create directives that modify or even create new behavior in HTML.

When Angular loads, it will traverse the DOM elements looking for directives associated with each DOM element. Once it's found all of them, it will then start running the directive and associate it with the DOM element.

## Invocation

- Attribute : `<span my-directive></span>`
- Class: `<span class="my-directive: expression;"></span>`
- Element: `<my-directive></my-directive>`

    <input type="text" ng-model="directivename" placeholder="name" />
    <span ng-bind="directivename"></span>
    <span ng:bind="directivename"></span>
    <span ng_bind="directivename"></span>
    <span x-ng-bind="directivename"></span>
    <span data-ng-bind="directivename"></span>

Directive for spark line:

    app.directive('ngSparkline', function() {
      return {
        restrict: 'A',
        template: '<div class="sparkline"></div>'
      }
    });

Then we'll invoke it in our html: `<div ng-sparkline></div>`

*Notice that the name of the directive is not the same as the name of the invoke. Angular will handle translating the camel cased name when we define it to the snake case when we invoke it.*
