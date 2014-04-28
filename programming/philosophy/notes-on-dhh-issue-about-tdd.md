# Why Most Unit Testing is Waste 
[link](ihttp://www.rbcs-us.com/documents/Why-Most-Unit-Testing-is-Waste.pd)

## Summary (from Parley)

- Keep regression tests around for up to a year — but most of 
those will be system-level tests rather than unit tests.
- Keep unit tests that test key algorithms for which there is a 
broad, formal, independent oracle of correctness, and for 
which there is ascribable business value.
- Except for the preceding case, if X has business value and you can text X with either a system test or a unit test, use a system test — context is everything.
- Design a test with more care than you design the code.
- Turn most unit tests into assertions.
- Throw away tests that haven't failed in a year.
- Testing can't replace good development: a high test failure rate suggests you should shorten development intervals, perhaps radically, and make sure your architecture and design regimens have teeth.
- If you find that individual functions being tested are trivial, double-check the way you incentivize developers’ performance. Rewarding coverage or other meaningless metrics can lead to rapid architecture decay.
- Be humble about what tests can achieve. Tests don't improve quality: developers do.

## Hacker News Comments

- Easier to have a cleaner codebase if you have your own product and not client work.
- Sometimes you still need clean architecture and Rails MVC isn't enough.
- Some projects need tests, some don't.
- It is easier to write unit tests for units. If your "unit" test relies on six external APIs and your own database to work, best of luck to ya. It's not a unit test but a glue that holds other units together. Mocks/fakes do not make this stuff better because of latency/timing issues.
- If I'm being longer-term pragmatic, I'll try to keep my code relatively clean and reliable, no matter how kooky the things I'm integrating with: I create a reusable layer of code that handles layers, timeouts, partial responses, and the like, and I test that properly.
- Full system test is very slow and expensive even with Chef/Docker/Vagrant.


Extractions without service objects:

- Extract non-business logic components like API wrappers/widgets into a gem, Rails engines, jQuery plugin.
- Use existing gems
- Extract common pieces of behavior into controller/model mixins (concerns)
- Introduce value objects or split models.
- Separate algorithms into their own classes.
- Promote code reuse by having a clean API for domain logic operations.
- Group related models in modules.

