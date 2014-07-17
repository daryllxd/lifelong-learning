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
- `ng-include`: Use this to fetch, compile, and include an external HTML fragment into your current application. (The URL of the template is restricted to the same domain/protocol unless whitelisted or wrapped as a trusted value.

    <div ng-include="'/myTemplateName.html'" ng-controller="MyController" ng-init="name = 'World'">Hello {{ name }} </div>

- `ng-switch`:

    <div ng-switch on="person.name">
      <p ng-switch-default>And the whinner is</p>
      <h1 ng-switch-when="Ari">{{ person.name }}</h1>
    </div>

- `ng-view`: This directive sets the view location in the HTML where the router will manage and place the view elements for different routes.
- `ng-if`: Use this to completely remove or recreate an element in the DOM based on an expression. If false, the element is removed, otherwise a clone of the element is reinserted into the DOM.
- `ng-if` differs from `ng-show` and `ng-hide` in that it actually removed and recreates DOM nodes, rather than just showing and hiding them via CSS. When an element is removed from using `ng-if`, its associated scope is destroyed. When it comes back into being, a new scope is created and inherits from its parent scope using prototypal inheritance.
- `ng-repeat:` *Use this to iterate over a collection and instantiate a new template for each item in the collection. Each item in the collection is given its own template and therefore its own scope. Special properties exposed:*

    $index: Iterator offset of the repeated element (0..length-1)
    $first, $middle, $last
    $even, $odd

    <ul ng-controller="PeopleController">
      <li ng-repeat="person in people" ng-class="{even: !$even, odd: !$odd}">
        {{person.name}} lives in {{person.city}}
      </li>
    </ul>

- `ng-init`: Use this to set up state inside the scope of a directive when that directive is invoked. (This is usually just for educational purposes, better to create a controller and set up state within a model object.)
- `ng-bind`: Nearly the same as `{{}}`, except that you won't see something like `Hello, {{user.name}}` while the data is being loaded. Also, `{{}}` is much slower. `ng-bind` is a directive and will place a watcher on the passed variable.
- `ng-cloak`: Alternative to `ng-bind`, use this on the element on the element containing `{{ }}`:

    %p{"ng-cloak" => ""} {{ greeting }}

- `ng-bind-template`: We can use this if we want to bind multiple expressions to the view.

    %div{"ng-bind-template" => "{{ message }} {{ name }}"}

- `ng-model`: This binds an `input`, `select`, `textarea`, or custom form control to a property on the surrounding scope. It handles and provides validation, sets related CSS classes on the element (`ng-valid`, `ng-invalid`, etc.) and registers the control with its parent form.
-  `ng-show/ng-hide`: Shows or hides the given HTML element based on the expression provided to the attribute.
- `ng-change`: Evaluates the given expression when the input changes. Since we deal with input, we use this in conjunction with `ngModel`:

    %div{"ng-controller" => "EquationController"}
      %input{"type" => "text", "ng-model" => "equation.x", "ng-change" => "change()"}
      %code{{ equation.output }}

    angular.module('myApp', [])
      .controller('EquationController', function($scope) {
        $scope.equation = {};
        $scope.charge = function() {
          $scope.equation.output = Number($scope.equation.x) + 2;

- `ng-form`: We use this when we need to nest a form within another form. The normal HTML `form` tag doesn't allow us to nest our forms, but `ng-form` will.

CSS classes set automatically:

    ng-valid, ng-invalid, ng-pristine, ng-dirty

Angular will not submit the form to the server unless the form has an `action` attribute specified. To specify which JS method should be called when a form is submitted, you use one of these directives:

    ng-submit on the form element
    ng-click on the first input[type=submit])

To prevent double execution of the handler, use `ng-submit` or `ng-click` directives. In the following examples, we want to dynamically generate a form based on a JSON response from the server:

    angular.module('myApp', [])
      .controller('FormController', function($scope) {
        $scope.fields = [
          {placeholder: 'Username', isRequired: true},
          {placeholder: 'Password', isRequired: true},
          {placeholder: 'Email (optional)', isRequired: false}
        ]
      }

      $scope.submitForm = function() {
        alert('it works');
      }

    %form{"name" => "signup_form", "ng-controller" => "FormController", "ng-submit" => "submitForm()", "novalidate" => ""}
      %div{"ng-repeat" => "field in fields", "ng-form" => "signup_form_input"}
        %input{"type" => "text", "name" => "dynamic_input", "ng-required" => "field.isRequired", "ng-model" => "field.name", "placeholder" => "{{field.placeholder}}"}
        %div{"ng-show" => "signup_form_input.dynamic_input.$dirty && signup_form_input.dynamic_input.$invalid"}
          %span.error{"ng-show" => "signup_form_input.dynamic_input.$error.required"} This field is required.
      %button{"type" => "submit", "ng-disabled" => "signup_form.$invalid"} Submit all

- `ng-select`: Use this to bind data to an HTML `<select>` element. This directive is usually used in conjunction with `ng-model` and `ng-options`.

    %div{"ng-controller" => "CityController"}
      %select{ "ng-model" => "city", "ng-options" => "city.name for city in cities"}
        %option{"value" => ""} Choose City
      Best City: {{ city.name }}

    angular.module('myApp', [])
      .controller('CityController', function($scope) {
        $scope.cities = [
          {name: 'Seattle'}, {name: 'San Francisco'}, {name: 'Chicago'}...

- `ng-class`: Dynamically sets the class of an element by binding an expression that represents all classes to be added. Duplicate classes will not be added.

    %div{"ng-controller" => "LotteryController"}
      %div{"ng-class" => "{red: x > 5}" "ng-if" => "x > 5"} You won!

# `ng-book` Directives Explained

*The simplest way to think about a directive is that it is simply a function that we run on a DOM element. The function is expected to provide extra functionality on the element.*

The `ng-click` directive gives an element the ability to listen for the `click` event and run an Angular expression when it receives the event. Directives are what makes the Angular framework so powerful, and we can also create them.

    angular.module('myApp')
      .directive('myDirective',
        function($timeout, UserDefinedService) {
          // directive definition goes here
        })

- `name` (string): The name of the directive as a string that we'll refer to inside of our views.
- `factory_function` (function): *The factory function returns an object that defines how the directive behaves.* It is expected to return an object providing options that tell the `$compile` service how the directive should behave when it is invoked in the DOM.

    angular.module('myApp')
      .directive('myDirective',
        function($timeout, UserDefinedService) {
          // directive definition goes here
          return {
            // directive definition defined via options which we'll override here
          }
        })

- We can also return a function instead of an object to handle this directive definition, but it is best practice to return an object as we've done above.
- When a function is returned, it is often referred to as the `postLink` function, which allows us to define a function instead of an object. (This limits our ability to customize our directive, and, thus, is good for only simple directives.)
- When Angular bootstraps our app, it will register the returned object by the name provided (first argument), and look for elements/attributes/comments/class names using that name when looking for these directives.

*To avoid collision with future HTML standards it's best practice to prefix a custom directive with a custom namespace (Angular uses the `ng-` prefix.)*

## Possible options for Angular directives and their return types

    angular.module('myApp', [])
      .directive('myDirective', function() {
        return {
          restrict: String,
          priority: Number,
          terminal: Boolean,
          template: String or Template Function: function(tElement, tAttrs) { ... } ,
          templateUrl: String,
          replace: Boolean or String,
          scope: Boolean or Object,
          transclude: Boolean,
          controller: String or function(scope, element, attrs, transclude, otherInjectables) { ... },
          controllerAs: String,
          require: String,
          link: function(scope, iElement, iAttrs) { ... },
          compile: return an Object or
            function(tElement, tAttrs, transclude) {
              return {
                pre: function(scope, iElement, iAttrs, controller) { ... },
                post: function(scope, iElement, iAttrs, controller) { ... },
              }
              // or
                return function postLink(...) { ... }

*Restrict (string).* `EACM` (element, attribute, class, comment). Suggested to use attributes because they work across all browsers, including older versions of Internet Explorer.

*Priority (number).* Most directives omit this option, in which case it defaults to 0. `ngRepeat` sets this at 1000 so it always gets invoked before other directives on the same element. Higher priority = invoked first, if same priority, then the first directive invoked on the element is invoked first. *`ngRepeat` has the highest priority of any built-in directive.*

*Terminal (boolean).* This is only relevant for directives on the same HTML element. This tells Angular to skip all directives on the element that comes after it (lower priority). If there is 1, 10, and 100, and terminal on 10, then 1 will not be applied.

*Template (string|function).* Optional, if provided, it must be set to either a string of HTML or a function that takes two arguments, `tElement` and `tAttrs`, and returns a string value representing the element.

      template: '\
        <div> <-- single root element ->\
          <a href="http://google.com">Click me</a>\
          <h1>When using two elements, wrap them in a parent element</h1>\
        </div>\

- Since we have two nodes, wrap it in a parent element. Also, we have backslashes at the end of each line, so that Angular can parse multi-line strings correctly. Production code would rather that we use `templateUrl` because multi-line strings are a nightmare to look at and maintain.

*`templateUrl` (string|function).* Optional, must be either a path to an HTML file, or a function that takes two arguments, `tElement` and `tAttrs`, the function must return the path to an HTML file as a string. These are passed through the built-in security layer that Angular provides (`$getTrustedResourceUrl`).

The HTML file will be requested on demand via Ajax when the directive is invoked. (When developing locally, we should run a server in the background to serve up the local HTML templates from the file system. Failing to do so will raise a CORS error.

Template loading is asynchronous (compilation and linking are suspended until the template is loaded). It is possible to cache one or more HTML templates prior to deploying an application. Caching is a better option is most cases because Angular doesn't need to make an AJAX request then.

*Replace (boolean).* If provided, it must be set to `true`, since it is set to `false` by default. Normally a directive's template is rendered as a child of the div:

    <div some-directive>Stuff</div>

If we set replace as true:

    replace: true
    template: '<div>Stuff</div>'

    <div>Stuff</div>

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
