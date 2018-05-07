# What is the difference between message queue pattern and publish-subscribe?
[Reference](https://www.quora.com/What-is-the-difference-between-message-queue-pattern-and-publish-subscribe)

- A messaging system is a software interface that maintains a stream of messages to transfer it from one application to another.
  - Message queueing: a kind of point-to-point messaging system, where the message from the queue will be wiped once it is consumed by any one of the consumer.
  - Publish-subscribe: The message usually just gets wiped from the queue if it's consumed by all the subscribers.

# Background Processing vs Message Queueing
[Reference](http://www.mikeperham.com/2011/05/04/background-processing-vs-message-queueing/)

- All message processing is done in the background, but background processing does not have to be done via message queues.
- Simple use case: "I want to send a welcome email."
- The cost of message queues: they have to be deployed/monitored/reliable/highly available.
- On `girl_friday`/`sucker_punch`:
  - In-process and has access to the same codebase as your web-app.
  - Threaded (huge memory savings because you don't have to spin up other processes which load the exact same code.)
- `delayed_job`: Stores jobs in your RDBMS and polls for jobs (hard to scale).
- `resque`: forks a new process for every message. Safe but memory hungry.
