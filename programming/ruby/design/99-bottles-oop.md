## 99 Bottles of OOP

- OOD: If you're willing to accept increases in the complexity of your code along some dimensions, you'll be rewarded with decreases in complexity along others.
- When you divide one large class into many small ones, you can now reuse the new classes independently of one another, but it's no longer obvious how they fit together for the original case.
- Concrete vs abstract:
  - Concrete: One big procedure with a ton of `ifs`.
  - Abstract: Consists of many classes, each with one method containing a single line of code.
  - Best solution: somewhere in the middle.
- Consistency: try to make even things like conditionals consistent. Ternary or no ternary?
- Method vs message:
  - Method: defined on an object, and contains behavior. They are defined within a black box.
  - Message: Sent by an object to invoke behavior. They are passed between objects/black boxes.
- When thinking about potential expense of a bit of code:
  - How difficult was it to write?
  - How hard is it to understand?
  - How expensive will it be to change?

- Speculatively General
  - The thing with lambdas is sort of better because you know:
    - How many verse variants are there.
    - Which verses are most alike.
    - Which are most different.
    - The rule to determine which verse should be sung next.
  - Is this thing trying to be clever with the lambdas?

- Concretely abstract:
  - Can't answer how many verse variants, etc.
  - Hard to write, hard to connect everything together, and while because of the short methods, it looks easy to change, things cascade so it really isn't.
  - Extremely DRY.
  - Problem: Name methods after the concept they represent, rather than how they currently behave.

- Shameless green:
  - **The solution which quickly reaches green while prioritizing understandability over changeability.** It uses tests. It knows that DRY is good, but it also knows that temporary duplication is more manageable than incorrect abstractions.
  - "Good enough" code.
  - The code is like, you just define the edge cases first, then the actual case.
  - There are duplications, there are few abstractions, but it:
    - Is easy to write, understand, and change (even if things are duplicated, it's not that hard to keep the others in sync).
    - It answers the "how many verse variants are there", etc.
  - It seems like there is not provision to change, but the song is so unlikely to change that betting the code is "good enough" should pay off.

### Judging Code

- Opinion? Hard to measure.
- Lines of code. Deceptive.
- Cyclomatic complexity (number of execution paths). This also tells the number of tests needed for a method.
- ABC (assignments, branches, and conditions). Flog gem.

## Test-Driving Shameless Green

- Transformation Priority Premise.
- `pluralize` seems like a red herring, it looks important, but it really isn't? Just duplicate it.
  - Does the change I'm contemplating making the code harder to understand?
  - What's the cost of not doing anything?
- `def song; verses(99, 0); end` and `def verses(_, _) ... end`: It looks like `song` is redundant, but `song` imposes a single dependency: to use it you need only know its name. You at least know that you can get the song just by calling `song`.
- Intention vs implementation.
- How about just test the actual finished string vs testing a `song` vs `verse...` comparison. At least there are no dependencies/the third is independent of the current implementation. (It's hard to DRY though, but...)

## Unearthing Concepts

- Try to be as efficient as possible. "Good as necessary, but no better."
- Refactoring now means you can't solve other problems.
- SOLID:
  - Single Responsibility: The methods in a class should be cohesive around a single purpose.
  - Open-Closed: Objects should be open for extension, but closed for modification.
  - Liskov Substitution: Subclasses should be substitutable for their superclasses.
  - Interface Segregation: Objects should not be forced to depend on methods they don't use.
  - Dependency Inversion: Depend on abstractions, not on concretions.
- The `Bottles` class is not open to 6-packs requirement because adding new verse variants requires editing the conditional.
- Code smells in `Bottles`:
  - `case` (Switch Statements smell).
  - Duplicated strings (Duplicated Code smell).
- Flocking Rules:
  - Change only one line at a time, run the tests after every change.
  - Figure out which 2 cases are most alike. In `Bottles`, it's `2` and the `else` case.
  - Make the simplest change to remove that difference.

- The refactoring to include `six-pack` sort of, but doesn't really, involve pluralization, it's about defining a `container based on the number` concept (1 -> bottle, 6 -> six-pack, others -> bottles).
- Better to do tiny changes and test, rather than simultaneous changes.
- Open-Closed: We try not to edit the conditional, instead create a method to define `container`.

### Practicing Horizontal Refactoring

- Creating the `quantity` and `pronoun` methods to take care of `no more` (0 case).
- Liskov: applicable in the part where can I capitalize the `no more` or not? If I add a `capitalize` method, I break the integer part.
- Liskov: Making `quantity`, since it returns "no more" which is a string, do a `to_s` operation on the number to make it a string too. So all return types adhere to a common interface.
- Adding another abstraction, `action`.
- Applying the abstractions to all existing parts of the code.
- `successor` method to serve as another abstraction re: 0 becoming 99.

## Separating Responsibilities

- Characteristics of code:
  - Do any methods have the same shape?
  - Do any methods take an argument of the same name?
  - Do arguments of the same name always mean the same thing?
  - If you were to add `private`, where would it go?
  - If you were to break this class into two pieces, where's the dividing line?
  - Do the tests in the conditionals have anything in common?
  - How many branches do the conditionals have?
  - Do the methods contain any code other than the conditional?
  - Does each method depend more on the argument that got passed, or on the class as a whole?
- Same shape:
  - `container`, `quantity`, and `pronoun` really look alike.
  - Changes in either shape or color. Indents represent conditionals. Color changes represent changing levels of abstraction.
- Argument of the same name to represent different concepts = bad.
- Insisting upon messages: ***This code contains a deeply non-object-oriented pattern: the flocked five methods take an argument, examine it, and then supply behavior for it.***
  - As an OO practitioner, you should hate conditionals. You should feel entitled to send messages to objects, and look for a way to write code that allows you to do so..
  - You use conditionals to choose which objects to create. Not behavior to do.
- Primitive obsession.
- Extracting a class:
  - New class, COPY all the supposed methods into the new class just so the syntax works.
  - Then, do the whole `BottleNumber.new(number).container(number)` thing (something like DI the new class?).
- The point of Primitive Obsession/Extract Class is to create a smarter object to stand in for the primitive.
- Immutability advantages:
  - You are confident that what you see at creation time is always what you get later.
  - Thread safe.
  - Cost = creating new objects.
  - Cache: remember that when you save things into a variable, this variable becomes a cache. But figuring out if a cache needs to be updated is hard. If the thing you cache doesn't mutate, your local copy is good forever.
- Liskov violation: The `successor` thing.

### Replace Conditionals with Objects
