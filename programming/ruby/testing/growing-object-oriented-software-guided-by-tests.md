# Growing Object-Oriented Software, Guided by Tests

# 1: What is the Point of TDD?

Developers often don't completely understand the technologies they’re using. They have to learn how the components work whilst completing the project.

We think that the best approach a team can take is to use empirical feedback to learn about the system and its use, and then apply that learning back to the system. A team needs repeated cycles of activity. In each cycle it adds new features and gets feedback about the quantity and quality of the work already done. The team members split the work into time boxes, within which they analyze, design, implement, and deploy as many features as they can.

The sooner we can get feedback about any aspect of the project, the better. Many teams in large organizations can release every few weeks. Some teams re- lease every few days, or even hours, which gives them an order of magnitude increase in opportunities to receive and respond to feedback from real users.

Start with an acceptance test, then while it's failing, let it demonstrate that the system does not implement the feature, and when it passes, we're done.

A system is deployable when the acceptance tests all pass, because they should give us enough confidence that everything works.

External quality: how well the system meets the needs of its customers and users.

Internal quality: how well it meets the needs of the developers and administrators.

# 2: Test-Driven Development with Objects

*The big idea is "messaging": The key in making great and growable systems is much more to design how its modules communicate rather than what their internal properties and behaviors should be. -- Alan Kay*

Objects communicate by messages: It receives messages from other objects and reacts by sending messages to other objects and returning a value or exception to the original sender.

Values: Immutable instances that model fixed quantities. They have no individual identity (2 value instances are the same, if they have the same state).

Objects: Use mutable state to model their behavior over time. States can diverge if they receive different messages in the future.

Split the system into values (treated functionally) and objects (implement stateful behavior of the system).

### Follow the Messages

In Java, we identify roles with interfaces rather than concrete classes. In our view, the domain model is in the communication patterns. They show the communication of the different classes.

Ex: In a video game: actors, scenery, effects, GameEngine, renderer, animator, collision detector

## But Sometimes Ask

We ask when getting information from values and collections, or when using a factory to create new objects. Don't do this:

    class Train
      def reserve_seats(reservation_request)
        carriages.each do |carriage|
          if (carriage.get_seats.get_percent_reserved < percent_reserved_barrier)

You are exposing the internal structure of Carriage to implement this. Just answer the questions being asked:

    carriages.each do |carriage|
      if carriage.has_seats_available_with(percent_reserved_barrier)

Adding a query method moves the behavior to the most appropriate object, gives it an explanatory name, and makes it easier to test.

## Unit-Testing the Collaborating Objects

The essential structure of a test:

- Create any required mock objects.
- Create any real objects, including the target object.
- Specify how you expect the mock objects to be called by the target object.
- Call the triggering methods on the target object.
- Assert that any resulting values are valid and that all the expected calls have been made.

# The Process of Test-Driven Development
====================

# 4: Kick-Starting the Test-Driven Cycle

The quandary in writing and passing the first acceptance test is that it's hard to build both the tooling and the feature it's testing at the same time. Changes in one disrupt progress made with the other, and tracking down failures is tricky when the architecture, the tests, and the production code are all moving.

To solve this, we split it into two smaller problems: First, work out how to build, deploy, and test a "walking skeleton", then use that infrastructure to write the acceptance tests for the first meaningful feature.

Walking skeleton: "thinnest possible slice of real functionality that we can automatically build, deploy, and test end-to-end". Ex, for a database-backed web application, a skeleton would show a flat web page with fields from the database.

We want our test to start from scratch, build a deployable system, deploy it into a production-like environment, and then run the tests through the deployed system. We want to make sure btw that the scripts have been exercised by the time we have to deploy for real.

*Nothing forces us to understand a process better than trying to automate it.* This is also often the moment where the development team bumps into the rest of the organization and has to learn how it operates.

## Deciding the Shape of the Walking Skeleton

We can't automate the build, deploy, and test cycle without some idea of the overall structure. Rule of thumb: We should be able to draw the design for the "walking skeleton" in a few minutes on a whiteboard.

We use the automation of building and testing to give us feedback on qualities of the system, such as how easily we can cut a version and deploy, how well the design works, and how good the code is.

## Expose Uncertainty Early

It usually takes time to get a "walking skeleton" working -- the first step involves establishing a lot of infrastructure and asking many questions. (This is unpredictable.) After a few features have been implemented and the project automation has been built up, a routine is made. The end-game should be a steady production of functionality. The mundane and brittle tasks, such as deployment and upgrades, will have been automated so that they "just work".

