# Real Software Engineering - Glenn Vanderburg

Software engineering doesn't work, in the way we teach it, which is weird, because in every other field that aspires to a title of engineering, the term is engineering for practices that work.

So is software really an engineering thing at all, maybe it is just a craft? I don't think that's true -- I think software is an art and a science, but that doesn't mean it isn't engineering.

First Conference on Software Engineering: NATO, 1968. Software projects were unreliable and were error-prone and they said they need to grow up as a field and discipline. Turns out that people were very willing to admit that they didn't know much about how software should be built.

3 Things They Said:

1. "A software system can best be designed if the testing is interlaced with the designing instead of being used after the design."
2. "A simulation which matches the requirements contains the control which organizes the design of the system"
3. "Through successive repetitions of this process of interlaced testing and design, the model ultimately becomes the system itself, in effect the testing and the replacement of simulations with modules that are deeper and more detailed goes on with the simulation model controlling, as it were, the place and order in which these things are done."

He was talking about unit testing. And mocking. And iterative design and development. Pretty reasonable.

There was a second NATO engineering conference a year later, and something went wrong. This, I think was because it coincided with the beginning of the Waterfall process. Dr. Winston W. Royce didn't recommend it, but was misquoted anyway.

The reason that people thought he was recommending the waterfall was because this paper was a marvel of bad information design. If you want to study a paper that conveys the opposite point from what you were trying to get across, you couldn't do better than to read this paper.

Now imagine that you are a software engineer company in the 1970s, and this paper lands on the desk.

System requirements -> Software Requirements -> Analysis -> Program Design -> Coding -> Testing -> Operations

The VERY NEXT LINE said "I believe in this concept, but the implementation described above is risky and invites failure." (This actually applies to the next figure. The original text for this figure was "An implementation plan... keyed only to these steps, however, is doomed.")

Within a few years, Waterfall became a standard of the industry.

This is because people like terms that are simple and match those terms to things they understand or think they understand. This happened with "waterfall" and "software engineering".

The defined process control model requires that every piece of work be completely understood. A defined process can be started and allowed to run until completion, with the same results every time.

David Parnas the irrational thingie.
