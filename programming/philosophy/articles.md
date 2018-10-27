# You don’t understand your software engineers
[Reference](https://medium.com/@amandoabreu/you-dont-understand-your-software-engineers-53442ca0805a)

- Developers are self-motivated people.
- Majority code outside of work hours as a hobby.
- When shifting your attention between contexts, you can lose up to half a day to get back to where you were.
- Work environments should not foster distractions. If he knows that he won't be able to focus on the task, he probably won't even start.
- Solutions: flexible schedule, home office.

## Comments

- *Trust is requirement #1 for this job (software development).*
- Solo work without distractions, one-on-one collaboration, group collaboration, collaboration with stakeholders, space to get out of your head, etc. Mechanics, chefs, carpenters, etc. work in places designed for and dedicated to their type of work. So should developers.

# Why Entrepreneurs Start Companies Rather Than Join Them
[Reference](https://steveblank.com/2018/04/11/why-entrepreneurs-start-companies-rather-than-join-them/)

- *Entrepreneurs start their own companies because existing companies don’t value the skills that don’t fit on a resume.*
- Signaling: When you look for a job, you signal your ability to employers via a resume with a list of your educational qualifications and work history.
- Capable: If they think they are more capable than their employers.
- Better pay.
- Less predictable pay.
- Smarter.
- Immigrants/funding: harder to show their credibility to existing companies.
- ***Asymmetric information about ability leads existing companies to employ only "lemons," relatively unproductive workers. The talented and more productive choose entrepreneurship.***

# The melting pot of JavaScript
[Reference](https://increment.com/development/the-melting-pot-of-javascript)

- Unconstrained by a single vendor, the JavaScript ecosystem closely reflects human culture. It is inventive, incremental, messy, assimilating everything on its way, and ubiquitous.
- Traditionally, software platforms had gatekeepers (Apple, MS.) They provided a language, a compiler, and a set of SDKs.
- Because of innovations in the browser, JS made rich client-side apps possible. Node, module system. The authors of the JS SDK: app developers who learned about parsers, source code manipulation, static analysis, optimization. Tool building in JS became common.
- Unix philosophy: simple programs meant to be chained together. In my experience, the order and manner they are wired together are crucial. You need to learn their internals.
- ***Your App Makes Me Fat: "If your UX asks the user to make choices, for example, even if those choices are both clear and useful, the act of deciding is a cognitive drain. And not just while they’re deciding. … Even after we choose, an unconscious cognitive background thread is slowly consuming/leaking resources, “Was that the right choice?” … If our work drains a user’s cognitive resources, what does he lose? What else could he have done with those scarce, precious, easily-depleted resources? Maybe he’s trying to stick with that diet. Or practice guitar. Or play with his kids."***
- This is why we need good error messages and our config options need to be useful for many people.

## My Take

- Config should not stand in the way of getting started.
- Resist adding more configuration than absolutely necessary.
- Disclose advanced features progressively.
- Mind your output.
- Create reusable toolboxes.
- Toolboxes, not boilerplate. It should work with no configuration.

- Even if you are not a tool maker, you just need to make error messages that are not obscure, and have reasonable defaults for config options.

# Your App Makes Me Fat
[Reference](http://seriouspony.com/blog/2013/7/24/your-app-makes-me-fat)

- Participants who memorized a seven-digit number were 50% more likely to choose cake over fruit when they had to choose a snack after.
- Willpower and cognitive processing draw from the same pool of resources: you're more likely to do bad choices when you're tired.
- This thing also works for dogs.
- Confusing apps draw from users' cognitive resources.
- If this is content designed to suck people in for the chance to "convert", we're hurting people. If we're pumping out "content" because "frequency", we're hurting people.
- ***My goal for Serious Pony is to help all of us take better care of our users. Not just while they are interacting with our app, site, product, but after. Not just because they are our users, but because they are people. Because on their deathbed, our users won't be thinking,"If only I'd spent more time engaging with brands."***

# Tech's Two Philosophies
[Reference](https://stratechery.com/2018/techs-two-philosophies/)

- Google's I/O keynote CEO Sundar Pichai:
  - "Our vision for our assistant is to help you get things done."
  - *"A common theme across all this is we are working hard to give users back time. We've always been obsessed about that at Google. Search is obsessed about getting users to answers quickly and giving them what they want."*
- Google: Computers help you get things done by doing things for you.
- Facebook: "I believe that we need to design technology to help bring people closer together. And I believe that that’s not going to happen on it's own. So we need to focus on people and relationships."
- Microsoft: "Act so that the effects of your action are compatible with permanence or genuine life. We need to develop a set of principles that guide the choices we make because the choices we make is what's going to define the future."
  - "We're focused on building technology so that we can empower others to build more technology. We've aligned our mission, the products we build, our business model, so that your success is what leads to our success."
  - The computer doesn't do your work for you, but it enables you to do your work better and more efficiently.
- Apple and Steve Jobs:
  - "The best analogy I've ever heard is Scientific American, I think it was, did a study in the early 70s on the efficiency of locomotion, and what they did was for all different species of things in the planet, birds and cats and dogs and fish and goats and stuff, they measured how much energy does it take for a goat to get from here to there. Kilocalories per kilometer or something, I don’t know what they measured. And they ranked them, they published the list, and the Condor won. The Condor took the least amount of energy to get from here to there. Man was didn't do so well, came in with a rather unimpressive showing about a third of the way down the list."
  - "But fortunately someone at Scientific American was insightful enough to test a man with a bicycle, and man with a bicycle won. Twice as good as the Condor, all the way off the list. And what it showed was that man is a toolmaker, has the ability to make a tool to amplify an inherent ability that he has. And that’s exactly what we’re doing here."

- Apple/Microsoft: "Bicycle of the mind" companies:
  - Microsoft licensed software.
  - Apple sold software-differentiated hardware.
  - These were both platforms. Third-party companies build on top of them, which builds a moat based on the created ecosystems.
- Google/Facebook: Products of the Internet.
  - Not a platform, but aggregators. *Aggregators attract end users by virtue of their usefulness and over time, leave suppliers no choice but to follow the aggregators' dictates if they wish to reach end users.*

- ***Google and Facebook are predicated on doing things for the user, just as MS and Apple have been built on enabling users and developers to make things completely unforeseen.***
- On scrutiny: G and F are accountable to no one. Both deserve all of the recent scrutiny they have attracted, and arguably deserve more.
  - Platforms create new possibilities.

# Notes to Myself on Software Engineering
[Reference](https://medium.com/s/story/notes-to-myself-on-software-engineering-c890f16f4e4)

- Code is also a means of communication across a team, a way to describe to others the solution to a problem. *Readable code is not a nice-to-have, it's a fundamental part of what writing code is about.* This involves factoring code clearly, picking self-explanatory variable names, and inserting comments to describe anything that's implicit.
- Taste applies to code, too. Taste is a constraint-satisfaction process regularized by a desire for simplicity. Keep a bias toward simplicity.
- Each feature has a cost: maintenance, documentation, cognitive cost.
- *Make sure you are in an environment where you can code with confidence, if that isn't the case, start by focusing on building the right infrastructure.*
- Good software makes hard things easy. Just because a problem looks difficult at first doesn't mean the solution will have to be complex or hard to use. Make sure that your solution of choice cannot be made any simpler.
- ***Avoid implicit rules. Implicit rules that you find yourself developing should always be made explicit and shared with others or automated.*** Whenever you find yourself coming up with a recurring, quasi-algorithmic workflow, you should seek to formalize it into a documented process, so that other team members will benefit from the experience.
- Beyond the metrics you are monitoring, what total impact does your software have on its users, on the world? Are there undesirable side effects that outweigh the value proposition?

## On API Design

- In decisions you make, always keep the user in mind: have empathy for your users, whether they are beginners or experienced developers.
- Always seek to minimize the cognitive load imposed on your users in the course of using your API. Automate what can be automated, minimise the choice needed from the user, don't expose options that are unimportant.
- Seek to have an API that matches the mental models of domain experts and practitioners. Someone who has domain experience should be able to intuitively understand your API using minimal documentation, mostly just by looking at a couple of code examples.
- *A good API is modular and hierarchical: easy to approach, yet expressive.* There is a balance to strike between having complex signatures on fewer objects, and having more objects with simpler signatures.
- Your API is inevitably a reflection of your implementation choices, in particular your choice of data structures.
- Design end-to-end workflows, not a set of atomic features: instead of asking what to implement/what config to add, ask: what use case for the tool do we want? For each use case, what is the optimal sequence of use actions?
- Error message: part of the API. Design your API's error messages deliberately.
- Documentation should not talk about how the software works, it should show how to use it.

## Software Careers

- Career progress is not how many people you manage, it's about how much of an impact you make: the difference between a world with and without your work.
- Software development is teamwork; it's about relationships as much as it is about technical ability. Be a good teammate. As you go on your way, stay in touch with people.
- ***Self-direction is the key to life satisfaction. Make sure you grant sufficient self-direction to the people around you, and make sure your career choices result in greater agency for yourself.***
- ***Productivity boils down to high velocity decision-making and a bias for action. This requires good intuition (comes from experience, so as to make generally correct decisions given partial information), a keen awareness of when to move more carefully and wait for more information, because the cost of an incorrect decision would be greater than the cost of the delay.***
- Making decisions faster means you make more decisions over the course of your career, which will give you a stronger intuition about the correctness of available options.
