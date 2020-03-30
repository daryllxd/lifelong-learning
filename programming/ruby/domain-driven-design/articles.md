## DDD building blocks
[Reference](https://blog.lelonek.me/ddd-building-blocks-for-ruby-developers-cdc6c25a80d2)

- Domain: A subject of matter that we are building software on.
- Invariant: Described something that must be true with your design all the time.
- Bounded context: A specific responsibility enforced by explicit boundaries.
- Adapter: A bridge between an application/service needed by the application.
- Aggregate: Cluster of domain objects that can bet treated as a single unit to provide a specific functionality/for the purpose of data changes.
- Aggregate root: Entry point for data access.
- Entity: An object defined not by its attributes, but by a thread of continuity and identity. A unique thing that has a life cycle and can change state.
- Value object: An immutable object that describes some characteristic but no concept of identity.
- Service: Communicates aggregate roots. Operation: Offered as an interface that stands alone in the model.
- Infrastructure service: Encapsulates IO, Database Access, Email, 3rd Party APIs. Repository implementation.
- Application service: Orchestrates the execution of domain logic and don't implement any domain logic.
- CQRS: Command-Query Responsibility Segregation. CQRS separates a model into two parts, the READ model and the WRITE model. Query/command.
  - Query: A structure of objects that can form itself into an SQL query.
  - Command: An operation that affects some change to the system.
- Event sourcing: Ensuring every change to the state of an application is captured in an event object, and that these event objects are themselves stored in the sequence they were applied for the same lifetime as the application state itself.
- Repository: Mediates between the domain/data mapping layers using a collection-like interface for accessing domain objects.
- Form object: An object that wraps incoming input from a user and provides a validation.

## DDD for Rails Developers. Part 1: Layered Architecture.
[Reference](https://www.sitepoint.com/ddd-for-rails-developers-part-1-layered-architecture/)

- Violations in Rails
  - Domain objects serializing themselves into JSON or XML. Your domain objects start being aware of the UI. Solution: Serializers.
  - Controllers contain big chunks of business logic. Solution: Service object.
  - Domain objects performing all sorts of infrastructure related tasks: "Swiss army knife" domain models. Split objects into those responsible for domain knowledge and others for performing infrastructure related tasks. Solution: AR::Observer or Service.
  - Domain objects know too much about the database. Solution: extract another layer responsibly for persistence.

## DDD for Rails Developers. Part 2: Entities and Values.
[Reference](https://www.sitepoint.com/ddd-for-rails-developers-part-2-entities-and-values/)

- Entity: AR::Base is an entity. Created, saved, read, updated, deleted/marked as deleted.
- Values: No identity. Immutable.

## DDD for Rails Developers. Part 3: Aggregates.

- A cluster of associated objects that are treated as a unit for the purpose of data changes.
- All external references are restricted to the root.
- Accessing other members of the Aggregate are restricted to the root.

### Building Rich Domain Models In Rails/Separating Persistence.
[Reference](http://vsavkin.tumblr.com/post/41016739721/building-rich-domain-models-in-rails-separating)

- Problem with AR: You need AR to run the tests.
- An instance of the class is responsible for saving and updating itself.
- Every instance exposes `update_attribute` and other methods.
- `has_many` allows bypassing an aggregate root.

- AR can be split into an Entity, a Data Object, and a Repository.
- Persistence: `OrderRepository`. Having a separate object is beneficial, because it simplifies testing as it can be mocked up or faked.

# Application Services - 10 common doubts answered
[Reference](https://blog.arkency.com/application-service-ruby-rails-ddd/)

