# Ruby Rogues 150: The Debugging Mindset with Danielle Sucher
[link](http://rubyrogues.com/150-rr-the-debugging-mindset-with-danielle-sucher/)

One of the secrets of pair programming is that the non-typist is actually reading the error messages.

`caller` - prints the stack trace.

Admitting your ignorance is the beginning of wisdom

When your pair says, "Oh it can't be this", I say, "Fantastic. Show me."

The good thing about having a test suite is that you can narrow down large portions of the system.

"Did it ever work?" Try to go back in history and see if it ever worked in the first place.

Programmers have this attachment that we place such high value on code. Zed Shaw: Liberal use of `git reset`.

The best way to sound like an infallible guru while pairing is just to keep googling things as they're debugging.

Don't be afraid to ask dumb questions. But always use a branch to create an easy, resettable environment where you can do these kinds of experiments.

Solving production bugs: Looking at the error message in the log, different types of encoding. Ruby is hard to debug in production.

There's nothing worse than a test passing and I don't know why.

My way of dealing is to leave the computer. I head over to a local restaurant, coffee shop, or cafe. That little break and just being in a different makes me think about things a little bit differently.

I also like to list out the things I know. What do those things imply? And just the physical at of writing out a list is actually very helpful. I don't like to type it. I like to write it by hand on a piece of paper just to force myself to go through that process.

`puts` returns nil. And the previous line was returing something useful.

`heisenbug`: The very act of observing it changes what's happening. The observer affects the outcome of the observation. `hindendug`: A bug that just comes out of the blue and explodes and destroys all your data.

If we're talking about production vs. debugging, that's where I'm really getting on board with dependency injection to decouple things. Or specifically to decouple things, so that something is breaking, I would love for it to break on its own merits and not because it's got an implicit dependency on something three levels away.

If it's code that I don't know and don't understand as well, one thing I like to do is to just start going through and putting assertions in, basically validating my assumptions. Line by line put in an assertion, run the test or run the scenario, or whatever, and then put in another assertion. A lot of times, we look at a piece of code and we convince ourselves that we know exactly what it's doing, and we're completely wrong. And particularly what I see a lot is either we miss a conditional, or we just assume that the circumstances can't possibly be such that a particular conditional branch is taken.

`open gem` and `bundle pristine`.

- "Clojure from the Ground Up"
- "How to Solve It"
- "How Doctors Think"
- "Working Effectively with Legacy Code"
