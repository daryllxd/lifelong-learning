# How to break a Monolith into Microservices
[Reference](https://martinfowler.com/articles/break-monolith-into-microservices.html)

- Microservices ecosystem is a platform of services, each encapsulating a business capability. This represents what a business does in a particular domain to fulfill its objectives and responsibilities. Each microservice exposes an API that developers can discover and use in a self-serve manner.
- What happens is that we end up with autonomous, long standing teams, each responsible for one or multiple services.
- There is a high overall cost associated with decomposing an existing system to microservices.
- Need to have: rapid provisioning, basic monitoring, deployment pipeline, and devops culture.
- Tech: service mesh, container orchestration, CI/CD.
- Start with capabilities that are decoupled from the monolith, don't require changes to client-facing applications that are currently using the monolith, and possible don't need a data store.
- Ex: authentication service.
