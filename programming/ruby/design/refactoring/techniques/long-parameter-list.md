## Long Parameter List
[Reference](https://refactoring.guru/smells/long-parameter-list)
[Reference](http://www.informit.com/articles/article.aspx?p=102271&seqNum=5)
[Reference](https://stackoverflow.com/questions/4747652/long-parameter-list-in-constructor-in-java?lq=1)

- This usually happens after several types of algorithms are merged in a single method.
- A long list may have been created to control which algorithm will be run and how.

### Treatment

- Group the arguments together.
- Switch from constructor to property setters (either in the class or with a builder).
- Preserve whole object. This is if the parameters come from one object only
- Introduce parameter object: you create an entire object that represents the parameters you are passing.
  - By consolidating parameters in a single class, you can also move the methods for handling this data there as well, freeing the other methods from this code.
  - **Identical groups of parameters scattered here and there create their own kind of code duplication: while identical code is not being called, identical groups of parameters and arguments are constantly encountered.**
  - Create a new class that will represent your group of parameters. Then in the old classes, add the new parameter and try to make it work.
- Consider a Builder class:
  - `Foo foo = new FooBuilder().setName(name).setPath(path).build()`
