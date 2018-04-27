# Event Sourcing made Simple
[Reference](https://kickstarter.engineering/event-sourcing-made-simple-4a2625113224)

- Git: who made the change, what the change was, why the change was done (title), how the change was made (diff), and you can go back in time (checkout).
- Data history: `Datomic` or `PaperTrail.rb`.
- Event sourcing system:
  - Events, calculators, aggregates, reactors.
  - Martin Fowler: "All changes to an application state are stored as a sequence of events."
  - Things that generate events: user action, API calls, callbacks, cron jobs.
- Aggregates: represent the current state of the system (think order cart).
- Calculators: read events and update aggregates accordingly (a list of things ordered, the price of all those things).
- Reactor: Things that react to events: ex, getting shipped means sending an email notification.

## Components of an event sourcing system:

- Events to provide a history.
- Aggregates to represent the current state of the application.
- Calculator to update the state of the application.
- Reactors to trigger side effects as events happen.

## Why Event Sourcing?

- The data your write (events) is decoupled from the data you read (aggregates), so you can design your aggregates for the current needs of the application.
- Different possible aggregates for different read-intensive applications: orders' summary (list views), orders' details (one order), orders' daily reports (BI), etc.
- Good for distributed systems that tend to be asynchronous and have various services or serverless functions.

## Requirements

- Shouldn't be too slow, quick to learn, and easy to rip out/rollback to regular Rails/MVC.
- ES implementation doesn't reach GraphQL.
- Homemade ES framework: Aggregates has an event table associated to it. Events are created and applied to the aggregate in an SQL transaction.

## The Code

- Rails models are the same, but they have a `has_many :events`.
- Base class for `BaseEvent`.
- Subscribing reactors to events: Dispatcher, either async or synchronous.

## Commands

- Validates attributes, validates that the action can be performed, builds and persists the event.

# Rails Event Store
[Reference](http://railseventstore.org/)

- Publish-subscribe bus.
- Decoupling core business logic from external concerns.
- Alternative to AR callbacks and Observers.
- Communication layer.
- Audit log.
- Read-models.
- Implement event-sourcing.
