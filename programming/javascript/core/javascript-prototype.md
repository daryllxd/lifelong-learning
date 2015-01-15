## Stack Overflow: How does Javascript `.prototype` work?
[link](http://stackoverflow.com/questions/572897/how-does-javascript-prototype-work)

Every JavaScript object has an internal property called `[[Prototype]]`. *If you look up a property `(Object.propertyName)`, the runtime looks up the property in the object referenced by `[[Prototype]]` instead, and so on up the prototype chain.*

Some JavaScript implementations allow direct access to the 1`[[Prototype]]` property. In general, it's only possible to set an object's prototype during object creation. If you create a new object via `new Func()`, the objects' `[[Prototype]]` property will be set to the object referenced by `Func.prototype`.

*This allows to simulate classes in JavaScript, although JS's inheritance system is prototypal, not class-based.*

Prototype is like a model, based on which you create a product. *When you create an object using another object as it's prototype, the link between the prototype and the product is ever-lasting.* The search for the variable starts from the object itself upward through the prototype chain. When a property is written (altered), then the product is always written on the object, and if the object does not have a property already, it is implicitly created and written.

In a language implementing classical inheritance, you start by creating a class/blueprint for your objects, and then you can create new objects from that class or you can extend the class, defining a new class that augments the original class.

*In JS you first create an object (THERE IS NO CONCEPT OF CLASS), then you augment your own object or create new objects from it.*

    //Define a functional object to hold persons in JavaScript
    var Person = function(name) {
      this.name = name;
    };

    //Add dynamically to the already defined object a new getter -> Person.getName WILL NOT WORK FOR THE PROTOTYPE SINCE IT IS NOT PASSED
    Person.prototype.getName = function() {
      return this.name;
    };

    //Create a new object of type Person
    var john = new Person("John");

    //Try the getter
    alert(john.getName());

    //If now I modify person, also John gets the updates
    Person.prototype.sayMyName = function() {
      alert('Hello, my name is ' + this.getName());
    };

    //Call the new method on john
    john.sayMyName();

Another way (continuation of previous example): You can create a base object, inherit from Person, and set the prototype to Person, then you have 'inherited' from Person.
