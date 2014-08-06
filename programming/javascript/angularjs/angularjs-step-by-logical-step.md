# AngularJS: Step by Logical Step
[link](http://nicholasjohnson.com/angular-book/)

- Get live streams of data from across the Internet and mash them into your page.
- Construct your pages in modules that download asynchronously.
- Create tabs, dynamics forms, live comment streams, other features.
- AJAX with content and integrate it onto your page with stealth and grace.

Angular = purely front-end. *Your server only needs to be able to ship out JSON to be able to talk to Angular.*

We store values in a Model (ex: item in shopping cart). We then keep the value synchronized with the View, which in Angular is an HTML page. When the model updates, your view also updates as if by magic. *The model can be pulled from anywhere from the Internet (it's just a JSON object).*

The controller (which itself is a function) helps use hook the Model and View together.

## Why Angular Rocks

- Round trip data-binding: Update your JSON model, even via AJAX, and your web page updates automatically.
- Your models are just JSON. Your controllers are just functions.
- Dependency injection with named function parameters: Angular magically extends the capabilities of JS with named function parameters. *Name your variables correctly, and Angular will automatically populate them for you with objects you can use!*
- AJAX. Pull in any JSON feed from anywhere on the Internet. Angular will automatically integrate it into your template for you.

## Angular vs. JQuery

- *Semantic HTML vs. Angular Templates.* JQuery: Your HTML page should contain semantic meaningful content. If JS is turned off, your content is still accessible. Angular treats your HTML page as a template. The template is compiled by the Angular app. With JS turned off, your template will not be compiled and your page will be almost completely blank.
- *Unobstrusive JS vs. JS Application.* JQuery is unobstrusive: JS is linked in the header, and this is the only place it is mentioned. *Angular is highly obstrusive. Your HTML will be littered with `ng` attributes, which are essentially `onClick` attributes on steroids. Your HTML makes no sense without hte JS backing it because the meaning of the page resides in the model, rather than the view.*
- *Separation of concerns vs. MVC.* Angular does not care about HTML/CSS/JS separation. It instead implements an MVC pattern: models (semantic data), views (HTML, not semantic because the data is in the model), controllers (a JavaScript function which hooks the view to the model).
- *Plugins vs. Directives.* Plugins extend JQuery, angular directives extend HTML. In JQuery we define plugins by adding functions to the `jQuery.prototype`. We then hook these into the DOM by selecting elements and calling the plugin on the result. In Angular, we define directives. *A directive is a function which returns a JSON object.* The idea is to extend the capabilities of HTML with new attributes and elements.
- *Closure vs. `$scope`.* JQuery plugins are created in a closure: privacy is maintained within that closure. It's up to you to maintain your scope chain within that closure. Angular has `$scope` objects. Some directives will spawn a new scope, which can optionally inherit from it's wrapping `$scope`.

## How does Angular do MVC?

Model: Basically anything. View: HTML5 file, it contains special directives and Angular code which are compiled into more HTML by Angular. Controller: Just functions.

The `$scope` object is used to store models. The same `$scope` object is available in the view and the controller. Scope objects inherit from each other, so you might store an object in the global `$scope` object, or in a nested `$scope` object which only applies in a particular loop for example.

## Templates (Views)

The front-end of an Angular app is the view, or the template. In Angular, a template is just an ordinary HTML5 file. Angular takes this HTML file, scans it for directives/template commands, and compiles it.

*Advantages:* We can include special attributes/elements which act as instructions to the compiler. We can write Angular scripts right into the page. We can use the nested structure of the DOM to provide variable scope. We can include additional templates on the page really easily.

*Downsides.* The HTML5 is no longer semantic, you need JS to make the page work, you need to do stuff to make your site work with search engines.

## Dependency Injection (DI)

This means passing an object it's instance variables, rather than having to construct them itself

> No DI:

    var myFunction = function() {
      var a = 12;
      alert(a);
    }
    myFunction();

> With DI:

    var myFunction = function(a) {
      alert(a);
    }
    myFunction(12);

Code written this way is more modular, less prone to spaghettification, and is easier to test as you pass in mock objects.

Angular's DI: Your function headers are actually inspected, and dependencies are provided to them automatically. When we pass in the `$scope` variable, this becomes available to us, and we can pull variables from it.

*This is why the variable name is important! Angular knows what to pass in just by looking at the name of the variable.*
