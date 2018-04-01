# Wikipedia
[Reference](https://en.wikipedia.org/wiki/Hash_table)

- Hash Table: uses a hash function to compute an index into an array of buckets or slots.
  - When a key is put into a hash function, it returns an index. You use the index for lookups.
  - Basic requirement: the function should provide a uniform distribution of hash values. Non-uniform means higher chance of collisions.
  - Choosing a hash function: If one uses dynamic resizing with exact doubling/halving of the table size, then the hash function needs to be uniform only when the size is a power of two. Other hashing algorithms prefer to have the size be a prime number.
  - Separate chaining:
    - So for the array that was created to store the results of the hash function, each member of the array would be either a linked list or a head cell.
    - If linked list, the key is the actual key that was initially used. what happens is:
      - Look for the hash result of the key. This would result in the linked list.
      - Traverse over the linked list, using the actual key as the key to find the values.
      - Cost: depends on the average keys per bucket. It's actually bad if you have one bucket with so many keys inside.
      - Load factor: Stored keys/number of slots. If you have 1K slots and 10K stored keys (load factor 10), this will be slower than a 10K slot table, but still 1K times faster than a plain sequential list.
      - Problems: when storing small keys and values, the space overhead of the `next` pointer in each entry record can be significant. Also, traversing a linked list has poor cache performance, making the processor cache ineffective.
    - List head cells.
      - They store the first record of each chain in the slot itself, to decrease the pointer traversals by one. Disadvantage: an exmpty bucket takes the same space as a bucket with one entry.
  - Open addressing: To be continued!
