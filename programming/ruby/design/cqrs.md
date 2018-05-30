# 6 Code Smells with your CQRS Events – and How to Avoid Them
[Reference](http://danielwhittaker.me/2014/10/18/6-code-smells-cqrs-events-avoid/)

- Watch out for the "Updated" word. When you say "Account Updated", what does this mean? A deposit, a correction, a credit or the application of a charge?
- Event Stream naming: a domain expert should at least understand it. Things like `AccountCreated` over `AccountInserted`, `FeeCharged` over `AccountUpdated`.
- The key purpose of an event message is to represent what has just happened. The message should contain the information needed to rebuild the state of the domain object. *Events are subscribed to by de-normalizers which can use the information to build out a highly optimized read model.*
- Event names should be past tense.
- Required fields:
  - `AggregateId`
  - `TimeStamp`. Replaying events in the wrong order can result in unpredictable outcomes.
  - `UserId`. This field is commonly required in a line of business applications and can be used to build audit logs.
  - `Version`. Allows the dev to handle concurrency conflicts and partial connection scenarios.
  - `ProcessId`, refers to the ability of a system to produce the same outcome, even if an event or message is received more than once.
- *Mutable events: Once an event object is created, it should not be possible to change any of its fields.*
