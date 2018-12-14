# Architecting Rails Apps as Microservices
[Reference](https://blog.codeship.com/architecting-rails-apps-as-microservices/)

- CMS editor, public website, notifier (used to notify subscribers of new published articles), and subscribers (used to manage user accounts and subscriptions).
- Considerations:
  - Do they scale differently?
  - Do they use different technologies? (Elixir for the Notifier).
  - Important: defining boundaries.
- Messages are passed via HTTP or wherever.
- Planning for failure: Up to the developer, can the website work when it's down?
- Circuit breaker pattern: detecting when a service is misbehaving and to avoid having to make a call that would most likely en up in an error anyway.
- Queues: Pass asynchronous messages back and forth between the various services. You can use this for sending emails, for example.
  - Options: ActiveJob, RabbitMQ.

# Microservices Book from Codeship

- Small service that does one thing well.
- Independent.
- Owns its own data.

# Microservices: Real Architectural Patterns
[Reference](https://blog.codeship.com/microservices-architectural-patterns)

- Evolution: Monoliths → Scaling business → Hitting the wall on what can be done, AWS made it easier to get access to a new server instance, and we got comfortable dealing with distributed systems.
- Arguments for:
  - Independent axes of scaling.
  - Independent failure domains.
  - Allow you to work independently on parts of the system.
- Investing in tooling?
  - Create a separate data store for each microservice.
  - For smaller teams, you can prevent sharing of database structures by convention.
  - You can define the data-owner services.
  - You can also have a tool that performs master data management by operating in the background to find and fix inconsistencies.
- MS for Data Stream Processing
  - Used for metrics-aggregating SaaS.
  - Imagine a service that just listens to the data stream, provides a new calculation, and pushes that calculation value back into the pipeline on a different channel.
  - Cron as Microservices. CloudWatch, scheduled Lambda functions, Gearman as a job runner.

# Adopting Microservices at Netflix: Lessons for Architectural Design
[Reference](https://dzone.com/articles/adopting-microservices-netflix)

- Switching to a microservices architecture creates exciting opportunities in the marketplace for companies.
- Adrian Cockcroft (Netflix):
  - Loosely coupled. You need to split the database up and denormalize it.
  - Bounded context: Self-contained for the purposes of software development.
- Create a separate data store for each microservice. Each team chooses the database that best suits the service.
- Tool to do master data management.
- Keep all code at a similar level of maturity. Much more common to split a service rather than put them together.
- Separate build for each microservice, so that it can pull in component files from the repository at the revision levels appropriate to it.
- Containers: important so you have one way to deploy.
- Treat servers as stateless.
- Delivery architecture: Nginx.

# Adopting Microservices at Netflix: Lessons for Team and Process Design
[Reference](https://www.nginx.com/blog/adopting-microservices-at-netflix-lessons-for-team-and-process-design/)

- You want a fast development cycle so you can give the customers what they want.
- High freedom and high responsibility. Netflix HR manual: "Act in Netflix's best interest."
- *Conway's Law: The interface structure of a software systems will reflect the social structure of the organization that produced it.*
- Manager for each product feature, which supervises a team that handles all aspects of software development for the microservice, from conception through deployment.
- Continuous delivery: each microservice represents a single product feature that can be updated independently of the other microservices and on its own schedule.
- Company culture: You want to implicitly authorize anyone who notices an opportunity to start a project to exploit it.

# It’s Time to Move to a Four‑Tier Application Architecture
[Reference](https://www.nginx.com/blog/time-to-move-to-a-four-tier-application-architecture/)

- Monolithic architecture: app + presentation + data tier behind it.
- Microservices: Put each element of functionality into a separate service, and scale by distributing these services across servers, replicating as needed.
- In the three-tier architecture: Unable to scale specific pieces of the app because the entire app is coupled together.
- Four-Tier Engagement Platform
  - Client: Mobile clients, wearables, IOT.
  - Delivery: Optimizes content, caches content, uses analytics to monitor user behavior.
  - Aggregation: Aggregates/federates services tier data, provides discovery for the underlying service library.
  - Services: On-premise systems of record, services, and data.

# Microservice Principles: Decentralized Data Management
[Reference](https://medium.com/@nathankpeck/microservice-principles-decentralized-data-management-4adaceea173f)

- Creating a logical distinction for the databases sets the platform up for easy physical scaling in the future.
- In decentralized data, an SQL join is not only not advised, but is actually impossible if the data is separated.
- Ex: Timeline service + Users + Messages + Friends service.
- Eventual consistency: Sometimes the linked tables need to be handled by a single microservice.
- Polyglot persistence: Different types of data have different storage requirements.
  - Read/write balance.
  - Data structure: NoSQL or RDBMS?
  - Data querying: KV store?
  - Data lifecycle (Redis/Memcached?)
  - Data size.

# Musings on Microservices, Hanami

- [Reference](https://boffinism.com/why-hanami-will-never-unseat-rails/)
  - Rails: Support.
  - "I don’t believe that simply being better than Rails is enough to displace Rails. If Rails was simply the best of the bunch, then a framework that was better than Rails would do better. But there is no bunch. There is Rails, and there is a group of stragglers eating the crumbs that Rails drops on its merry way."
  - So why does Hanami have little bits of magic in it? Well, the primary answer is that Hanami isn't trying to unseat Rails. They’re trying to create the best framework for Rubyists, and aren’t bothered about whether everyone and their dog adopts them.
- [`EditingPublishingSeparation`](https://martinfowler.com/bliki/EditingPublishingSeparation.html)
  - CMS: Different patterns for reading and editing.

# Event-Driven Microservices
[Reference](https://drive.google.com/file/d/1JfuqtyzMf17IJctTxq-CwBWhgc3fbUeE/view)

- Risks to agility:
  - Distributed systems are brittle
  - Integration with ecosystems
  - A lack of service harmony
- Reactive/event-driven architecture.
- The fallacies of distributed computing:
  - The network is reliable.
  - Latency is zero.
  - Bandwidth is infinite.
  - The network is secure.
  - Topology doesn't change.
  - There is just one admin.
  - Transport cost is zero.
  - The network is homogeneous.
- The smaller you make each microservice, the higher your service count, and the more the fallacies of distributed computing impact stability.
- Idea: smart endpoints, dumb pipes.
- What's hard re: integrating MS to existing systems:
  - Updates to legacy systems are slow, but microservices need to be fast and agile.
  - Different communication mediums.
  - Legacy systems are nearly always on premise and at best use virtualization. MSes almost always are on clouds.
  - Mobile requests may use REST, but they also require asynchronous communication, and most API gateways only support synchronous RESTful interactions.
- Events should be the one at the center of the microservices universe. This is because ALL interactions with the databases are performed by command-style interactions!
- Choreography (event stream in the middle) vs orchestration (services interacting with each other).
  - Better agility: teams are less impacted by changes to other services.
  - Services are smaller/simpler: Each service is not required to have complex error handling for downstream service or network failures.
  - Enables fine-grained scaling.
  - Easier to add. A new service can come online, consume events, and implement new functionality, without changes to any other service.

- Microservices: API Gateways.