For an existing system, the safest way to start the TDD process is to automate the build and deploy process, and then add end-to-end tests that cover the areas of the code we need to change. Then we can start to address internal quality issues with more confidence, refactoring the code and introducing unit tests as we add functionality.

# 5: Maintaining the Test-Driven Cycle

## Start Each Feature with an Acceptance Test

We use terminology from the application's domain (not from the underlying technologies), so we aren't tied up about the implementation of the test. This also shields our acceptance test suite from changes to the system's technical infrastructure. If a third-party organization changes the protocol used by their services from FTP and binary files to web services/XML, we should not have to rework the tests for the systems' application logic.

When we write acceptance tests to describe a new feature, we expect them to fail until that feature has been implemented; new acceptance tests describe work yet to be done. Once passing, the acceptance tests now represent completed features and should not fail again. A failure means that there's been a regression and that we've broken our existing code.

*Unit and integration tests support the development team, should run quickly, and should always pass, although they might take longer to run. New acceptance tests represent work in progress and will not pass until a feature is ready.*

## Start testing with the Simplest Success Case

Do the simplest case that could possibly work (simple should not be interpreted as simplistic). Degenerate cases don't add much to the value of the system anyway. Focusing on the failure cases at the beginning of a feature is bad for morale -- if we only work on error handling it feels like we're not achieving anything.

*Start with the simplest success case, soe we'll have a better idea fo the real structure of the solution, and we can prioritize handling failures or other success cases.*

