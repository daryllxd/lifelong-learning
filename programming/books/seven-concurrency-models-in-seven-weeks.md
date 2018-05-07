# Seven Concurrency Models in Seven Weeks

# Chapter 1: Introduction

- Multicore crisis: Instead of continuing to deliver more transistors per chip, we're seeing computers with more and more cores.
- Concurrent vs parallel
  - ***Concurrent: Multiple logical threads of control. These threads may or may not run in parallel.*** You need to handle multiple simultaneous events. Dealing with a lot of things at once. Ex: teacher teaching a class and sometimes stopping to calm the class.
  - ***Parallel: Runs more quickly than a sequential program by executing different parts of the computation simultaneously (in parallel). It may or may not have more than one logical thread of control.*** You want to make your program faster by processing different portions of the problem in parallel. Doing lots of things at once. Ex: teacher joined by an assistant.
- *Concurrency and parallelism are often confused because traditional threads and locks don't provide any direct support for parallelism. If you want to exploit multiple cores with threads and locks, your only choice is to create a concurrent program and then run it on parallel hardware.*
- ***Nondeterministic software: Gives different results depending on the precise timing of events.*** In concurrent systems, nondeterminism is natural and to be expected. Parallelism, by contrast, doesn't necessarily imply non-determinism (ex: doubling every number in an array).

## Parallel Architecture

- *Bit-level:* A 32-bit computer is faster than an 8-bit one, because an 8-bit computer has to do it as a sequence of 8-bit operation. A 32-bit computer can do it in one step.
- *Instruction-level:* Pipelining, out-of-order execution, speculative execution. (It looks sequential but it's not.)
- *Data-parallelism:* Data parallel architectures are  capable of performing the same operations on a large quantity of data in parallel. Ex: image processing, to increase the brightness of an image, we increase the brightness of each pixel.
- *Task-level parallelism.*
  - Shared memory multiprocessor: each processor can access any memory location, and interprocessor communication is done through memory.
  - Distributed memory: Each processor has its own local memory and interprocessor communication is primarily via the network.
  - While it is easier to write for shared memory, beyond a certain number of processors, it becomes a bottleneck.

## Seven Models

- Threads/locks (default choice).
- Functional programming (eliminating mutable state).
- The Clojure Way (separating identity and state).
- Actors model.
- Communicating sequential processes (both are based on message passing).
- Data parallelism (used by the GPU).
- Lambda architecture.

# Chapter 2: Threads and Locks
