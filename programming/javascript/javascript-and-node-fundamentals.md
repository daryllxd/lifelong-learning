# Javascript Fundamentals

Expressiveness: Easy to write code that's easy to understand, both for the compiler and for a human reader. Two factors: intuitively readable constructs, and the lack of boilerplate code.

Neil Gafter: "In my mind, a language construct is expressive if it enables you to write and use an API that can't be written and used without the construct. Programmers who have become accustomed to programming with closures find them very useful for factoring out common code in ways that are not currently possible in Java.

Loose typing: String, Number (integer/real), Boolean, Undefined, Null.

Prototypal nature: No classes in JS because objects inherit directly from other objects which is called prototypal inheritance.

`this` mutates and changes a lot, especially in jQuery, so reassign to a locally scoped variable before attempting to use `this` inside of a closure.

# Coffeescript Fundamentals

In JS classes are absent at all. We use prototypes instead. CS introduces the `class` keyword.

Comprehensions: Iterating over an array:

    for a in arr
      console.log a

# Backbone.js Fundamentals

Four classes:

- Router: Mapping URL to methods.
- View: Methods related to browser/user events, HTML output
- Collection: A list of models with extra helpers such as `fetch()`
- Model: An individual data item with extra helpers

Main Router class, then all routes will be defined there.
