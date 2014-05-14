# Functions

Functions are the first container of code you put things into.

Classes tend to hide in large functions. How can we find those classes to be the right size?

A function should do one thing, it should do it well, and it should do it only.

## The First Rule of Functions: They should be small.

How big should a function be: Previously it was supposed to be the size of the screen (about 20 lines).

Four lines is okay, maybe 5. 10 is way too big. In a four-line function, how much indenting, `if-then`, `case`, and `try-catch` loop would there be?

Functions in a small scope should have large names. We have booleans encoded in functions.

Ex: `testableHtml` is a function that surround as page with 2 buffers. It has 2 arguments and 2 local variables. When you have variables that are used by many areas, they should be a class.

- First, you turn the method into a Method class.
- Then promote the local variables to be fields on the class and extract fields into the constructor.
- Then we can extract the repeating lines to make them parametric.
- Then we extract major operations (in this case the include setups, include teardowns.
- Then we can get eh string builder thingies.
- Check `testableHtml` screencast.
- Assumed cons: getting lost in a sea of functions (not true because there are names), function overhead (very negligible), takes a long time (it should just be the same thing).

We fear the short functions because we are so used to long functions. We look for landmarks because we've memorized the part of the code. The problem is if you drop someone new in the code, they won't know where to go.

If you drop someone in a code that has a lot of functions, then you'll find that they'll know where to go.

The strategy of just doing everything by yourself and putting them where you want won't work when you're a team. This is why we put away things in containers and shelves when we get older but not when we are younger.

This is why you need to put code in nice places where you can understand each of these.

Function call overheads are extremely negligible (it's nanoseconds!). We should prioritize readability. This should  only be done in the innermost parts of the functions.

## Time

It takes time to make things smaller, but when you go back to the same function, it pays in huge dividends. So be kind to your teammates, your company, and yourself, keep your room clean.

## Long Function

How do you know where the classes are



