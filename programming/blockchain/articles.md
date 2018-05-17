# Why Blockchain is Hard
[Reference](https://medium.com/@jimmysong/why-blockchain-is-hard-60416ea4c5c)

- Technically: linked list of blocks. A block is a group of ordered transactions.
- Main thing distinguishing a blockchain from a normal database:
  - Data cannot conflict with some other data that's already in the database.
  - Append-only/immutable.
  - The data is locked to an owner.
  - It's replicable and available.
  - Everyone agrees on what the state of the things in the database are (canonical).
  - No central party (decentralized). This implies no single point of failure.

## The Cost of Blockchains

- Slower: a bug can corrupt the entire database or cause some databases to be different than other ones. A corrupted/split db means no more consistency guarantees. So from the outset, the system needs to be consistent.
  - Also, you can't just fix things/start again because this is a decentralized system/you need consensus.
- Incentive structures are difficult to design. You need to make sure that the system cannot abuse/corrupt the database.
  - How can you ensure that the rewards are aligned with the network goals? Why do nodes keep or update the data and what makes them choose one piece of data over another when in conflict?
- Maintenance: A blockchain needs to be written to thousands of times vs traditional database (one data check).
- Users are sovereign: if the user is spamming your blockchain, there's no way to kick that guy out. The incentive structure has to be designed that a user that figures out an exploit is not likely to give that up.
  - Because this is a decentralized service, it is hard to refuse service to an entity.
- Upgrades are voluntary: how do you this in a decentralized system? So all upgrades have to be backwards-compatible.
- Scaling is hard because the same data lives in hundreds or thousands of places.

## So what is it good for?

- To remove the single point of failure or control.
  - Most things are not like this, but for money, this makes sense.
  - Money is better if it doesn't change. This is why it works when it comes to Bitcoin.

# A Guide To Bitcoin’s Technical Brilliance (For Non-Programmers)
[Reference](https://medium.com/digitalassetresearch/a-guide-to-bitcoins-technical-brilliance-for-non-programmers-e28211e797c0)

- To transact in the Bitcoin Network, every participant is required to download a specific software to interact with other network participants.
- Bitcoin clients interact with other members of the network to source and validate the integrity of the data.
- Blockchain: a structure that can be used to store data.
- Full clients/full nodes: Store a complete copy of the blockchain in their computers which consists of all blocks with all transactions that have ever occurred in the network.
- Light clients: Only store a header of each block, which is basically a summary of all transactions contained in it. Cannot verify the validity of a transaction, but it can confirm by looking at the header if a transaction was included in a block.
- It is good to have many Bitcoin clients because it diminishes the risk that a bug in a single client will disrupt the entire network.
- *Wallet: The collection of data required to send and receive BTC.* This includes a public address and a private password.
- Identifiers:
  - Private key, really hard to memorize lol.
  - Public key.
  - Addresses: derived from a public key. Technical reasons why this is used.
- Almost impossible to brute force a Private Key from a Public Key.
- Network fees: Proportionate to the speed at which Bob will receive the funds.
- *Mining: Network participants grouping unprocessed transactions into a block and adding that transaction to the ledger.* There is an economic incentive to prioritize transactions with higher fees.
- Memory pool: The bucket of unprocessed transactions. When this is full and nodes in the network are storing a large number of unprocessed transactions, the network fee rate per KB increases, and memory is scarce.
- Mining: probabilistic, no guarantee that a precious metal will be found.
- Proof of work: the proof that the miner did whatever to create a key.
  - It's unlikely that the same locksmith will find the key for consecutive locks over a period of time.
  - At some point, because of the specialized hardware, this can lead to some centralization.
- Hash functions: Map every piece of data in a file, assign identifiers, and produce an output of fixed length. So they can compress data of any size to a standard output called a hash.
  - Miners look for the number that can combine with the data in a SHA-256 function (this number is the nonce). This is a nonce that produces a hash that starts with the target number of leading zeroes.
- The Merkle Tree: something that combines every piece of data within a block so that all data is interdependent.
- Incentive structure/block rewards: BTC halves after very four years, and runs out in 2140, because it provides a unique economic structure based on scarcity. Incentives are defined by an algorithm, which allows Bitcoin's inflation to be modeled. The monetary policy is determined by math in the form of software.

# On why there is halving:

- Vitalik: To keep the inflation under control. A limitation of fiat currencies is that banks can print as much of the currency as they want, and if they print too much, the laws of supply and demand ensure that the value of currency starts dropping quickly. Bitcoin is intended to simulate a commodity, like gold.
- Because of the limited supply of gold, it has maintained its value as an international medium of exchange and store of value for over six thousand years.
