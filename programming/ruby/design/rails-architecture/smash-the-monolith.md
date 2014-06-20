# Smash the Monolith: Refactoring Rails Applications
[link](http://vimeo.com/73747370)

Architecture is a compromise between viability and perfection. I think architecture is more aesthetics than science. While we want to make systems that are easy to change, we also want it to make sense.

Big up front design (waterfall) disadvantages: slow implementation/resistance to change/new feature friction.

Adhoc architecture: Convention over configuration, discrete MVC layers, good separation of concerns, better to have REST/resourceful routes. TDD + pair programming + pull requests + code reviews = emergent design. All of us are equally participating in the design of the system.

The road to hell:

- Non-CRUD controller methods. ("we need a search method!")
- Logic leaking into controllers and views.
- Complex object graphs.
- Callbacks.
- `/lib/` becomes a junk drawer.
- Undocumented gem dependencies. ("What does Ruby Racer do again?")
- Bloated user model.
- Immobile/can't move shit.
- Feature friction.

How did we get here? Classes naturally attract methods/increasingly slow test suite/entropy. This happens one line of code at a time. Unless you are actively working to prevent it to be big.

Hexagonal architecture: This is because layered stuff such as MVC breaks down.

Domain objects: Pure ruby.

                Monitoring
    HTTP                        Persistence
                Domain Objects
    Command Line                Messaging
                Testing

If Domain Objects are in Ruby, you can choose swap out components of your system.

Design for all of your users, not just the obvious ones. Design for your users, your test suite, your persistence.

Give every class its own distinct API.

Write your application in pure Ruby.

Achieve framework independence.

*Unix: Write programs that do one thing and do it well. Write programs to work together. Write programs to handle text streams, because that is a universal interface. --Doug McIllroy*

Implement an ecosystem of small applications.

Divide models between the applications.

Don't use submodules/gems for the separated things.

Think of persistence as a service. *When you inherit from ActiveRecord, you've declared that the primary purpose of your class is persistence.* As soon as you introduce business logic there, you've violated SRP. *Think of persistence as "it has to happen at some point", but does it really happen immediately? Is it okay to fire and forget.*

Bind applications together using APIs and messaging.

Determine a caching strategy. If we can wait a few seconds, cache.

What if we think of an application as just an object? The theory is we want our OO design principles to reflect in our apps as well. Message passing between objects = api calls/messaging in our apps.

An application is a group of components that perform tasks on the same data. An application should do one thing well. Use APIs to extend our interfaces and not change them, and it doesn't matter what the application sends or receives, what matters is the message itself. APIs and presenters allow us to easily create client-specific interfaces.

Legacy: Not defined in months or years or versions. Legacy code is not broken. Usually, you're mad at legacy code not because "it's stupid", but because you don't have a contextual knowledge of the code. It's not broken. Don't `git blame`, the people writing the code were working with requirements you don't understand.

## Refactoring Tactics

- Start with god classes.
- Extract behaviors into modules. One of the code smells is look for messages with repeated words in them.
- Extract models and business logic into engines. Engines are underrated.
- Migrate engines into discrete applications.
- Implement observers using a messaging service. (Callbacks are more evil.)
- Provide persistence through asynchronous services.
- Design APIs very carefully, because you're basically stuck with it forever.
- Use your API as a guide to refactoring your models.
- Find functional edges and refactor them into services.
- Make liberal use of presenters.
- APIs are synchronous calls.
- Persistence stuff is asynchronous. We merge later.

How do you convince stakeholders to refactor? Well, we owe it to the business to keep the application in working order. We developers should have a backlog of technical debt.

          Consumer App                     Internal App
    Reporting API          Persistence API               Messaging API
          Dashboard App                    Internal App

