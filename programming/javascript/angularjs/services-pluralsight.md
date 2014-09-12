# Angular JS Step-by-Step: Services
[link](http://blog.pluralsight.com/angularjs-step-by-step-services)

Service = a simple object that does some sort of work. *The type of service is typically stateless and encapsulates some sort of functionality.* The main public members of a service are functions, not properties, especially since having properties suggest some sort of state.

The service may or may not be accessed over-the-wire. Most often, they're just objects called directly within your JavaScript.

SRP and DIP are related to services. DIP: Objects should depend on abstractions, not concretions. IN C#/Java, this means your objects depend on interfaces, not classes. In JS, you could look at any parameter of any function as an abstraction, since you can pass in any object for that parameters as long as it has the members on it that are used within that method.

*All of your controllers, directives, filters, and other services should take in any external dependencies as parameters during construction.*

