# Value Object

- Represent values, and answers questions about the value.
- *A value object is a value object as long as it takes a value in the constructor and the only things it does is to tell you things about that value.* By some definition, it may not mutate.
- New primitive, you can have methods inside and you can pass them around.
- They can be immutable.
- Ex of use: equality, `Comparable`, `Enumerable`.

## Value Objects Explained with Ruby
[Reference](https://www.sitepoint.com/value-objects-explained-with-ruby/)

- The rule: the attributes of a value object will remain unchanged from instantiation to the last state of its existence.
- Implementing a Value Object:
  - Multiple attributes.
  - Attributes should be immutable throughout its life cycle.
  - Equality is determined by its attributes and type.