Example of incremental approach: moon program. The 7 missions had their own steps: (unmanned command module test, unmanned lunar module test, manned CSM in low Earth orbit, manned CSM and LM in low Earth orbit...

Write the test that you'd want to read--we want each test to be as clear as possible an expression of the behavior to be performed by the system or object. Ignore the fact that the test won't run or compile, just concentrate on its text; we act as if the supporting code already exists.

*Test must read well.*When the test reads well, we then build up the infrastructure to support the test. We know we've implemented enough of the supporting code when the test fails in the way we'd expect.

*Watch the test fail.* If the test fails in a way that we didn't expect, we know we've misunderstood something or that the code is incomplete, so we fix that. If it's the "right" failure, we can check that the diagnostics are helpful.

*Develop for the Inputs to the Outputs.* The end-to-end tests for the feature will simulate these events arriving. At the boundaries of our system, we will need to write one or more objects to handle these events. Then we discover that these objects need services, and these need objects, and these need services...

In this way, we work our way through the system: from the objects that receive external events, through the intermediate layers, to the central domain model, and then on to other boundary objects that generate an external visible response.

It's tempting to start by unit-testing new domain model objects and then trying to hook them into the rest of the application, but we're more likely to get bitten by integration problems later.

*Unit-test behavior, not models. A test called `test_bid_accepted` tells us what it does, not what it's for.* We do better when we focus on the features that the object under test should provide. We need to know how to use the class to achieve a goal, not how to exercise all the paths through its code.

*Listen to the tests.* If code is difficult to test, the most likely cause is that our design needs improving.

# 6: Object-Oriented Style

Value code that is easy to maintain over code that is easy to write. Implementing a feature in the most direct way can damage the maintainability of the system, by making the code difficult to understand or by introducing hidden dependencies between components.

We grow our systems a slice of functionality at a time. As the code scales up, the only way we can continue to understand and maintain it is by structuring the functionality into objects, objects into packages, packages into programs, and programs into systems.

## 2 Principal Heuristics:

*Separation of concerns.* When we have to change the behavior of a system, we want to change as little code as possible. If all the relevant changes are in one area of code, we don't have to hunt around the system to get the job done.

Because we can't predict when we have to change any part of the system, we gather together code that wll change for the same reason. Ex: code to unpack messages from an Internet standard protocol will not change for the same reasons as business code that interprets those messages, so we partition the two concepts into different packages.

*Higher levels of abstraction.* The only way for humans to deal with complexity is to avoid it, by working at higher levels of abstraction.

"Ports and adapters" -- code for business domain is isolated from its dependencies on technical infrastructure, such as databases and user interfaces. We don't want technical concepts to leak into the application model, so we write interfaces to describe its relationships with the outside world *its terminology.* Then we write bridges between the application core and each technical domain (adapters).

*Encapsulation.* Ensures that the behavior of an object can only be affected through its API. (Private/public thing).

*Information hiding.* Conceals how an object implements its functionality behind the abstraction of its API. It lets us work with higher abstractions by ignoring lower-level details that are unrelated to the task at hand.

While working with badly encapsulated code, we spend too much time tracing where the potential effects of a change might be, looking at where objects are created, what common data they hold, and where their contents are referenced.

We follow standard practices to maintain encapsulation when coding: define immutable value types, avoid global variables and singletons, copy collections and mutable values when passing them between objects, and so on.

## Internals vs. Peers

As we organize our system, we must decide what is inside and outside each object, so that the object provides a coherent abstraction with a clear API. Much of the point of an object is to encapsulate access to its internals through its API and hide these details from the rest of the system.

## Helpers/Functional Programming

We often write helper methods to make code more readable. We're not afraid of adding very small methods if they clarify the meaning of the feature they represent. We use the *message-passing* style we've described between objects, but we tend to use a more functional style within an object, building up behavior from methods and values that have no side effects.

Features without side effects mean we can assemble our code from smaller components, minimizing the amount of risky shared state.

*Every object should have a single, clearly defined responsibility, this is the SRP. When we're adding behavior to a system, this principle helps us decide whether to extend an existing object or create a new service for an object to call.*

Our heuristic is that we should be able to describe what an object does without using "and" and "or". If we find ourselves adding clauses to the description, then the object probably should be broken up into collaborating objects usually one for each clause.

This principle also applies when we're combining objects into new abstractions. If we're packaging behavior implemented across several objects into a single construct, we should be able to describe its responsibility clearly.

## Object Peer Stereotypes

*Dependencies.* Services that the object requires from its peers so it can perform its responsibilities. The object cannot function without these services. *You should not be able to create an object without them.*

*Notifications.* Peers that need to be kept up to date with the object's activity. The object will notify interested peers whenever it changes state or performs a significant action.

Notifications are "fire and forget"; the object neither knows nor cares which peers are listening. Notifications are so useful because they decouple objects from each other. Ex: In a UI, a button component promises to notify any registered listeners when it's clicked, but does not know what those listeners will do. Similarly, the listeners expect to be called but know nothing of the way the UI dispatches its events.

*Adjustments.* Peers that adjust the objects' behavior to the wider needs of the system. Ex: policy objects that make decisions on the object's behalf, and components parts of the object if it's a composite. Ex: A `JTable` will ask a `TableCellRenderer` to draw a cell's value. If we change the renderer, the table will change its presentation.

Dependencies must be passed in through the constructor. *Partially creating an object and then finishing it off by setting properties is brittle because the programmer has to remember teo set all the dependencies. (We get `NullPointerException`).*

Notifications and adjustments can be passed to the constructor as a convenience. They can be initialized to safe defaults and overwritten later. We then add methods to allow callers to change these default values, and add or remove listeners.

*Composite Simpler Than the Sum of Its Parts*

All objects in a system, except for primitive types built into the language, are composed of other objects. When composing objects into a new type, we want this new type to exhibit simpler behavior than all of its component parts considered together. The composite object's API must hide the existence of its component parts and the inteactions between them, and expose a simpler abstraction to its peers.

Bad:

    money_editor.get_amount_field.set_text(String.value_of(money.amount))
    money_editor.get_currency_field.set_text(money.currency_code)

    money_editor.set_amount_field(money_amount())
    money_editor.set_currency_field(money_currency_code())

Good:

    money_editor.set_value(money)

*The API of a composite object should not be more complicated than that of its components.*

The "context independence" rule helps us decide whether an object hides too much or hides the wrong information. *A system is easier to change if its objects are context-independent: if each object has no built-in knowledge about the system in which it executes.* We can take units of behavior (objects) and apply them in new situations.

*To be context-independent, whatever an object needs to now about the larger environment it's running must be passed in.* Those relationships might be "permanent" (passed in on construction) or "transient" (passed in to the method that needs them).

*In this "paternalistic" approach, each object is told just enough to do its job and wrapped up in an abstraction that matches its boundary.*

*Eventually, the chain of objects reaches a process boundary, which is where the system will find external details such as host names, ports, and UI events.*

One Domain Vocabulary: Better to make their relationships explicit, defined separately from the objects themselves.

*Hiding the Right Information.* It makes sense to hide the data structure used for the cache in the `CachingAuctionLoader` class. Sometimes it doesn't make sense to hide the name of the application's log file in the `PricingPolicy` class.

# 7: Achieving Object-Oriented Design

A caller wants to know what an object does and what it depends on, but not how it works. We also want an object to represent a coherent unit that makes sense in its larger environment--a system built from such components will have the flexibility to reconfigure and adapt as requirements change.

*Starting with a test means we describe WHAT we have to achieve before we consider HOW.* This focus helps us maintain the right level of abstraction for the target object.

## How Writing a Test First Helps the Design

If the intention of the unit test is unclear, then we're probably mixing up concepts and not ready to start coding.

To keep unit tests understandable, we have to limit their scope--no unit tests more than twelve lines please. The component they're testing is probably too large and needs to be broken up into smaller components.

To construct an object for a unit test, we have to pass its dependencies to it, which means we know what they are. This encourages context independence, since we have to be able to set up the target object's environment before we can unit-test it. Objects with implicit or too many dependencies is painful to prepare for testing.

## Communication over Classification

We want to achieve a well-designed class structure, but we think the communication patterns between objects are more important.

TDD with mock objects also encourages information hiding. We should mock an object's peers--its dependencies notifications, and adjustments, but not its internals. Tests that highlight an object's neighbors help us to see whether they are peers, or should instead be internal to the target object.

A test that is clumsy or unclear might be a hint that we've exposed too much implementation, and that we should rebalance the responsibilities between the object and its neighbors.

## Introducing Value Types

*Values are immutable, and objects have state, so they have identity and relationships with each other.* The more we write, the more we've convinced that we should define types to represent value concepts in the domain, even if they don't do much.

*Breaking out.* Break a class that handles incoming messages into two parts: one to parse the message string, one to interpret the result of the parsing.

*Budding off.* When we want to mark a new domain concept in the code, we often introduce a placeholder type that wraps a single field, or maybe has no fields at all. As the code grows, we fill in more detail in the new type by adding fields and methods.

*Bundling up.* When we notice that a group of values are always used together, we take that as a suggestion that there's a missing construct. Create a new type with fixed public field, then migrate behavior to the new type.

## Where Do Objects Come From?

When code becomes complex  to understand, we can pull out cohesive units of functionality into smaller collaborating objects, which we can then unit-test independently. Splitting out a new object also forces us to look at the dependencies of the code we're pulling out.

Concern 1: How long should we wait before doing something? Concern 2: Occasionally it's better to treat this code as a spike--once we know what to do, just roll it back and reimplement cleanly.

When code is more stable and ha some degree of structure, we discover new types by "pulling" them into existence--*we might be adding behavior to an object and find that, following our design principles, some new feature doesn't belong inside it.*

When implementing an object, we discover that it needs a service that needs to be provided by another object. We give the new service a name and mock it out in the client object's unit tests, to clarify the relationship between the two. Then we write an object to provide that service and discover what services that object needs. Then, follow this chain until we connect up to existing objects, either our own or from a third-party API.

### Bundling Up: Hiding Related Objects into a Containing Object

When we have a cluster of related objects that work together, we can package them up in a containing object. The new object hides the complexity in an abstraction that allows us to program at a higher level.

Nice effects: We have to give it a name which helps us understand the domain a little better. Second, we can scope dependencies more clearly, since we can see the boundaries of the concept. Third, we can be more precise with our unit testing--we can test the new composite object directly, and use a mock implementation to simplify the tests for code from which it was extracted.

*When the test for an object becomes too complicated to set up, considering bundling up some of the collaborating objects.*

### Identify Relationships with Interfaces

We use interfaces to name the roles that objects can play and to describe the messages they'll accept. We also prefer interfaces to be as narrow as possible, even though that means we need more of them. *The fewer methods there are on an interface, the more obvious is its role in the calling object.*

Narrow interfaces are also easier to write adapters and decorators for; there's less to implement, so it's easier to write objects that compose together well.

What's good about driving an interface from its client is that it avoids leaking excess information about its implementers, which minimizes implicit coupling between objects.

### Refactor Interfaces Too

In a reasonably large code base, we often start to find interfaces that look similar. This means we should look at whether they represent the same concept and should be merged. Extracting common roles makes the design more malleable because more components will be "plug-compatible", so we can work at a higher level of abstraction.

Consider refactoring interfaces when we start implementing them. If we find that the structure of an implementing class is unclear, perhaps it has too many responsibilities.

Organize the code into two layers: implementation (the graph of objects), and declarative (builds up the objects in the implementation layer using small "sugar" methods. *The declarative layer describes what the code will do, while the implementation layer describes how the code does it.*

On classes, we view it as an "implementation detail"--a way of implementing types, not the types themselves.



====================
