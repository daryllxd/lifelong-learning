## The Importance of Code Reviews
[link](http://www.everythingisvoid.com/programming/importance-code-reviews#sthash.hyqibXsp.0u37PkVY.dpbs)

He talks about a real-life situation where a Company needed to implement some very important module, while it's senior developer Mr. Senior was busy. So they gave that module to Mr. Newbie, who took 4 months writing this module, two more weeks fixing the shitload of bugs QA found, wasted countless hours of Tech Support with the bugs that were not found by QA, clients cancelled their contracts as the software seemed buggy, and so on. Eventually the senior programmer steps up, rewrites the whole thing from scratch in a month, a bug free version ships after a quick QA session and everybody is happy again.

Now, before I explain how all this could have been prevented, I’ll first paint the way I believe a good code review routine should look. All it takes is following two simple rules:

- *No code enters the master branch without being reviewed. Even one-line commits. Even the code the most senior developer wrote.* Companies already spend money/developer hours on writing/performing automated/manual tests--in a way, we already admit that even the most senior developers err from time to time.
- *Everybody reviews code. Even the most junior programmers.* We want the junior programmer to view a seasoned developer's code. *He might not understand a thing or two, so he is going to ask stupid questions, yet receive smart answers. Most importantly, he will begin to understand the state of mind of a person who reads critically somebody else's code, give him a month or two, and he’ll begin reading his own code critically, improving the code he eventually commits to the repository.*

#### Comments:

*The benefit I see in Code Reviews are so many, and I think Code Reviews result in a lot of good changes in how teams share knowledge, what they decide to formally Document, how they plan their iterations, and how teams conduct the business of software development.*

Mistakes are not simply mistakes, they are of a thousand variations. Developer A is intermediate, but doesn't understand Multi-threaded programming. Developer B is truly senior but is new to the domain and the application design. So much information must be shared, if Code Reviews are the way that the knowledge percolates, great.

#### Reddit:

In principle, code reviews work when you can point to a few high-level missteps or errors in otherwise well-designed and well-written modules, and the developer - who actively cares about the process - diligently addresses these short-comings.

I've run into situations where the developer either doesn't understand the comments, or else makes the bare minimum changes necessary to avoid being accused of ignoring the review comments altogether. So the result is reviews that go for several rounds but the code never seems to actually improve - just gets shuffled around a bunch.

In my experience, the worst programmers were those that avoided reviews. A reviewer will catch things that you might miss. If the reviewer can't understand the code, have the programmer change the code! Design reviews are even more important as you can catch problems before work begins.

*I believe you should get at least one review a day. Having a review on a month's worth of work will be nearly useless for the reasons you mention.*

I'm still at a junior to mid level. I just started my third position doing C# .net development and my new boss is the only one I've ever had do code reviews with me. It's been awesome and all the random shit I've learned has been great.

It also makes me feel more accomplished when he looks stuff over and is like.. Yup that's great. Let's deploy this right now. Because I know I did it properly. There is a confirmation and less stress that something could go wrong and if I did something incorrectly or inefficiently he will fill me in. We typically do reviews twice a week about an hour at a time.

Or you could pair program. Pair programming is like a continuous code review. It's by far the best way to pass along good practices from senior developers to junior developers. A code review provides a feedback cycle to the developer being reviewed; pair programming just tightens up that feedback cycle and makes it immediate.

Yeah, for some people. I find code reviews (and NOT pair programming) more effective. There are times when we pair program when a particular task seems to require it. We identify these cases in an informal manner, and almost automatically switch into Pair mode when attacking certain foundational problems.

It's generally pretty hard to fire people, especially if they are a nice person (people don't generally get fired too much for incompetence, only for everyone that works with them hating them).

What I've seen happen (at companies with incompetent management) is everyone gets sick of working with the terrible people (but the terrible people are nice humans, so they get shuffled around), so they leave, and the only people left are non-technical. Since the incompetent technical people are the only ones that can solve their problem, they get thought of as very smart and never actually get any better, but have a large amount of weight in the organization (my previous manager was like this).

Then the rot sets in, and these people get promoted to managers, since they are incompetent, they can't accurately access technical ability, your entire department becomes crippled and it will never recover without someone competent coming in over the top and cleaning house, by then these people have created so much technical debt that it's very hard to dig your organization out of it. It's pretty much a one way ticket to your engineering organization becoming a boat anchor for your company.

To make code reviews effective I think it is critical to start the review process early on (even if the feature being built / the refactor being done is not complete).
