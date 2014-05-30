# Breaking up with your test suite
[link](http://blog.testdouble.com/posts/2014-05-25-breaking-up-with-your-test-suite.html)

I love customers, I love coding, I love testing. But I don't write for tests' sake. Kent Beck: "I get paid for code that works, not for tests, so my philosophy is to test as little as possible to reach a given level of confidence." But neither is coding, we don't code for code's sake. BTW if it is cheaper to solve a problem without coding, then that is what I'll do.

How do you cheat on customers?

1. Uncritically assume your favorite way to write code applies to every situation.
2. There is no step 2.

I think we have to challenge our biases in each new context to grow.

Remember: Test all the Freaking Time (TATFT).

Why do we test?

Confidence:

- Know that my code works
- Safely change and refactor
- Verify that production is working
- Ensure the behavior of other's services
- Safeguard our use of 3rd-party code

To understanding the design of the systems:

- Keep the product simple
- Make the public API easy to use
- To grow a maintainable private API
- Validate our code is useful to others
- Make the public API easy to use

How do we assign responsibility to the tests? Ask yourself these:

- Why does this test exist?
- What type of test is this?
- How should tests be written in this code base?

Unclear tests cost money. Unclear tests must constantly have their purpose rediscovered, rules are renegotiated, and we change behavior.

*I propose that every suite should promote at most 1 type of confidence, and at most 1 type of understanding.*

In terms of testing Rails, we have Omakase (Minitest to test UI-Controllers-Models), "Prime Rails" (Cucumber to test UI, Rspec to test MVC), and "Fast Specs" (POROS which are depended upon by the Rails app).

The problem is that when you change something in the model layer, change ripples to the top layers and you need to rewrite other tests.

The greatest test of all is: "Does the test solve the purpose of the software?" Is the software we write done to increase revenue or to reduce costs?

Smoke/acceptance/feature/acceptance/end-to-end (SAFE) tests?

The user should probably be as close to the real use as possible. If web application, then use web automation. If HTTP service, we should have something that talks to HTTP. But basically, we want to answer: "How simple is our product?", because if we can't fit all the tests of our product in 30 mins, then the product is complex. But if we can't write a test in 30 minutes, maybe the app is complicated.

SAFE tests shouldn't know internal APIs. Web tests should bind to user-visible text, not markup. We also force a timebox in the total time of SAFE tests.

BTW, failures due to refactors are false negatives. Test failures should be an indication that something went wrong!

On superlinear slowdown: Not only do more tests cause slower builds, each test gets slower because the app is bigger.

App has a JS front end and a Ruby back end.

Every library or service you write will be consumed by somebody. We want to verify behavior that you are directly responsible for. Is it usable? If it's hard to test, then it's hard to use.

Module boundaries should be meaningful beyond testing. Fake all external dependencies. Your consumption service should run even without external dependencies, like in Travis CI. Also, exercise public APIs, not private APIs. Keep these really fast. Also, if you're faking all the services, then there would be no good reason to be slow. This is also your refactoring safety net.

Inter-service tests are testing, but they're hard to set up. They are slow to run, and they represent redundant coverage. This is *a lack of trust.* Default to trusting your depended-on services. Just know for some reason that the internal services are working.

When trust isn't enough, write Contract tests in the other repos. That way the other team knows that you need their test to pass. *What we want to make sure is that the dependencies that we own behave how we need them to. We also get to learn if the service is a good fit for our needs.*

TDD.

There's no one rule of TDD. The principal value of TDD in this model is discovery. It's not about making sure stuff works, it's about discovery and a maintainable, private API. This is the discovery of tiny, boring, consistent units that break down big, scary problems into small, manageable ones.

The user is the first caller of the method that doesn't exist yet. We are concerned with the inputs and outputs/side effects that a new method is going to have. They are also concerned with basic code design details.

*Code by wishful thinking. When your are scared of how to break a problem down, think of what you wish you had.* You are able to break down behavior and split problems. With literally no collaborators, you are able to test things inside.

We get small things by default (free SRP). If you are pre-emptively push things out constantly, you get small things.

With a giant command, we usually have `Query` at the start, then some logic in the middle, then a `Command` (or side effect) at the end. Logic test discover implementation by usage (no test double, use real objects). Commands and queries should contain very little logic.

BTW since we yiels small disposable units, don't hesitate to throw them away. If requirements change, trash a minimal sub-tree of units. Also, re-use is overrated. When a function changes, then two things change! Also, frameworks are similar to TDD in that they provide an orderly structure and tell the user "here, do these types", whereas in TDD, it forces to you to design an orderly structure.

We can't change 3rd party APIs. Mocking what you don't own leads to useless pain. So wrap your 3rd party API calls in adapters that you do own. Start by delegating and doing nothing else, but now you can mock to the adapter.

When you want to respond to 3rd party API failures, adapter tests can help. Adapters serve as a specification to what you own and what you don't own. We can get to drastically reduce the cost of replacing dependencies later.

Basically, don't test the framework.
