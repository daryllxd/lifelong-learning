# Growing Object-Oriented Software, Guided by Tests

# 1: What is the Point of TDD?

Developers often don’t completely understand the technologies they’re using. They have to learn how the components work whilst completing the project.

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

In Java, we identify roles with interfaces rather than concrete classes. In our view, the domain model is in teh communication patterns. They show the communication ofthe different classes.

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

The quandary in writing and passing the first acceptacne test is that it's hard to build both the tooling and the feature it's testing at the same time. Changes in one disrupt progress made with the other, and tracking down failures is tricky when the architecture, the tests, and the production code are all moving.

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

Write the test that you'd want to read--we want each test to be as clear as possible an expression of the behavior to be performed by the system or object. Ignore the fact that the test won't run or compile, just concentrate on its text; we act as if the suporting code already exists.

*Test must read well.*When the test reads well, we then build up the infrastructure to support the test. We know we've implemented enough of the supporting code when the test fails in the way we'd expect.

*Watch the test fail.* If the test fails in a way that we didn't expect, we know we've misunderstood something or that the code is incomplete, sowe fix that. If it's the "right" failure, we can check that the diagnostics are helpful.

*Develop for the Inputs to the Outputs.* The end-to-end tests for the feature will simulate these events arriving. At the boundaries of our system, we will need to write one or more objects to handle these events. Then we discover that these objects need services, and these need objects, and these need services...

In this way, we work our way through the system: from the objects that receive external events, through the intermediate layers, to the central domain model, and then on to other boundary objects that generate an extrnal visuble response.

It's tempting to start by unit-testing new domain model objects and then trying to hook them into the rest of the application, but we're more likely to get bitten by integration problems later.

*Unit-test behavior, not models. A test called `test_bid_accepted` tells us what it does, not what it's for.* We do better when we focus on the features that the object under test should provide. We need to know how to use the class to achieve a goal, not how to exercise all the paths through its code.

*Listen to the tests.* If code is difficult to test, the most likely cause is that our design needs improving.

# 6: Object-Oriented Style

Value code that is easy to maintain over code that is easy to write.

*Internals vs. Peers* 
