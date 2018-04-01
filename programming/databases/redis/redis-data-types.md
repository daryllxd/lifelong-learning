# Data Types
[Reference](https://redis.io/topics/data-types)

- Strings: binary safe, can contain any data (JPEG image or a serialized Ruby object).
  - Max 512 MB in length.
  - You can use it as an atomic counter (`INCR`, `DECR`, `INCRBY`).
  - You can `APPEND`, `GETRANGE`, `SETRANGE`.
- Lists:
  - These are just lists of string, sorted by insertion order. `LPUSH` or `RPUSH`.
  - Use them for social network timelines, using `LPUSH` to add new elements in the user timeline, and using `LRANGE` in order to retrieve a few of the recently inserted items.
  - Lists can be used as a message passing primitive (look at Resque).
  - You can also block commands with `BLPOP`.
- Sets: Unordered collection of Strings. Possible to add, remove, and test for existence of members in O(1).
  - No repeated members.
  - You can track unique things using Redis sets: `SADD`.
  - You can represent relations (create a tagging thing).
  - Extract an element at random using `SPOP` or `SRANDMEMBER` commands.
- Hashes:
  - They are the perfect data type to represent objects.

