## Coding, Fast and Slow: Developers and the Psychology of Overconfidence
[link](http://blog.hut8labs.com/coding-fast-and-slow.html?reddit)

#### Why You Suck at Making Estimates, Part I: Writing Software = Learning Something You Don’t Know When You Start

*Writing software involves figuring out something in such incredibly precise detail that you can tell a computer how to do it.* In the parts you don't fully understand when you start, there are often these problems that will explode and utterly screw you.

*If you "fully understand something", then you've got a library or existing piece of software that does that thing, and you're not writing anything.* Otherwise, there is uncertainty, and it will often blow up.

When you hit this pain, you think "we should just be more careful at the specification stage". *This will fail, because if you were to write a specification in such detail that would capture those issues, you'd be writing the software.* This is why full specifications are a terrible economic idea.

#### Why You Suck at Making Estimates, Part II: Overconfidence

Experts make predictions that are often useless. These predictions about some future event are so completely unreliable, but the experts in question are extremely confident about the accuracy of their predictions, and nothing diminishes the confidence that they feel.

#### What It Feels Like To Be Wrong: Systems I & II, and The 3 Weeks and 3 Months Problem

It's as if evolution designed the whole thing with a key goal of keeping System II from having to do too much. When being asked how long a project will take, System I has no idea, but wants to have an idea, and translates the question into something like "how confident am I that I can do this thing", and that gets translated into a time estimate".

#### When Experts Are Right, and How To Use That To Your Advantage

To know whether you can trust a particular intuitive judgment, there are two questions you should ask: "is the environment in which the judgment is made sufficiently regular to enable predictions from the available evidence?" In software, it usually isn't.

The form of estimation in software that does fit the bill is the 0-12 hour tasks, if they are then immediately executed.

The key is that you first accept that making accurate long-term estimates is fundamentally impossible. Once you've done that, you can tackle a challenge which, though extremely difficult, can be met: how you can your dev team generate a ton of value, even though you can not make meaningful long-term estimates?

## No Deadlines For You! Software Dev Without Estimates, Specs or Other Lies
[link](http://blog.hut8labs.com/no-deadlines-for-you.html)

*The core idea is: put uncertainty and risk at the center of a conversation between the developers and the rest of the business (instead of everyone pretending such nasty things don't exist). Doing so allows the entire business to tackle those genuine challenges together.*

Instead of asking for more details, or stalling, or "3 months sounds reasonable", why not ask them about the business you have joined? What is the business model? What are the biggest challenges facing the business as a whole? What is the central problem or challenge which the business is facing?

A very important thing: it usually takes a considerable bit of effort to get beyond the proposed solution (e.g. the report), to the actual underlying problem. Laura Klein summarizes this marvelously as “[People] will tell you that they want a toaster in their car, when what they really mean is that they don't have time to make breakfast in the morning.”

Once you figure out the business problem your client is facing, help solve that problem. *Even if the people who have hired you don't think about it that way. How would the proposed development effort is supposed to solve that problem?*

It's usually helpful to echo back what the person just said to you: "Let me make sure I understand, you're saying this new feature you want is critical because it's going to help us upsell existing customers, but we're not so much expecting it to help us get new customers?"

*At each of those little checkpoints, if you're right, the Important Person will feel this rare, pleasant sense that someone in development actually seems to understand how the goddamn business works.* If you’re wrong, you've just narrowly avoided basing your dev efforts on an imperfect understanding of the business (which is a path straight to misery).

This whole process takes practice, but is INSANELY VALUABLE. You can (and should!) start by asking everyone you work with about how they understand the overall business you’re currently in, and what challenges it's facing. Do the same with random people you meet. Be curious, don't stop being curious, and don't be in any way afraid to say “I don't understand that, can you explain it to me?”

#### Now, the Knockout Punch

“Okay, if I understand it properly, we’re adding this report, because we think we can use it as a key feature in a new, higher pricing tier. This more expensive tier is not really for acquiring new customers, it's more for upselling existing ones, so we can extract more revenue from our most engaged customers. If we can do that, it’ll have a potentially big impact on our revenue churn 2, which is the most important number in our business right now. And, we really need to see that move in the right direction, in the next 6-9 months, so we've got a good story to tell investors when we go out to raise our next round of financing.

Do I have that mostly right?”

You then say, "Great, let me look into the tech we need for that report, and I'll get back to you with more info."

*Note: you haven't promised any date by which the report will be finished, instead, you've demonstrated that you are going to work with this Important Person to solve the actual problems the business is facing. You've taken a key first step in earning their trust.*

Now, notice, too: instead of you having made some promises to deliver on a spec, which promises are now hanging over you and making you nervous, you've directly engaged in a real problem for the business. And you have plenty of room to be creative about how you solve that problem. Yes, it's a hard problem, but that's why you got into this business in the first place — for the joy of solving hard problems that actually matter to someone.

If you know for certain that if you get the report built in x months, and that existing customers would happily pay more for it, the right decision for the business would be to build it. If you knew for certain that you couldn't hit the deadline, or that existing customers wouldn't pay more, the right decision would be to stop immediately, and start some other plan to reduce revenue churn.

When you pick what you work on next, gather as much information as possible about the things you are most uncertain about.

#### The Meeting Where You Earn Your Salary

“Right now, we’re feeling optimistic that we’ll have that report ready in some form within 3 months — but our biggest risk is working with that new social network's API. From the initial investigation we've done, it looks like, at the very least, we'd definitely be able to show them `<minimal data foo>`, which, from what I understand of our engaged customers, might be enough to trigger upsells, but sales and marketing aren't certain.

We'd like to propose the following: we take two of our best devs, and they spend 2 weeks trying to build a full integration with the social network, purely on its own, so we’ll have a better understanding of just how much data we can pull in. While they’re doing that, we'd also like to have our front-end devs building mockups of a report with just the minimal data, so that you’ll have something to do some user research with, and possibly even use for sales demos if things go well.

Does that plan sound like a good way to go?”

- Because you're thinking in terms of risks and information, you propose sequencing the work to get as much information as quickly as possible. Generate the most valuable info by attacking the biggest risks first.
- You can only pull this off if you deeply understand the overall business problem--that's what lets you propose the minimal data thing.
- You offer the Important Person an actual, meaningful choice (state the knowledge of what is possible and what is valuable to the business).
- You discover that a simpler report might work, rather than the one initially proposed.
- You're explicitly operating with a full knowledge of the hard, external deadline facing the business. *You're talking about deadlines for the business, not for implementing a spec.*

Even if the business folks think that "the minimum data is not enough", at least you learn that their plan centrally depends on something that has a great deal of risk associated with it.

Developers have to trust that what they are being told about the rest of the business is true — that customers want what they’re building, that the long hours are actually needed.

Any means of building up that trust will always have a personal flavor — it exists between human beings who have learned something of each other. It's not a thing you can mandate or fix with an imposed process.

Absolutely anyone who has done any real work on either side of that divide can immediately call up instances of that trust being betrayed — of discovering that all your work for the last half year was meaningless (and that someone knew that and didn't tell you); or that the repeated promises that some system was ready to launch collapsed in a fiery wreck as soon as the first user tried to login.
