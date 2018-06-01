# Applying the Saga Pattern (Great Talk!)
[Reference]((https://www.youtube.com/watch?v=xDuwrtwYHu8)

# Confusion about Saga pattern
[Reference](https://medium.com/@roman01la/confusion-about-saga-pattern-bbaac56e622)

- Saga is a failure management pattern. Sagas are an approach to handling system failures in long-running transactions.
- It is not a state machine (state machine is a set of well-defined states, where transition between states is initiated by triggering an action.)
- Workflow: where transition between them occurs when the previous activity is completed. This includes branching to other activities.
- *Saga: Multiple workflows, each providing compensating actions for every step of the workflow where it can fail.* Sagas are not necessarily implemented using workflows.
- Sagas are for handling long-running transactions/and their cancellation, and is a process manager, managing orchestration between different bounded contexts that don't share any dependency.

# Saga: How to implement complex business transactions without two phase commit.
[Reference](https://blog.bernd-ruecker.com/saga-how-to-implement-complex-business-transactions-without-two-phase-commit-e00aa41a1b1b)

- In Domain Driven Design (DDD) the pattern is well known as you need to apply it as soon as you have use cases involving multiple bounded contexts to collaborate.
- In the microservice community it is less known but necessary whenever an overall flow involves multiple services.
- Saga includes state handling + remembering what you did.
- What you need:
  - Durable Saga log.
  - SEC Process (Saga Execution Coordinator).
  - Idempotence of compensating actions.
