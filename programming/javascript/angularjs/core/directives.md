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
