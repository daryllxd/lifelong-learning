## Cucumber vs. RSpec
- Cucumber is good for making sure all these sort of high-level features and functionality are covered (e.g., that when your user logs in, they're taken to the right page). But it's not a good tool for testing lower-level code.
- Acceptance (failing) test -> logical failure -> unit tests (failing) -> unit tests (passing) -> feature (passing).

## Should I use TDD and BDD if my project is changing fast?
- Prototypes are done to quickly test a concept. Code quality, security, maintainability don't matter.
- Production code is expected to be more tested, reliable, easy to maintain, secure, etc. Sacrificing code quality, architecture, testing will hurt you sooner or later.
- Studies show TDD increases dev time but reduces defects.
- It also encourages more loosely coupled code.
- It highlights violations of SRP.

## BDD with Cucumber and rspec - when is this redundant?
- Using "Outside-in" testing, my process usually goes something like: Cucumber Scenario -> Controller Spec -> Model Spec. More and more I find myself skipping over the controller specs as the cucumber scenarios cover much of their functionality. I usually go back and add the controller specs, but it can feel like a bit of a chore.
- `rake cucumber:rcov` to make sure you have coverage.
- `models/libs` should be tested extensively. It needs to work in isolation.
- Either Cucumber stories or RSpec controller specs/integration tests. Generally Cucumber is better.
- Rails has a well-tested codebase already.
- Unless it is custom code, it is pointless to test the results of validations at unit and functional levels. I'd test them at the integration level though.