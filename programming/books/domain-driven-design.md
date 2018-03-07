# Domain-Driven Design

## Part 1: Putting the Domain Model to Work

- The subject area to which the user applies the program is the domain of the software.
- To create software that is involved in users' activities, a dev team must know those activities.
- A domain model is an organized and selective abstraction of that knowledge.
- To determine the choice of a model:
  - The model and the heart of the design.
  - The model is the backbone of a language used by team members.
  - The model is distilled knowledge.

### Chapter 1: Crunching Knowledge

- Prototype: driven by an automated test framework. No infrastructure, no user interface. This allowed me to concentrate on the behavior.
- Effective modelling:
  - Binding the model and the implementation.
  - Cultivating a language based on the model.
  - Developing a knowledge-rich model. The model wasn't just a data schema; it was integral to solving a complex problem.
  - Distilling the model. Concepts were dropped out when they didn't prove useful or central.
  - Brainstorming/experimenting.
- Knowledge-rich design:
  - Voyage determines cargo sizes.
  - It turns out, voyages have an `OverbookingPolicy` that's taken into consideration when determining cargo.

### Chapter 2: Communication and the Use of Language

### Chapter 3: Binding Model and Implementation

- Tightly relating the code to an underlying model gives the code meaning and makes the model relevant.
- Design a portion of the system to reflect the domain model in a very literal way, so that the mapping is obvious. Revisit the model and modify it to be implemented more naturally in software, even as you seek to make it reflect deeper insight into the domain.
- If the people who write the code do not feel responsible for the model, or don't understand how to make the model work for an application, then the model has nothing to do with the software. If developers don't realize that changing code changes the model, then their refactoring will weaken the model rather than strengthen it.

## Part 2: The Building Blocks of a Model-Driven Design

### Chapter 4: Isolating the Domain

- UI → Application (Rails) → Domain → Infrastructure.
- When the domain-related code is diffused through such a large amount of other code, it becomes extremely difficult to see and to reason about.
- App layer: Directs the expressive domain objects to work out problems. Thin, no business rules or knowledge, but only coordinates tasks and delegates work to collaborations of domain objects in the next layer down.
- Domain layer: Responsible for representing concepts of the business, information about the business situation, and business rules.
- Layers are meant to be loosely coupled, with design dependencies in only one direction.

### Chapter 5: A Model Expressed in Software

- Entity vs value: Entities represent something with continuity and identity, and values describe the state of something else.
- Actions/operations: services. Rather than forcing responsibility for an operation onto some entity or value object, a service is done for a client on a request.
- There are many services in the different technical layers of the software.

- Associations: For every traverse-able association in the model, there is a mechanism in the software with the same properties. We make choices on:
  - Imposing a traversal direction.
  - Adding a qualifier.
  - Eliminating unneeded associations.
- Think countries and presidents. You usually start with countries then get presidents from those.
- Bidirectional association means that both objects can be understood only together.

- Entities
  - "Am I the same person I was at age five?" The answer to this question only matters to the system if the user of the application cares if you were the same person at age five.
  - The contexts for customers change: you can be normalized or be a column in a table.
  - Conceptual identity needs to be matched between objects. Two customer contacts may have the same name. In distributed software, multiple users could be entering data from different sources.
- Some objects are not defined primarily by their attributes. They represent a thread of identity that runs through time.
- When an object is distinguished by its entity, make this primary to its definition in the model. Keep the class definition simple and focused on life cycle continuity and identity.
  - Define a means of distinguishing each object regardless of its form or history.
  - Be alert to requirements that call for matching objects by attributes.
  - The model MUST define what it means to be the same thing.
  - Possible: make a unique key for the user, which will never be seen.
  - Generated ID is interesting to the user for things like tracking numbers.

- Value Objects
  - An object that represents a descriptive aspect of the domain with no conceptual identity is called a value object.
  - Address: For a mail order company, it's a value object if you just need it to confirm the credit card, not to address the parcel. For the postal company, it's an entity because these are related to the zip code/have their own identities.
  - When you only care about the attributes of an element of the model, classify it as a value object. Make it express the meaning of the attributes and give it related functionality.
  - Sharing? Only when space saving/immutable object/communication overhead is low.
  - If a value's implementation is to be mutable, then it must NOT be shared. Try making them as immutable as you can.
  - Connecting 2 value objects doesn't make sense, because there's no identity to say that an object point back to the same value object that points to it. You can just say they are equal. If you think associations seem necessary, then maybe one of those values are actually entities.

- Services
  - A service is an operation offered as an interface that stands alone in the model, without encapsulating state, as entities and value objects do.
  - Characteristics of good services:
    - Relates to a domain concept that is not a natural part of an entity or value object.
    - The interface is defined in terms of other elements of the domain model.
    - The operation is stateless.
  - Infrastructure service: something that encapsulates the e-mail system or other forms of notification.
  - Application service: Responsible for ordering the notification.
  - Domain: responsible for determining if something was met.
- Services into Layers:
  - Application: Funds transfer app service.
    - Digests input, such as XML request.
    - Sends message to domain service for fulfillment.
    - Listens for confirmation.
    - Decides to send notification using Infrastructure service.
  - Domain: Funds transfer domain service.
    - Interacts with necessary Account and Ledger objects, making appropriate debits and credits.
    - Supplies confirmation of result.
  - Infrastructure: Send notification service.
    - Sends emails, letters, and other communications as directed by the application.

- Modules/packages.
  - Me: Looks Java-ish.

- Modelling Paradigms
  - Me: Looks Java-ish.

### Chapter Six: The Life Cycle of a Domain Object.

- Aggregates
  - It is difficult to guarantee the consistency of changes to objects in a model with complex associations. We need to somehow create a system to make sure that we know when an object made up of objects begins and ends.
  - Factor when choosing what to aggregate: What is the frequency of change between the instances of certain classes. We need to find a model that leaves high-contention points looser and strict invariants tighter.
  - Each Aggregate has a root and boundary. The root is the only member of the aggregate that outside objects are allowed to hold references to, although objects in that boundary may hold references to the other.
- Rules for aggregates:
  - The root entity has global identity and is ultimately responsible for checking invariants.
  - Root entities have global identity. Entities inside the boundary have local identity.
  - A delete operation must remove everything within the Aggregate boundary at once.
