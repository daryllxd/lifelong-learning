# When to Use Directives Controllers, or Services in AngularJS
[link](http://kirkbushell.me/when-to-use-directives-controllers-or-services-in-angular/)

## Services

Services: Basically a nice name for Angular singletons. They are passed around regularly, ensuring that you're dealing with the same object each time, unlike factories.

We can have controllers/directives affect its values.

> Module which manages books.

    var module = angular.module("my.new.module", []);

    module.service( 'Book', [ '$rootScope', function( $rootScope ) {
      var service = {
        books: [
          { title: "Magician", author: "Raymond E. Feist" },
          { title: "The Hobbit", author: "J.R.R Tolkien" }
        ],

        addBook: function ( book ) {
          service.books.push( book );
          $rootScope.$broadcast( 'books.update' );
        }
      }

      return service;
    }]);

This contains an array of books, with a helper method to add more books. This also broadcasts an event to the application to notify anything using our service that the array has been updated, and they should do an update.

*Now we can pass this service around to the various controllers, directives, filters, or whatever else may need it--and they'll have access to these methods and properties.*

    var ctrl = [ '$scope', 'Book', function( scope, Book ) {
      scope.$on( 'books.update', function( event ) {
        scope.books = Book.books;
      });

      scope.books = Book.books;
    }];

    module.controller( "books.list", ctrl );

What happens is that every time `Book` service is updated, we also update the `books` property on the controller's local scope object.

The point is, if we need books data elsewhere, we can just reuse the `Book` service. *Having a central channel to manage all book data, and requests to modify it any way, not only is a lot cleaner--it's also much easier to manage as the application grows. It also keeps your code modular, if you need the service again, you just reuse it!*

*We use services whenever we want to share across domains. Thanks to Angular's dependency injection system, this is both very easy to do and clean.*

## Controllers

Controllers in Angular do not handle "requests" per se, unless it's  to handle routes (people call this a route controller), more specifically, they may just be managing a small subset of data.

*Controllers should be used purely to wire up services, dependencies, and other objects, and assign them to the view via scope. They're also an excellent choice when needing to handle complex business logic in your views.*

If you want to add a book, don't add a method on the controller. DOM manipulation should go into a directive.

## Directives

A common anti-pattern is adding DOM interactions to the controller. Angular defines directives as code used for DOM manipulation, but I feel it's also great for interactions.

     module.directive( "addBookButton", [ 'Book', function( Book ) {
      return {
        restrict: "A",
        link: function( scope, element, attrs ) {
          element.bind( "click", function() {
            Book.addBook( { title: "Star Wars", author: "George Lucas" } );
          });
        }
      }
     }]);

    <button add-book-button>Add book</button>

Every time this button is clicked, this will add the book Star Wars to the Book service.
