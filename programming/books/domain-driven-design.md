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

#### Example: Purchase Order Integrity

- What we want:
  - Invariant enforcement, when a new line item is added, the PO checks the total and marks itself invalid if an item pushes it over the limit. As we'll see, this is not adequate protection.
  - Change management. When the PO is deleted or archived, the line items are taken along, but the model gives no guidance on where to stop following the relationships.
  - Sharing the database.
- Problems:
  - 2 people can edit at the same time.
  - Locking: If too many work on the thing at the same time, it can get cumbersome.
- Knowledge:
  - Par ts are used in many Orders (high contention).
  - There are fewer changes to parts than there are to POs.
  - Changes to part prices do not necessarily propagate to existing POs.
- The solution is to tighten the relationship of the PO and its line items, more so than the parts.

#### Factories

- Factory Method, Abstract Factory, and Builder.
  - Each operation must be atomic. You pass in everything needed to create a complete product in a single interaction with the factory.
  - The factory will be coupled to its arguments.
- Where does invariant logic go?
  - The factory can delegate invariant checking to the product, and this is often best.
  - Entity factory object **does not** assign a new tracking ID. This would lose the continuity with the object's previous incarnation.
- Reconstituting Stored Objects:
  - Few database technologies get stored in databases or transmitted through a network. **So retrieval requires a potentially complex process of reassembling the parts into a live object.**

#### Repositories

- We must have a starting point for a traversal to an ENTITY or VALUE in the middle of its life cycle.
- A database search is globally accessible and makes it possible to go directly to any object.
- Should a Customer object hold a collection of all the orders placed, or should the Orders be found in the database, with a search on the Customer ID field?
- From a technical point of view, retrieval of a stored object is really a subset of creation.

- **The goal of domain-driven design is to create better software by focusing on a model of the domain rather than the technology. By the time a developer has constructed an SQL query, passed it to a query service in the infrastructure layer, obtained a result set of table rows, pulled the necessary information out, and passed it to a constructor or Factory, the model focus is gone.**
- **Think of the objects as containers for the data that the queries provide, and the whole design shifts towards a data-processing style.**
- Infrastructure such as Metadata Mapping Layers help a great deal, by making easier the conversion of the query result into objects, but the developer is still thinking about technical mechanisms, not the domain.
- When client code uses the database directly, developers are tempted to bypass model features such as aggregates, or even object encapsulation, instead directly taking and manipulating the data they need. **More and more domain rules become embedded in query code or simply lost. Object databases do eliminate the conversion problem, but search mechanisms are usually still mechanistic, and developers are still tempted to grab whatever objects they want.**
- Better way of accessing things?
  - Transients leave brief lives, so no need to have a query there.
  - No need to queries for persistent objects that are more convenient to find by traversal.
  - Most importantly, any object internal to an aggregate is prohibited from access except by traversal from the root.
- A subset of persistent objects must be globally accessible through a search based on object attributes. Such access is needed for the roots of aggregates that are not convenient to reach by traversal. They are usually entities, sometimes value objects with complex internal structure, and sometimes enumerated values.
- Providing access to other objects muddles important distinctions. Free database queries can actually breach the encapsulation of domain objects and aggregates. Exposure of technical infrastructure and database access mechanisms complicates the client and obscures the model-driven design.

***Repository***: Represents all objects of a certain type as a conceptual set (usually emulated). It acts like a collection, except with more elaborate querying capability. Objects of the appropriate type are added and removed, and the machinery behind the repository inserts them or deletes them from the database.

- Clients request objects from the repository using query methods that select objects based on criteria specified by the client, typically the value of certain attributes. They can choose to implement a variety of queries that select, return summary information/count/calculations.

`client → (selection criteria/What do I need?) → repository → delegate (Encapsulates database access, technology, strategy.) → Metadata, factories, other repositories?`

- For each type of object that needs global access, create an object that can provide the illusion of an in-memory collection of all objects of that type. Set up access through a well-known global interface. Provide methods to add and remove objects, which will encapsulate the actual insertion or removal of data in the data store.

- Advantages of repositories:
  - They present clients with a simple model for obtaining persistent objects and managing their life cycle.
  - They decouple application and domain design from persistence technology, multiple database strategies, or even multiple data sources.
  - They communicate design decisions about object access.
  - They allow easy substitution of a dummy implementation, for use in testing (typically using an in-memory collection).

- Implementation varies greatly, depending on the technology being used for persistence and the infrastructure you have.
- The idea is to hide all the inner workings from the client, so that client code will be the same whether the data is stored in an object database, relational database, or held in memory.
- Concerns:
  - **Abstract the type:** a repository "contains" all instances of a specific type, but this does not mean that you need one repository for each class. The type could be an abstract superclass of a hierarchy.
  - **Taking advantage of the decoupling from the client:** you have more freedom to change the implementation of a repository than you would if the client were calling the mechanisms directly. You can take advantage of this to optimize for performance, by varying the query technique or by caching objects in memory.
  - **Leave transaction control to the client.** Although the repository will insert into and delete from the database, it could possibly not commit anything yet (Rails's `new`?).
- Relationship with factories:
  - A factory handles the beginning of an object's life, a repository helps manage the middle and the end. When objects are held in memory, or stored in an object database, this is straightforward.
  - **A factory makes new objects, a repository finds old objects. The client of a repository should be given the illusion that the objects are in memory. The object may have to be reconstituted, but it is the same conceptual object, still in the middle of its life cycle.**
  - A factory's job: to instantiate a potentially complex object from the data.

### Designing Objects for Relational Databases

- The database doesn't just interact with the objects, it's literally storing the persistent form of the data that makes up the objects themselves.
- For the common cases of an RDBMS acting as the persistent form of an object-oriented domain, simple directness is the best. A table row should contain an object. A foreign key in the table should translate to a reference to another entity object.



`intellisense` for ruby








- Query objects: pull the exact data they need from the database, or to pull a few specific objects rather than navigating from aggregate roots. Domain logic moves into queries and client code, and the entities and value objects become mere data containers.





