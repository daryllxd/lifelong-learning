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

- Associations: For every traverse-able association in the model, there is a mechanism in the software with the same properties. We make choices on:
  - Imposing a traversal direction.
  - Adding a qualifier.
  - Eliminating unneeded associations.
- Bidirectional association means that both objects can be understood only together.
