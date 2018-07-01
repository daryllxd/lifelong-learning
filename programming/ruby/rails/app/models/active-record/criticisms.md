# Invalid Object Is An Anti-Pattern
[Reference](http://solnic.eu/2015/12/28/invalid-object-is-an-anti-pattern.html)

- The problem with an object that validates it's own state: it makes it easier for invalid state to leak into the system.
- Because AR accepts invalid state, their lack of type safety makes them a shaky foundation for building complex systems.
  - You can't treat them as values as they are mutable.
  - You can't rely on their state because it can be invalid.
  - You can't treat them as canonical sources info because their state depends on the query logic which can be dynamic as the example above shows.
- Type safety: better to validate data at the boundaries of the system, and making sure than core, foundational objects are always valid is another thing.
