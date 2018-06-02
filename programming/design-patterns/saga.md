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

# Reference 6: A Saga on Sagas
[Reference](https://docs.microsoft.com/en-us/previous-versions/msp-n-p/jj591569(v=pandp.10))

- Used in discussions of CQRS to refer to a piece of code that coordinates and routes messages between bounded contexts and aggregates. Though there is a well-known, pre-existing definition of the term saga that has a different meaning from the one generally understood in relation to CQRS.
- *The saga concept removes the need for a distributed transaction by ensuring that the transaction at each step of the business process has a defined compensating transaction.* In this way, if the business process encounters an error condition and is unable to continue, it can execute the compensating transactions for the steps that have already completed. This undoes the work completed so far in the business process and maintains the consistency of the system.
- When you implement the CQRS pattern, you typically think about two types of message to exchange information within your system: commands and events.
  - Commands: Imperatives. Requests for the system to perform a task or action. Ex: "Book two places on conference X", "allocate speaker Y to room Z".
  - Events: Notifications. They inform interested parties that something has happened.
  - Commands are usually sent with a bounded context. Events may have subscribers in the same bounded context.

- Process manager?
  - Yes, if your bounded context uses a large number of events and commands that would be difficult to manage as a collection.
  - Yes, if you want to make it easier to manage message routing in the business context.
  - No, if your bounded context contains a small number of aggregate types.
  - No to implement business logic. Business logic belongs in the aggregate types.
