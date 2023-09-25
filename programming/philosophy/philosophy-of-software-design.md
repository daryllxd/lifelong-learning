# A Philosophy of Software Design, 2nd Edition

# Introduction

- Fighting complexity:
  - Make code simpler and more obvious.
  - Encapsulate it, so programmers can work on a system without being exposed to all of its complexity at once (modular design).

# Nature of Complexity

- Complexity is anything related to the structure of a software system that makes it hard to understand and modify the system.
- Symptom of complexity:
  - A seemingly simple change requires code changes in many different places.
  - Cognitive load - how much a developer needs in order to complete a task. Ex: having to think about the "freeing memory" leads to memory leak issues.
  - Unknown unknowns - not obvious which pieces of code must be modified to complete a task, or what information a developer must have to carry out the task successfully.
- Causes of complexity:
  - Dependencies - exists when a given piece of code cannot be understood and modified in isolation.
  - Obscurity - when the important information is not obvious - ex: super generic variable names.

# Working Code Isn't Enough

- Tactical programming i.e. "make it work" makes it hard to produce a good system design.
- Once a code base turns to spaghetti, it's nearly impossible to fix.

# Modules Should be Deep

- Modular Design
- Of course, there are dependencies between modules (ex: arguments for a method)
