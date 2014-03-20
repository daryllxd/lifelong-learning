# Architecture the Lost Years

- Cucumber is not slow. Loading up Rails every time you run a test is slow.
- If you want to attract diversity, don't say the F-bomb.
- "I am so good they can't get rid of me." - House. House tests his self-worth by being so repugnant to test people. *House is a loser.*

If I did not tell you that this is not a Rails app, would you recognize that this is not a Rails app? Nothing in the top level talks about what the application does. Apparently, the most important part of teh application is the framework behind it. But the web is a *delivery mechanism*. It is a pipe. It is not the central thing, it is just the dumb detail. And yet it dominates our code. We know that a web app is a web app because of a `controllers` directory because no other type of application has controllers, views, and models.

The top-level architecture SCREAMS its intent at you. The top-level of a Rails app reflects the delivery mech, not the intent. Isn't architecture about intent?

1993: Object-Oriented Software Engineering. In this book he figured out how to communicate intent: the use case development approach.

Use cases: Application specific. Multiple user stories become a use case. "This is the central abstraction of the object." This is an "interactor", or an object that implements a use case.

Interactors have application specific business rules. They aren't in the framework. So you have entities which represent business objects. These business objects span more than one application. So you want application-agnostic business rules in your entities. *Entity things should not know about the database and the delivery mechanisms.* So we have to have *boundaries* or interfaces. So we have a whole bunch of interactors which represent use cases, a whole bunch of entities, each of which represents a business object, and all of the business rules go in here.

Validation, such as stuff that run in JS, are still part of the module. They are still decoupled.

Delivery mechanism must not CARE about the interactor/entity. Delivery mech interacts with the Boundary, and the interactors/entities are gems. So the delivery mechanism is a PLUG-IN to the real logic shit. So cucumber will run faster. Since there is no web server, tests will run really fast.

[TODO 25 mins]


