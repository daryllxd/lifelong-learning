## How do I train myself to code faster and with fewer bugs?Edit
[link](http://www.quora.com/How-do-I-train-myself-to-code-faster-and-with-fewer-bugs)

Programming gets tough when we encounter logic bombs which we (or others) have planted for ourselves.

With each new module of code added to a project, the project complexity goes up. Not in a linear level but by some exponential function.

The programmers mind is a limited resource, so this exploding level of complexity eventually overwhelms the programmer. At some point it becomes too much to hold in your head. That's the turning point.

I think the fastest, most, reliable programming is about developing a style where you avoid this class of problem.

Write code which clearly describes what it does. Select meaningful symbol names which are precise and unambiguous. Be very precise with naming schemes, don't use different words to describe the same stuff.

Adopt the simplest solutions if they are available. Do not optimise for speed. Do optimise for readability and transparency.

*Don't fool yourself into thinking your code is magically reusable, if you didn't originally write it with reusability in mind. Instead, start with single use code, and keep it inline. If it makes sense to generalise it, then be prepared to re-write it completely.*

---

Keep practicing. Always practice, never test - if you judge yourself on how long it takes you to write or debug something, or how many bugs you create the first time around, you'll only put unnecessary stress on yourself and make it harder to learn.

It's important to give yourself the time and opportunity to learn, though what you learn and how you learn it could be very different from what and how your friends and colleagues would learn.

Spend some time planning your projects, but not too much. When starting a project, I would first get a general idea of what components will be necessary for the system to work, but wouldn't spend too much time defining the interfaces between them or breaking each one down into subcomponents before diving into code. Sometimes it may even be more efficient to write some component the "wrong" way the first time and rewrite it if necessary when the other components are more mature. Excessive time spent planning may be wasted anyway since projects rarely go exactly as initially planned.

When implementing a specific part of the project, don't only think about the ways it's supposed to work, but also what it does when something unexpected happens. Does the function fail if one of the input parameters is negative, or null? What if some of the data files the program needs don't exist, or are the wrong type or size? What happens if another thread is updating this linked list at the same time this thread is traversing it? The knowledge to check for these kinds of things comes with experience - after debugging a specific issue, you'll know to check for that kind of issue (and similar issues) in the future.

---

I would try to be rigorous - do more testing, read up on test driving development - try to exercise every line of code - automatically think of extreme cases before even writing the code.  Don't be tricky, keep it simple.  Code at the right pace - not too fast, but not too slow.  Find a way to get hours of concentrated time so you can write the code in a coherent state.

---

TDD makes you faster by letting you find a bug the moment you introduce it. It avoids that costly context switch. Peer programming works because of the same principle. Since 2 people are creating the same mental model in their head, it's more likely that one of them will see a defect. It's easier to fix the defect while the mental model is in their heads. The basic principle here is don't let go of that mental image until you got the code perfect.

TDD and pair programming are essentially 2 differrent ways of doing the same thing. *If you are a novice to mid level programmer, most of your time is spent in doing mental context switches. You are essentially eliminating that overhead by doing TDD/pair programming.* You might not perform like a rockstar because you are still keeping tiny pieces in your head. But, you can get pretty damn close to being a good to great programmer.

---

*Train yourself to not code until you've formulated a general understanding of what it is you're trying to accomplish. Then, train yourself to not code until you've formulated a general approach to solving the problem.* Then, train yourself to not code until you've isolated the specific subroutines (or objects, depending on your world) needed to solve the problem.  Train yourself not to code until you can visualize, in your mind, the flow of data through your processes.  Then, and only then, begin coding with a focus on each part of the puzzle, until you've created the big picture.

---

Bugs come in a few varieties:

1. Slip of the fingers.
2. Trying out new programming constructs or patterns.
3. Race conditions.
4. Architecture/design errors.
5. Scalability issues.
6. Environmental issues.
7. Changes in underlying libraries.
8. Branching/merging bugs.
