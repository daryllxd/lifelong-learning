# How does Ethereum work, anyway?
[Reference](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369)

- Ethereum is a public database that keeps a permanent record of digital transactions, which doesn't require any central authority to maintain and secure it.
- Instead, it operates as a "trustless" transactional system-a framework in which individuals can make p2p transactions without needing to trust a third party or one another.
- **Blockchain definition: a cryptographically secure transactional singleton machine with shared-state.**
  - Cryptographically secure: Secured by hard to break algos.
  - Transactional singleton machine: single global truth.
  - With shared state: The state stored is shared and open to everyone.
- Ethereum's state:
  - For transactions to be considered valid, it must go through a validation process known as mining. Mining = expend computing resources to create a block of valid transactions. Each miner provides a mathematical proof, and this proof acts as a guarantee: if the proof exists, then the block must be valid.
  - Fixing fork: We use the GHOST protocol (Greedy Heaviest Observed Subtree).

## Components

- Accounts:
  - These make up the global state of Ethereum. They are able to interact with one another through a message passing framework.
  - Externally owned accounts: controlled by private keys, no code.
  - Contract accounts: controlled by their contract code, have code associated with them.
