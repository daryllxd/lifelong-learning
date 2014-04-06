# Corey Haines: Yay Mocks!

Mocks are such an easy scapegoat when people test. "Mocks suck!" "Mocks make your test brittle!"

For the most part, I am a strict isolationist. I isolate the system under test from dependencies. When you talk about mocks, they have a pretty set definition. They are expectation based, they say "hey I'm going to build one of those things, and I expect this method to be called on it, and afterwards I verify that this method was called on it". But there's a set use to know if they interact with other parts of the system. When you say "mock something" or "stub something", they are really just a test double that you can use for your tests.

So, good design. I don't really like to talk about it, since everyone has an opinion on it. So I tend to talk about it only when drinking beer, or scotch. But I'd rather we talk about Better Design. I think we can come up with a definition of, or at least, we can come up with a definition that we can talk about while I'm up here on stage. My views on better design stem from the one constant that we truly know from building software. There's one thing we know about developing applications, and that's that it changes. As we show things to our clients, we get things like "actually, I think I want someone else".

We have this cognitive dissonance of "he should have told me that" and "no requirements up front". We say we want to have iterative designs, build things, show it, build things, show it, but when the customer comes to us, we sort of grumble.

When we say Better Design/Easier to Change, I'm not talking about over-configuration with XML and YAML files. I'm talking about that when we go in, we have a design that is easy to change, and when you need to make a change, you know where to change things. So we come back to the fundamental things of removing duplication, naming things well, having a good test suite.

About OO -- I got to say, we suck at OO. One of the things that I think with the resurgence of functional programming is mostly because we don't do OO very well. OO is about messages. It's about sending messages between things. I'm currently learning Erlang, since AFAIK, Erlang is one of the purest OO languages out there. OO is about interactions, and about how things to each other. It's not about inheritance, encapsulation, even though those are important things. It's about services. It's about building good, layered systems, that are decoupled, that only do one thing well.

Lastly, it's about this: It's about roles. It's about "what are you using the object for?" It's not about the objects themselves. One of the fundamental problems I think came about, we were taught "Write down the nouns, turn them into classes, write down all the verbs, and shoehorn them onto the nouns". If we think about it, as developers, we automate processes, but for some reason, we start with the nouns. And these lead us to some crazy designs, these designs where you're trying to figure out where these behaviors live, rather than figure out what those services are.

TDD is a great way to focus on the interactions that we do, the messages that we send. In Ruby, messages are effectively brought to light by methods and things such as `method_missing`. Now, Test-First Development. This is different from TDD. I want to talk about the difference between these two. As we move in our careers, we build these automated tests. The way we listen to the tests, I'd like to think, is about our reaction to pain. What do you do when you find it difficult to test.

When for test-first, I'd like to say you change your tests. You might write helper methods, or you might use something like `FactoryGirl`, something that hides the complexity of your tests, something that hides the painfulness of setting up. So we start off focusing on the test.

But TDD brings into the thing of when things are difficult to test, change the design. Have that be you default behavior. Have that be your reaction to the difficulty of tests. Some of the complaints that people have about test doubles, things like fragility, rather than change the tests, why not take a look about what those are telling you about the design.

Why not change the design so it's not painful to test?

So examples. I'm writing this 

[TODO]: 19:01
