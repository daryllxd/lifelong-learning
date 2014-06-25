## Stack Overflow
[link](SO Musings)

## Josh David Miller

- Don't design your page, then change it with DOM manipulations, from the start, think what you want to accomplish, then design the view.
- Don't JQuery much!
- Think in terms of architecture: *The view is the official record of view-based functionality.* In JQuery, we have things like `$('.main-menu').dropdownMenu();` to signify that a menu is a dropdown. In Angular, we do this: `<ul class="main-menu" dropdown-menu>`. Newer developers can look at the project and see the function immediately. *We do not "find all links of a specific kind and add a directive to them". You just apply the directive already.*
- In JQuery, we respond to events and then update content. Ex: On successful AJAX call, append an HTML element. In Angular, we can do this:

    $http( '/myEndpoint.json' ).then( function ( response ) {
        $scope.log.push( { msg: 'Data Received!' } ); # Awesomesauce.
    });

    <ul class="messages">
        <li ng-repeat="entry in log">{{ entry.msg }}</li>
    </ul>

- In JQuery, we have a separate model layer.
- *Keep your concerns separate. Your view acts as an official record of waht is supposed to happen, your model represents your data, you have a service layer to perform reusable tasks, and you glue it all together with conrollers.*
- Dependency injection: You declare components very freely and then from any other component, just ask for an instance of it and it will be granted.
- If we require a service that implements server-side storage via REST, when running tests on the controllers, we don't want to have to communicate with the server. We just add a mock service of the same name as the original component, and the injector will ensure that our controller gets the fake one automatically.
- *Only do DOM manipulation in a directive.* But if a directive is like a "widget", it should respect separation of concerns. If a directive is like a "widget" and has a template, it should also respect separation of concerns. The template too should largely independent from its implementation in the link and controller functions.
- While Angular has `ngClass` and `ngBind` and `ngShow`, we can do awesomeness without DOM manipulation. The less DOM manipulation, the easier directives are to test.
- Don't use directives as the place to throw in a bunch of jQuery. BTW, before doing DOM manipulation anywhere, ask yourself if you really need to, there might be a better way. Ex, toggle button:

    .directive( 'myDirective', function () {
        return {
            scope: true,
            template: '<a class="btn" ng-class="{active: on}" ng-click="toggle()">Toggle me!</a>',
            link: function ( scope, element, attrs ) {
                scope.on = false;

                scope.toggle = function () {
                    scope.on = !scope.on;
                };
            }
        };
    });

- *Directives aren't collections of jQuery-like functions. Directives are actually extensions of HTML. If HTML doesn't do something you need it to do, you write a directive to do it for you.* If Angular doesn't do something out of the box, think how the team would accomplish it to fit right in with `ngClick`, `ngClass`, et al.

## Superluminary

- *Angular gives you a set of tools to produce webapps. JQuery gives you tools for modifying the DOM.* Prefer templates where possible, though.
- In Angular, custom attributes are everywhere. Your HTML will be littered with `ng-attributes`, essentially `onClick` attributes on steroids. These are directives, and are one of the main ways in which the template is hooked to the model. In Angular, your HTML5 is a template. It is compiled by Angular to produce your web page.
- *To JQuery, your web page is a DOM to be manipulated. To Angular, your HTML is code to be compiled. Angular reads in your whole webpage and literally compiles tit into a new web page using it's built in compiler.*
- We use custom attributes with meaningful names and we make up new HTML elements with meaningful names. A designer should be able to read your Angular template and understand what it is doing.
- Because Angular compiles the DOM, Angular treats your HTML as code. You write Angular components, and Angular will take care of pulling them in and making them available at the right time based on the structure of your template.
- Separation of concerns vs. MVC: Models are JSON objects. Views are written in HTML. Controllers are a JavaScript function which hooks the view to the model.
- *Plugins vs. directives.* Plugins extend JQuery. Angular directives extend the capabilities of your browser. JQuery carousel: define an unordered list of figures wrapped in a `nav`, then write some JQuery to find the list on the page and restyle it as a gallery with timeouts for the animation.
- In Angular, we define directives. *A directive is a function which returns a JSON object. This object tells Angular what DOM elemnts to look for, and what changes to make to them. Directives are hooked in to the template using either attributes or elements, which you invent. The idea is to extend the capabilities of HTML with new attributes and elements.* If you want a carousel, define a directive to pull in a template, and make it work.
- Closures vs scope. JQuery plugins are created in a closure. In that closure, you have access to the set of DOM nodes, plus any local variables defined in the closure and any globals you have defined, so plugins are self-contained.
- Angular has `$scope`, which store your model. Some directives spawn a new `$scope`, accessible from the controller and the view.
- Because the structure of `$scope` inheritance follows the structure of the DOM, elements have access to their own scope, and any containing scopes. You can modify the `$scope` of a dropdown or you can modify the global scope for some user preference thingie.
- AJAX is done by default using `ng-include`, applying a template, or wrapping an AJAX call and creating a service.
- Angular gives you modules into which you can place your code. To get simple code reuse, you can just include a module.
- Services are singletons, meaning there is only one of each type of service. A service is an object that contains data and methods.

## Mark Rajcok

Imperative vs declarative. In JQuery, selectors are used to find DOM elements and bind event handlers to them. In Angular, you think about views rather than DOM elements. Views are (declarative) HTML that contain directives. These set up the event handlers behind the scenes for use and give us dynamic data binding.

*In Angular, think about models, rather than JQuery-selected DOM elements that hold your data. Think about views as projections of those models, rather than registering callbacks to manipulate what the user sees.*

- Think about your models. Create services our your own JavaScript objects for those models.
- Think about how you want to present your models (your views). Create HTML templates for each view, using the necessary directives to get dynamic data binding.
- Attach a controller to each view using `ng-view` or `ng-controller`. Have the controller find/get only whatever model data the view needs to do its job. Make controllers as thin as possible.

## Dan, Scott Rippey, Samuel

- Controllers and providers are for modifying the data model, not HTML.
- HTML and directives define the layout and binding to the model.
- If you need to share data between controllers, create a service or a factory.
- *Angular changes the way you find elements. In JQuery, you spend a lot of time finding elements, in Angular, you use directives to wire them all up. In fact, the primary difference between `jqLite` and `jQuery` is that the lite doesn't support selectors. This is because Angular doesn't need/want you to use selectors.*
- In JQuery, you have to think about CSS selectors, but in AngularJS, you will find yourself thinking like "what model am I dealing with", "will I set this models' value to true".
- In JQuery you will call the functions a lot, in AngularJS, it will call your functions, so AngularJS will tell you "how to do things".
