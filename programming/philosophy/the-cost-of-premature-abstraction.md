# The Cost of Premature Abstraction
[Reference](https://medium.com/@thisdotmedia/the-cost-of-premature-abstraction-b5d71ffd6400)

- When you keep on modifying the abstraction that you created earlier, it then makes things harder to maintain.
- Some common cases of premature optimisation happen with "helper"/"utility" functions and with Views/Components.
- ***If you find your abstraction has to check numerous possible input cases, this is a good sign that the abstraction was premature, or at least that it has outgrown its original purpose and should be disbanded.***
- ***Abstractions can simultaneously increase and decrease the complexity of code.***
- Even with the right abstraction ,this indirection means the developer who has to change that underlying abstracted behavior has to dig deeper, search further, and untangle abstractions on top of abstractions.
- When in doubt, duplicate code. The cost of a bad abstraction is much, much higher than the cost of dealing with duplicate code.
  - It's totally okay to repeat yourself! We can probably take the stance that you should repeat yourself by default.
  - Abstracting too early means you'll create overly restrictive abstractions or overly general ones.
