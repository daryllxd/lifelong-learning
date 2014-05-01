# Try Redis.io

    SET server:Name "fido"      # Stores the thing
    GET server:name => "fido"   # Gets the thing
    SET connections 10
    SETNX server:name "thingie" # Set only if it key's value hasn't been set already.
    INCR connections => 11
    DEL connections
    INCR connections => 1

`INCR` is to make the operation atomic. Redis provides many of these atomic versions on different types of data.

    SET resource:lock "Redis dem"
    EXPIRE resource:lock 120      # Set resource:lock to expire in 120 seconds.
    TTL resource:lock => 120      # It returns the number of seconds until it will be deleted.
    TTL count => -1               # -1 means that it will never expire.

If you `SET` a key, its `TTL` will reset.

## Data Structures

Redis has lists. Some of these are `RPUSH`, `LPUSH`, `LLEN`, `LRANGE`, `LPOP`, and `RPOP`.

(BTW you can't call `GET` or `SET` on these thingies.)

    RPUSH friends "Alice" # Put at end
    LPUSH friends "Aaa" # Put at start
    LRANGE friends 0 1 => Get first 2 elements
    LRANGE friends 1 2 => Get 2nd-3rd element
    LRANGE friends 0 -1 => Get all

    LLEN friends => Get length of list
    LPOP friends => Remove first element and return it
    RPOP friends => Remove last element and return it
    LLEN friends => Now it's just one.

## Sets

A set is similar to a list, except it does not have a specific order and each element may only appear once.

    SADD superpowers "flight"
    SADD superpowers "x-ray"
    SADD superpowers "reflexes"
    SREM superpowers "reflexes"

    SISMEMBER superpowers "flight" => true # Check if the given value is in the set
    SMEMBERS superpowers                   # Return a list of all the members of this set
    SUNION superpowers birdpowers          # Combines 2 or more sets and returns the list of all the elements

## Sorted Sets

Each value has an associated score, and this score is used to sort the elements in the set.

    ZADD hackers 1940 "Allan Kay"
    ZADD hackers 1906 "Grace Hopper"
    ZADD hackers 1953 "Richard Stallman"

    ZRANGE 2 4 => Gets the 2nd-4th element

## Hashes

Hashes are maps between string fields and string values, so they are the perfect data type to represent objects.

    HSET user:1000 naem "John Smith"

