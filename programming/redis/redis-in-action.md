# Redis In Action

## Getting to Know Redis

- Replication, persistence, client-side sharding.
- Five different type of data structures.
  - STRING. Strings, integers, floating point values. Operates on the whole string, parts, increment/decrement the integers and floats.
  - LIST. Push or pop items from both ends, trim based on offsets, read individual or multiple items, find or remove items by value.
  - SET. Add, fetch, or remove individual items, check membership, intersect, union, difference, fetch random items.
  - HASH Add, fetch or remove individual items, fetch the whole hash.
  - ZSET. Ordered mapping of string members. Add, fetch, or remove individual values, fetch items based on score ranges or member value.
- In KV stores, it is unique in that it supports a linked-list structure.
- LISTs in Redis store an ordered sequence of strings. The operations that can be performed on LISTs are typical of what we find in almost any programming language.
- SET: we can't push and pop items from the ends like we did with LISTs, but we can add and remove items by value with the SADD and SREM commands.
