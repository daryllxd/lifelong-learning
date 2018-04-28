# What are the advantages and disadvantages of immutable data structures?
[Reference](https://www.quora.com/What-are-the-advantages-and-disadvantages-of-immutable-data-structures)
# If immutable objects are good, why do people keep creating mutable objects? [closed]
[Reference](https://softwareengineering.stackexchange.com/questions/151733/if-immutable-objects-are-good-why-do-people-keep-creating-mutable-objects)
# Pros/Cons of Immutability vs. Mutability
[Reference](https://stackoverflow.com/questions/1863515/pros-cons-of-immutability-vs-mutability)

- Advantages of I:
  - Immutable data structures are easier to reason about with.
  - Thread-safe.
  - Cannot be shared easily by references.
  - Eases out debugging because the value doesn't changes.
  - Applicable for value types, where objects don't have an identity and so they can be easily replaced.
  - `map`, `reduce`, `filter` etc. can be combined in many ways, and can replace most loops in a program.
  - A compiler can make a bunch of optimizations when dealing with immutable data because it knows the data will never change.
- Disadvantages of I:
  - ***There is a place for M: it's impractical to conceive of a system in which every change of state requires the destruction and re-composition of it, and to every object that referenced it.***
  - Object creation on modification.
  - For large objects, creating a new copy could be costly/tedious.
  - It's also more intuitive to change an existing object rather than creating a new copy of it.
  - Ex: game characters, much better to use M objects rather than I. Solution to game character: use the `Point` class (immutable) but have a mutable builder behind it.
  - It is more straightforward to model using M objects because our real-world is M.
  - M is the default for imperative languages.
  - To implement a binary search tree with I, you have to make a new tree every time.
  - Hard to implement in cyclic data structures (graphs), how can you point using objects if they can't be modified.
  - Performance impact (the GC depends on the number of objects on the heap).


# Objects Should Be Immutable
[Reference](http://www.yegor256.com/2014/06/09/objects-should-be-immutable.html)

- Immutable objects are simpler to construct, test, and use.
- Truly immutable objects are always thread safe. They will work in their own memory space in the stack.
- Help to avoid temporal coupling. Ex:

```
# This has temporal coupling, because commenting out the second and third lines lead to a bug (no compiler error, but the script will be broken)
Request request = new Request("http://example.com");
request.method("POST");
String first = request.fetch();
request.body("text=hello");
String second = request.fetch();

# Immutable way: we can remove the first one (third line), and the second one (fourth line) will still work
final Request request = new Request("");
final Request post = request.method("POST");
String first = post.fetch();
String second = post.body("text=hello").fetch();
```

- Their usage is side-effect free (no defensive companies).
- Identity mutability problem is avoided.

- They have failure atomicity.
- They are easier to cache (because you know one copy is the same as the other as long as they look the same).
- They prevent NULL references, which are bad.
