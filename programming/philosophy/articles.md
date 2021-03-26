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

# Sprints, marathons, and root canals
[Reference](https://gojko.net/2018/08/30/sprints-marathons-root-canals.html)

- Modern software delivery relies on close customer collaboration and transparency.
- Tech work will always get postponed in favor of the stuff that actually brings in the money.
- A lot of work looks important to those people working on software, but not to those who pay them. Teams look for ways to sell technical stuff, under the mystical spell of quality. This is wrong, and no wonder it rarely brings results.
- Sprints have now taken on a dangerous literal meaning (short burst of full speed). Software sprints rarely have any breaks or recovery time.
- If there is a racing metaphor for software product delivery, it would be a marathon, not a sprint. Building a successful product is a long and exhausting process.
- Software: finite and infinite games, there are those with end states and those without.
- Sustainability tasks are quite different from those of business features.
  - For typical biz features, people can make some solid assumptions about the expected value.
  - Sustainability: the value is at some unknown point in the future.
- Performance improvements: no value until we hit the system capacity.
- System observability: no value until we get data loss.
- Instead of persuading stakeholders to see something that you can't even put into words, just ask them whether the product needs to be sustainable in the medium to long term.
- Just put sustainability tasks in the backlog.
- Sustainability budget: these come from ad hoc cleanups, technical debt sprints, refactoring iterations. Add up cleanup time that you spent last year and just say that that's the budget.
- Batman role: a role to deal with organizational emergencies and support requests so that the other programmers can focus on programming.

# The Reality of Missing Out
[Reference](https://stratechery.com/2016/the-reality-of-missing-out/)

- Digital advertising is becoming: Facebook, Google, or don't bother.
- LinkedIn's stock price decreased when it tried to hop in to advertising. Same with Yelp and Twitter.
- Advertising has always been around 1.2% of economic activity ever since  these types of things have been tracked.
- On radio/television over newspapers: advantage in terms of storytelling and capturing attention. Disadvantage: more expensive, harder to keep track off it it worked or not.
- TV/radio are effective at building awareness: making customers aware that your product existed and at building brand affinity.
- Newspapers: useful when it comes to "consideration": helping consumers decide to buy the product they were now aware of.
- Computers made it easy to demonstrate when an ad led to a click (Google). Search ads were so effective because consumers were entering the purchase funnel already at the bottom, they already wanted insurance/travel/a lawyer. This is basically a guaranteed lead.
- Re-targeting ads: effective to move customers through consideration, but it also creeped people out.
- Problems with brand advertising on the Internet: they are a bad version of print ads, which are already inferior to immersive media like radio and especially TV.
- It looks more efficient to spend your money on broadly target as many potential consumers as possible vs finely targeted ads.
- Facebook: awareness through IG video ads, consideration through retargeting, conversion through dynamic product ads on Facebook (and potentially, via Messenger).
- Google: awareness via Youtube, consideration via DoubleClick, conversion via AdSense.
- FB/Google: most users. Cheaper to make ads for these guys only. FB and Google have the best tracking both digitally and offline. They have an advantage over LinkedIn, Yelp, Yahoo, Twitter in terms of effectiveness, reach, and ROI.

# How Facebook Squashed Twitter
[Reference](https://stratechery.com/2016/how-facebook-squashed-twitter/)

- The idea of an information feed developed over many years: blogs/RSS are based on this format.
- Twitter and Facebook brought: users, content, a place to read. The feed allows for an advertising unit superior to anything found on the desktop, because users have no choice but to at least visually engage with whatever is dominating the screen.
- Facebook's networks already had a basis in the offline world (it was people you already knew). That made the service immediately approachable and useful for basically everyone. Twitter was about following people you didn't know based on your interests. So you basically had to compile that list from scratch.
- Twitter's marginal user: the service had tremendous visibility, but it was just not worth the effort to get started for a lot of people.
- Facebook made it easy to add all types of posts into their algorithmically generated feed.
- Twitter's interest graph is potentially more valuable than FB's social graph, but they compete for the same scarce resource: attention. FB had most probably the most interesting content to ensure most users had no desire to look for something better.
- Mobile is in every pocket and in a huge percent of the world's population. On sheer numbers alone it is 3x or 4x in size.
- Unfortunately for Twitter, the attention market of 2016 is far different than it was back in 2009. We have Snapchat, Instagram, messenger services.

# Little Blah
[Reference](https://littleblah.com/post/2019-09-01-senior-engineer-checklist/)

- Understand business aspect of the work.
- Get involved with hiring for your team/company, and maintain a high bar for hiring quality candidates.
- Design and develop systems appropriate to scale, extensibility, and scope of the problem, and avoids over-engineering.
- Question everything and ask why until you get to the root of problems and situations.
- Demand accountability and ownership from others.
- Lead at least one high-impact project with a clear definition and target of successful delivery.
- Work towards disambiguating ambiguous problem statements.
- Cultivate relationships with other teams and develop trust.
- Listen to others and accept that there is more than one way to look at a problem statement, and multiple valid solutions to a problem.
- Be involved with multiple projects as a consultant, a reviewer, and/or a mentor.
- Follow the principles of extreme ownership.
- Have strong mentors to help you navigate and grow in the company.
- Take projects with high risk and high rewards.
- Strive for deep technical expertise in technologies used in your team.
- Ask for stretch projects from your manager, or help her identify one for you.
- Discuss the goals of your manager, and how you align your work with it.
- Network with seniors, peers, and juniors.
- Be a mentor to a couple of junior engineers.
- Increase your breadth of knowledge in the domain of your team/company.
- Drive your one-on-ones. Maintain a list of topics for the next one-on-one discussion.
- Discuss problems with your manager, but have some solutions beforehand.
- Increase your breadth of knowledge in technology.
- Explore emerging tech by building small prototypes.
- Read a few technical books per year.
- Understand pros and cons thoroughly of new technologies.
- Schedule a regular one-on-one with your manager.
- Actively seek feedback from your manager.
- Keep your manager up-to-date in things you are involved with, but don't get bogged down in unnecessary detail.
- Keep your manager up-to-date on people you have difficulty working with.
- Give constructive feedback to your manager.
- Talk to your manager about your expectations.
- Measure what you want to improve, make your efforts measurable.
- Maintain high visibility projects which have a high risk.
- To deal with difficult folks, discuss with your managers and mentors.
- Be reachable to other engineers.
- Have a huge bias for action and delivery but do not over-compromise on quality. Push back if required.
- Simplify code, systems, and architectures relentlessly.
- Demand high-quality work from others, but be pragmatic.
- Prioritise fixing tech debt in code when the incremental cost to develop keeps rising.
- Document extensively ("why" more than "how").
- Respect code and systems that come before you. There are reasons for every code and every guard that exists in production.

# Get better at programming by learning how things work
[Reference](https://jvns.ca/blog/learn-how-things-work/)

- JS: How the event loop works, what the DOM is and what you can do with it, HTTP methods, what the same-origin policy and CORS is.
- CSS: How inline elements are rendered differently from block elements, what the default flow is, how flexbox works, how CSS decides which selector to apply to which element.
- Systems programming: The difference between stack and heap, how virtual memory works, how numbers are represented in binary, what a symbol table is, how code from external libraries gets loaded, and how atomic instructions are different from mutexes.
- If I have bugs in my programs because of an incorrect mental model, I'll struggle to fix those bugs quickly and I won't be able to find the right questions to ask to diagnose, and then I'll feel really frustrated.
- Moving from "I'm confused" to "Okay, I get it!"
  - Notice when I'm confused about a topic (what does `await` do?)
  - Break down my confusion into specific factual questions, like "when there's an `await` and it's waiting, how does it decide which part of my code runs next? Where is that information stored?
  - Find out the answers to those questions (by writing a program, reading something on the Internet, or asking someone).
  - Test my understanding by writing a program.
- Just learning a few facts can help.
- How to get information: ask "yes/no questions".
  - Is my understanding correct?
  - Are these concepts related to each other?
  - What is the main purpose of something?
- At least you get to know exactly why some thing is.
- Be aware of what you don't understand: So do I need to know how this thing works or not?

# Things your manager might not know
[Reference](https://jvns.ca/blog/things-your-manager-might-not-know/)

- What's slowing the team down?
  - And how can you help here?
  - Factor into the planning, or deprioritize a feature.
- Exactly what individual people on the team are working on.
  - This is my progress right now.
- Where the technical debt is.
- How to help you get better at your job.
  - Less work or more work.
  - Learning budget.
  - Help with an interpersonal situation.
  - Specific feedback on work we did.
  - Escalating issues.
- What your goals are.
- What issues they should be escalating.
- What extra work you're doing.
- How compensations/promotions work at the company.
