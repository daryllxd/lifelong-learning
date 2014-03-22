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

    Delivery Mech -> Boundary <- Interactor -> Entity

Delivery mechanism must not CARE about the interactor/entity. Delivery mech interacts with the Boundary, and the interactors/entities are gems. So the delivery mechanism is a PLUG-IN to the real logic shit. So cucumber will run faster. So you can choose to not plug in the delivery mechanism when you're running tests. So you can go get your tests to run very fast hehehe.

What happens is that the request is just a data structure, since the logic and business rules and use cases are all on the far side of the delivery mechanism.

Interactors would be `AddItemToOrder, DeleteOrder...`. So at the top, you can see the intent of the application.

## What about MVC?

Where did "MVC is the architecture of the web" come from? Model is some entity of the business. Controller bla bla and the view outputs to the user. View observes the model and when the model changes the view is changed. What we have is:

    Models -> Controllers
           -> Views reach into the business objects. They should not know about the business objects.

*Views*: Presenter converts the data into a view. Views should be so stupid that you don't have to write unit tests for it. Stuff such as the name of the buttons should be in the view models. I just make sure there is no point in testing the view. Just put an acceptance test.

    Controller -> Request Model
                      ^ 
                  Boundary      <- Interceptor

    Presenter  -> Boundary      <-
                      v
                  Response model

The controller/presenter could be turned into a gem. Everything to the right should be turned into a gem.

*Database*: Unfortunately we see the database at the center of the application. The database is a detail, something you don't know about. It must "somehow store things". I don't care how it stores them. I want objects and entities out of the database. I want to defer the interactions to the database.

What I want is a Entity Gateway where things pass through it to access the database. *Architecture is about drawing a line and making sure that everything going through the line goes in one direction only.* So we _want_ to run the tests without a database.

So, where would ActiveRecord be in all of this? The delivery mechanism is just Controller/Presenter. FitNesse. FIT: Framework for Integration Testing. 

First, they mocked the pages. Then, they mocked the other pages "in-memory". So everything works but nothing saves. Then they made mocks of the database.

A good architecture allows major decisions to be deferred! Get your use cases working, get your tests passing, then if you need to show something then just make something really quickly.

*A good architecture maximizes the number of decisions not made.* It makes you keep your options open for as long as you can.

This is why you have to write the tests first. So you know that you're done. So you know that the tests cover everything and you can _refactor everything_. Without tests, you find it hard to actually do something, and you will fear your code especially when you don't do things on your own. You have to know that every line of code that you wrote was because of a failing test.

It's not enough to write your tests first. If your tests aren't fast then you don't do tests. This is why you remove everything that's slows the test down.

