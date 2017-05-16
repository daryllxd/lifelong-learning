## Ruby data object comparison
[Reference](http://palexander.posthaven.com/ruby-data-object-comparison-or-why-you-should-never-ever-use-openstruct)

- OpenStruct is really bad performance wise.
- 2015: OpenStruct is still really bad, Hash/Struct/Class are very near to each other (Class-Struct-Hash fastest to slowest).

## When to use or not use structs?
[Reference](https://www.reddit.com/r/ruby/comments/6a4j7x/when_to_use_or_not_use_structs/)

- Classes where the only methods are the accessors.
- Structs suggest a data container.
- Structs are not as performant as hashes.
- No keyword-argument initializers, no clear definition if structs can be converted to hashes and back or not.
- Structs are lightweight data containers with some convenient data manipulation possibilities.

## Struct inheritance is overused
[Reference](https://thepugautomatic.com/2013/08/struct-inheritance-is-overused/)

- *Struct arguments are not required.* If this is not what you want, then don't inherit from struct.
  - Struct creates public accessors.
  - Data container--It has `members`, `values`, `length`.
  - Structs are equal if their attributes are equal.
  - Structs don't want to be subclassed.
