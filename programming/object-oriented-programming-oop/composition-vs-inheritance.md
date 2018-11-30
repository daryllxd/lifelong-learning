# Composition vs. Inheritance: How to Choose?
[Reference](https://www.thoughtworks.com/insights/blog/composition-vs-inheritance-how-choose)

- Class: named concept in the domain space, with an optional superclass, defined as a set of fields and methods.
- Inheritance: a class may inherit (actually, use by default), the fields and methods of its superclass. Inheritance is transitive, so a class may inherit from another class which inherits from another class, and so one, up to a base class. Subclasses may override some methods and/or fields to alter the default behavior.
- Composition: a Field's type can be a class, and this can hold to a reference to another object. ***It's making a class use another object to provide some or all of its functionality.*** The purpose of composition: make wholes out of parts.
