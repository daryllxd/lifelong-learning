# Ruby Rogues 150: The Debugging Mindset with Danielle Sucher
[link](http://rubyrogues.com/150-rr-the-debugging-mindset-with-danielle-sucher/)

- One of the secrets of pair programming is that the non-typist is actually reading the error messages.
- Admitting your ignorance is the beginning of wisdom.
- "Oh it can't be this" → "Show me how it can't be that."
- The good thing about having a test suite is that you can narrow down large portions of the system.
- "Did it ever work?" Try to go back in history and see if it ever worked in the first place.
- Programmers have this attachment that we place such high value on code. Zed Shaw: Liberal use of `git reset`.
- Don't be afraid to ask dumb questions. But always use a branch to create an easy, resettable environment where you can do these kinds of experiments.
- Solving production bugs: Looking at the error message in the log, different types of encoding. Ruby is hard to debug in production.
- There's nothing worse than a test passing and I don't know why.
- Debugging: you can leave the area and look around.
- `puts` returns nil
- *If we're talking about production vs debugging, that's where I'm really getting on board with dependency injection to decouple things. Or specifically to decouple things, so that something is breaking, I would love for it to break on its own merits and not because it's got an implicit dependency on something three levels away.*
- If it's code that I don't know and don't understand as well, one thing I like to do is to just start going through and putting assertions in, basically validating my assumptions. Line by line put in an assertion, run the test or run the scenario, or whatever, and then put in another assertion. A lot of times, we look at a piece of code and we convince ourselves that we know exactly what it's doing, and we're completely wrong. And particularly what I see a lot is either we miss a conditional, or we just assume that the circumstances can't possibly be such that a particular conditional branch is taken.

`open gem` and `bundle pristine`.

- "Clojure from the Ground Up"
- "How to Solve It"
- "How Doctors Think"
- "Working Effectively with Legacy Code"

# Parley Thread
[link](http://parley.rubyrogues.com/t/10-most-important-bits-of-pragmatic-knowledge-for-a-new-software-engineer-to-know/1991)

- Don't beat your head against the wall, ask a question.
- It stopped working for no reason, *I changed something but it couldn't possibly be that.*
- YAGNI
- Use git to save working versions.
- Make it work, make it right, make it fast.
- The user is under no obligation to use the code you provide them to communicate with your backend, nor to use the data you provide them as you intended.
- None of us remembers everything we work with. We just get good at searching for information when we discover we need to know it.

# Practices of a Professional Developer
[link](http://www.khebbie.dk/gist/9719703)

## Development, Integration, Test, and Live Environment

- Don't be satisfied with "works on my machine".
- The test environment is for QA folks to test stuff.
- The staging environment is for smoke tests.
- The live environment is where end user meets the system.

Working Software: At all times we should have the software working and ready to deploy, hence we branch out our code in the version control system we use.

Diagnostics/Logging: In order to not look stupid in front of our customers we add logging so we can find errors and quirks quickly.

# How to improve your ability to debug existing code
[Reference](https://softwareengineering.stackexchange.com/questions/11726/how-to-improve-your-ability-to-debug-existing-code)
# How to most effectively debug code?
[Reference](https://softwareengineering.stackexchange.com/questions/10735/how-to-most-effectively-debug-code)

- Don't assume anything.
- Testing incrementally.
- Write tests in the form "given", "when", "expect". Write tests, don't just sprinkle debugs.
- Divide and conquer: try to identify visible input/output between which the issue exists. Try putting prints at sizable chunks or significant points between them.
- What are the bugs you tend to write? It might be things like thread deadlocks.
- Just assume things about semicolons.
- Learn the nuances of your debugger and learn the hotkeys.
