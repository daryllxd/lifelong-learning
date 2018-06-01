# Why are side-effects considered evil in functional programming?
[Reference](https://softwareengineering.stackexchange.com/questions/15269/why-are-side-effects-considered-evil-in-functional-programming)

- ***A program without side effects is useless, so side effects are neither evil nor taboo. But FP encourages delimiting the code with side effects, so as large a part of the code as possible are side-effect free functions.***
- Pure functions make it easier to reason about the program.
- Easier to compose those functions to create new behavior.
- Easier to test and to reuse.
- Memoization.
- Functions without side effects can trivially be executed in parallel, while functions with side effects require some sort of synchronization.
- You can even use a result cache for functions without side effects, because there are no side effects.
- Common sub-expression elimination.
- TODO: ...

# Why functional languages? [closed]
[Reference](https://stackoverflow.com/questions/36504/why-functional-languages)

- Side-effect functions as a basic building block in the language.
- Order of execution is not important! In Erlang, this enables concurrency in a very transparent way.
- Disadvantage: the lack of side-effects: how do you write useful software without IO?
- (Aside) Quicksort: Still the fastest general-purpose sort.
- OO can write clean code that favors immutable objects (functional concepts).
- Any program that you can write with a functional style can be written in non-functional style.
