# Tell Don't Ask
[Reference](https://pragprog.com/articles/tell-dont-ask)

- ***As the caller, you should not be making decisions based on the state of the called object that result in you then changing the state of the object. The logic you are implementing is probably the called object’s responsibility, not yours. For you to make decisions outside the object violates its encapsulation.***
- Design classes based on their responsibility, so you can progress to specifying commands that the class may execute, as opposed to queries that inform you as to the state of the object.
- Try to ensure a correct division of responsibility that places the right functionality in the right class without causing excess coupling to other classes.
- The fundamental principle of OOP is the unification of methods and data. Splitting this up inappropriately gets you right back to procedural programming.
- To minimize coupling, expose the minimum amount of state necessary.

## Law of Demeter for Methods

- Any method of an object should only call methods belonging to:
  - Itself.
  - Any parameters that were passed in to the method.
  - Any objects it created.
  - Any composite objects.

- Ex: The problem with this:

```
SortedList thingy = someObject.getEmployeeList();
thingy.addElementWithKey(foo.getKey(), foo);
```

- Exposes that `someObject` holds employees in a `SortedList`, that it's add method is `addElementWithKey()`, `foo`'s method to query its key is `getKey()`.
- Try to just implement it like this:

```
someObject.addToThingy(foo)
```

- Just to make sure that you can add a `foo` to a `thingy`, which sounds high level enough to have been a responsibility and not too dependent on implementation.
- Disadvantage: you write many small wrapper methods that do little but delegate container traversal.

## CQRS

- To ask is a query, to tell is a command.
