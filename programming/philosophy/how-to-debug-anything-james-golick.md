# How to Debug Anything
[link](http://www.confreaks.com/videos/3451-goruco-how-to-debug-anything)

"Everything is terrible." People say this. Somewhat often, programmers say this, and there's been a lot of talk on whether we should stop saying this. I think it's important to create a distinction between people who say this in a moment of frustration, because what we do for a living is very frustrating, and people who legitimately believe that everything is terrible.

As much as I think that you're wrong if you legitimately believe that everything is terrible, I think that you're probably at the very least naive or being a little bit disingenuous if you don't admit that everything is broken. And I don't believe that nothing works, I mean stuff works, but the reality is that software is buggy, it's flaky, and it's unreliable, despite our best efforts to make it better.

As a result of having everything is broken, one of the discussion is "how do we write better code". We have stuff like testing, static analysis, new languages with more sophisticated type systems. One thing that we don't talk about enough is "what are the strategies for dealing with software that doesn't work", whether it's our code or someone else's code.

"If you want to deploy high quality software that performs, you should expect to fix bugs at every level." -- me.

Bugs occur in every level, my own code, the Ruby VM, MySQL, etc. The methodology I use is always the same.

"I don't understand how this is possible." - every programmer ever

Every debugging session starts with this quote.

I check the logs.

Find the PID for one of these Apache processes. Then I used `strace`. If you aren't familiar .

Work from the bottom and make your way up.

First is find where the failure is. Whatever is underneath that is probably not that interesting.

Find the cause.

0. Forget everything you think you know.
1. Get a third party opinion.
2. Locate the correct source code.
3. Identify a hard-coded string to grep for.
4. Stare at the code until it makes sense.
5. Fix whatever is broken.

