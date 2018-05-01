# Weekly Iteration 19: Dependency Inversion Principle

Systems that have OCP and LSP tend to have DIP. When you start getting into SOLID, we get to at some point

# The World Needs Another Post About Dependency Injection in Ruby
[Reference](http://solnic.eu/2013/12/17/the-world-needs-another-post-about-dependency-injection-in-ruby.html)

- When practicing DI in Ruby:
  - Keep `.new` method clean, don't override it, just make it accept the dependencies as arguments.
  - Have a separate builder method which can accept "ugly" input and create everything that your object needs to exist.
  - Extract building logic into a separate object when builder method gets too complex.
  - Avoid passing option hashes to the constructor.
- Don't stub `Time.now` please.

## Comments

- Why not options hash into a constructor?
  - This means that an object is concerned about too many things.
  - You can add more and more options because the interface allows you to do that easily.
  - The problem is when I look at such a constructor, I usually don't know what are the possible choices and it takes some time to figure it out.
- On objects that would have their initialization delayed until first use?
  - That's an anti-pattern. Why would you delay that? If this service needs a client, then just inject it.
- The essence of DI in Ruby is to inject the dependencies using constructor arguments. The key part is to isolate building of those dependencies from the object that depends on them.
- On switching back to containers: `dry-container` and `dry-auto_inject` gems.
