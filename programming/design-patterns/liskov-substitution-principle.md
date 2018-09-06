# Understanding SOLID Principles: Liskov Substitution Principle
[Reference](https://codeburst.io/understanding-solid-principles-liskov-substitution-principle-e7f35277d8d5)

- Objects should be replaceable with instances of their subtypes without altering the correctness of that program.
- When you pass a subclass of an abstraction, you need to make sure you don't alter any behavior or state semantics of that parent abstraction.
- *If not, then unit tests for the superclass would never succeed for the subclass. That will make your code difficult to test and verify.* This usually happens when you modify unrelated internal or private variables of the parent object that are used in other methods.
- To avoid weird cases, it's recommended to call public parent methods to get your results in the subclasses and not directly using the internal variables.
- Also try to keep your base Abstractions as simple and minimal as possible, making it easy to extend by the subclasses. No point in making a fat base class.
