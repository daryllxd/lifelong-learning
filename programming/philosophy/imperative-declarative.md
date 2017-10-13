## Imperative vs Declarative Programming
[Reference](https://tylermcginnis.com/imperative-vs-declarative-programming/)

- How do I get to your house?
  - Imperative: Take a left and a right.
  - Declarative: I live at Somewhere.
- All declarative approaches have sort of imperative abstraction layer--if you have an address, you still do imperative things to get to the house. It's like you have a GPS that automatically knows how to go there, but the GPS was still programmed imperatively.
- Declarative: SQL, HTML. `SELECT * FROM Users WHERE Country=’Mexico’;` and `<p>Hello</p>` both describe what you're trying to achieve.
- Imperative double: `results = []; for... return results`. Declarative double: `arr.map((item) => item * 2)`.
- We still use the imperative `map` method but if you are used to `map` you know what it does.
- Imperative button toggle: `if highlighted .. else ...`. Declarative button toggle: `Btn onToggleHighlight =..., highlight = ...`.
- "Declarative programming is “the act of programming in languages that conform to the mental model of the developer rather than the operational model of the machine”."
- "In computer science, declarative programming is a programming paradigm that expresses the logic of a computation without describing its control flow."
