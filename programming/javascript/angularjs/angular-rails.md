# AngularJS + Rails Book

# 3: Why Angular?

*Bindings.* Angular uses binding to update content on the page.

    $http({ method: 'GET', url: 'http://some_url/books'})
      .success(function(response) {
        $scope.books = response.books
      });

## Cons

- *Binding.* Some people hate binding.
- *No model layer. Since Angular binds to native JSON, you don't need a model layer.* The path of least resistance is to have domain related services that operate on your simple JSON. Instead of `user.save()`, call `User.save($scope.user)`.
- No framework.

# 4: Hello Angular

> `angular-application.js`

    //= require_self
    //= require_tree ./angular
    AngulaRails = angular.module("AngulaRails", []);

    %select{"ng-model" => "taco.filling", "class" => "form-control", "ng-options" => "f for f in fillings"} # fillings defined as $scope.fillings
      %option{"value" => ""} Pick something # default select choice

Check boxes/radio buttons: A bit intuitive.

# 6: Models Need Dots

*The golden rule of Angular binding is that `ng-model` should be bound to models with dots.* Basically unless we use dots and shit, scope will creep itself somewhere.

# 7: AngularJS Validation

# 8: HTTP with AngularJS

    $scope.populateExpenses = () ->
      url = "/api/v1/expenses/"
      $http({method: "GET", url: url })
        .success (data) ->
          $scope.expenses = data

`$http` allows for async http requests using promises. With Angular, we can stick the JSON we get back from the http request right into the `$scope`.

To handle errors, we can use the `.error` method.

      $http({method: "GET", url: url })
        .success (data) ->
          $scope.expenses = data
        .error (data, status) ->
          $scope.searching = false
          $scope.errorMessage = 'User not found'

# 9: Talking to Rails

Rails CSRF:

    AngulaRails.config ['$httpProvider', ($httpProvider) ->
      $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token\]').attr('content')
      $httpProvider.defaults.headers.common.Accept = 'application/json'
    ]

If we have the books when we build the page, why do we need to make an AJAX call?

[TODO]: NO_AJAX_CALL_ON_CREATE.

## DELETE `/books/:id`

    %li{"ng-repeat" => "book in books"}
      .btn.btn-default{"ng-click" => "delete(book)"
        %i.icon-trash
      {{ book.title }} by {{ book.author }}

# 10: Services

    Expensify.factory 'Expense', () ->
      self = {}
      self

We are going to add a method to our service to fetch a list of books and attach the books to the passed in `$scope`.

    Expensify.factory 'Expense', ($http) ->
      self = {}

      self.getExpenses = (scope) ->
        scope.searching = true
        scope.url = "/api/v1/expenses/"
        $http({method: 'GET', url: scope.url })
          .success (response) ->
            scope.searching = false
            scope.expenses = response

      self

Inside the old controller, you can do this:

    $scope.populateExpenses = () ->
      Expense.getExpenses($scope)

While this works, we are passing `scope` into our service. Let's create an implementation that uses AngularJS promises. *AngularJS comes with a promise service called `$q`.*

# 11: Using `ng-resource` with Rails

    Expensify.factory 'Book', ($resource) ->
      $resource("books/:id")

By adding `ngResource`, we get access to the `$resource` service. The first parameter is the URL the resource will use to perform CRUD operations. We add the following methods:

    {
      'get': { method: 'GET' }
      'save': { method: 'POST' }
      'query': { method: 'GET', isArray:true }
      'remove': { method: 'DELETE' }
      'delete': { method: 'DELETE' }
    }

# Working with Angular and Rails
[link](http://rockyj.in/2013/10/24/angular_rails.html)

- Yeoman + Grunt or Rails asset pipeline?
- Use Rails-API: `$rails-api new <appname> -S -T` (no Sprockets, no RSpec)
- `$ yo angular --coffee`
- We run Rails on 3000 and Grunt on 9000.
- In production, there is no grunt connect server which we use in development. We just serve our frontend code from Apache/Nginx, so we should not hard code the full Rails URL in the frontend code.
- To solve CORS problem:

> Gemfile

    gem 'rack-cors'

> `development.rb`

    config.middleware.use Rack::Cors do
      allow do
        origins 'localhost:9000'
        resource '*', :headers => :any, :methods => [:get, :post, :options, :delete]
      end
    end

Comments:

- No more view components (asset pipeline, layouts, templates, partials, helpers, form builders).
- Rails' front-end tool set speeds up the development time enough that it is worth keeping in the stack.
- Use Sprockets to handle the load order.
- While server side views a lot of flexibility, they consume some server power, a large part of the response time in Rails is spent on building the views.
- Easier to scale/switch to Scala/Clojure backend if you want.
- Server-side templating is more mature, client-side is hard to maintain in big projects.
- I feel like many of the apps that I've worked on don't warrant the level of interactivity and complexity that Angular is suited for in 90% of the views. Most of the app can be implemented quickly in server-side views, then just drop some Angular directives in.
- If you're implementing a form that makes use of Angular, you'll end up having to make a decision between loading your data from the API or loading data from the DOM after the Rails form builder renders a form for the actual model, both wonky.

