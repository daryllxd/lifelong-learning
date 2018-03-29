# The authoritative guide to blockchain development
[Reference](https://medium.freecodecamp.org/the-authoritative-guide-to-blockchain-development-855ab65b58bc)

- Prices are the least interesting part of cryptocurrencies. These are massively important technologies, and they are going to irrevocably change the world.
- Why to learn?
  - Still early.
  - Not that much talent funnel, devs are working on machine learning, web programming, game dev.
  - Much of the innovation is happening outside of academia.
  - Too few developers.
  - Crypto is cool.
- **Naval Ravikant: the key to success is to give society things that it wants, but doesn't know how to get on its own. You can't go to school for such things; if you could, the world would already have a steady supply of it.**

## Learn

- CS: Data structures/complexity guarantees, cryptography, distributed systems.
- Consistency and consensus. Linearizable and eventual consistency models. Fault-tolerant consensus algorithms. The difficulties of reasoning about time in a distributed system.
- Traditional methods of distributing databases: sharding, leader-follower replication, quorum-based commits, distributed hash tables.
- Networking.
- Economics:
  - Game theory. Nash equilibrium and Schelling points.
  - Macroeconomics.
  - Microeconomics.

## Ethereum

- You pay miners to execute your programs on this distributed virtual machine.
- This means you can perform arbitrary computations, using a Turing-complete programming language (unlike Bitcoin script).
- Smart contracts: programs that run on such a virtual machine. Smart contracts can interact directly with the blockchain's cryptocurrency in accordance with the execution of a program, so you can create financial contracts that enforce themselves.
- Solidity.
  - Hello world: Creating an ERC-20 compliant token.
  - Remix: An in-browser Solidity editor and compiler.
  - Voting system: The Todo app of Ethereum.
- Security
  - These were all due to programming error.
  - You must treat security as paramount.
