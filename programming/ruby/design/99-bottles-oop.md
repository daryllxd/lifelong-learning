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
