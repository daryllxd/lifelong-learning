## JavaScript: The Good Parts

The amazing thing about JS is that it is possible to get work done with it without knowing much about the language, or even knowing much about programming. It is a language with enormous expressive power.

Good ideas: Functions, loose typing, dynamic objects, an expressive object literal notion. *Bad idea: a programming model based on global variables.*

JS's functions are first class objects with (mostly) lexical scoping.

JavaScript has a very powerful object literal notation. Objects can be created simply by listing their components. This notation was the inspiration for JSON, the popular data interchange format.

JavaScript has a class-free object system in which objects inherit properties directly from other objects. This is really powerful, but is unfamiliar to classically trained programmers. If you attempt to apply classical design patterns directly to JS, you will be frustrated. But if you learn to work with JS's prototypal nature, your efforts will be rewarded.

JavaScript depends on global variables for linkage. All of the top-level variables of all compilation units are tossed together in a common namespace called the global object. This is a bad thing because global variables are evil, and in JavaScript they are fundamental. Fortunately, as we will see, JavaScript also gives us the tools to mitigate this problem.

Numbers: No separate integer type, so 1 and 1.0 are the same value.

`NaN`: The result of an operation that cannot produce a normal result.

Statements: Blocks in JavaScript do not create a new scope, so variables should be defined at the top of the function, not in blocks.

Falsy values: `false`, `null`, `undefined`, 0, `NaN`. All other values are truthy (even 'false').

It is usually necessary to test `object.hasOwnProperty(variable)` to determine whether the property name is truly a member of the object, or was found instead on the prototypal chain.

#### Objects

Simple types: Numbers, strings, booleans, `null`, `undefined`. Numbers, strings, and booleans are object-like in that they have methods, but they are immutable.

Everything else is an object - arrays, functions.

Objects in JS are class-free. There is no constraint on the names of new properties or on the value of properties. Objects are useful for collecting and organizing data. Objects can contain other objects, so they can easily represent tree or graph structures.

The `||` operator can be used to fill in default values.

    var middle = stooge["middle-name"] || "(none)";

*Objects are passed around by reference. They are never copied.*

#### Prototype

Every object is linked to a prototype object from which it can inherit properties.

We will add a `create` method to the `Object` function. The `create` method creates a new object that uses an old object as its prototype.

    if (typeof Object.create !== 'function') {
        Object.create = function (o) {
            var F = function () {};
            F.prototype = o;
            return new F();
    };

Prototype is only
