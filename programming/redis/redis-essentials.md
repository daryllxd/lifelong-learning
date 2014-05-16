# Redis Essentials Tutsplus

It doesn't store tables or documents. It only stores keys that are associated with different values.

The keys can be strings, hashes, lists, sets, and sorted sets. We can store each of them as keys.

    $ brew install redis

Redis has a server and a CLI. I can run `redis-cli` to run prompts.

## Data Structures Overview

All of the data structures are set as a key.

    > set name "redis essentials"

All keys are strings, you want something moderate. We can namespace: `set user:1 "joe smith"`, `set user:2 "jane doe"`.

All values are byte arrays, and they have to be less than 512 MB of data. We don't have "data types" in the RDBMS sense (string/int). Basically it's always a string. Redis knows how to treat them as values but when you store them, they are stored as a regular string.

## String Commands (Scalar)

    > set name "john"          # => OK
    > get name                 # => "john"
    > append name " smith"     # => 10
    > get name                 # => "john smith"
    > getrange name 0          # => "john"
    > setrange name 5 johnson
    > get name                 # => "john johnson"
    > getset name "joe smith"  # => return john johnson, but set joe smith
    > mset name "jane" age 25  # => set name to jane and age to 25
    > mget name age            # => we return 1) jane and 2) 25
    > incr age                 # => 26 (redis knows to treat this as an integer than can be incremented even if it is a string).
    > decr age
    > incrby age 10
    > decrby age 3
    > incrbyfloat age 2.5      # => Need to specify that float to increment (no decrbybfloat)
    > setex color 4 "red"      # => second = number of seconds before the key expires
    > psetex color 4000 "red"  # => number of milliseconds
    > setnx joey               # => set if it hasn't been initialized yet
    > msetnx age 40 color blue # => They will either all be set or not.
    > strlen name              # => length of string

All Redis commands are atomic, so it is assured that your commands are run one at a time (no such thing as double get, get, set, set, it's just get set get set).

## List Commands

Redis's lists are stored as a linked lists, and they are stored in order.

    > lpush colors "blue" # => 1.
    > rpush colors "red"  # => push from the right.
    > lpushx colors "gre" # => will push only if the LIST already exists, not neccessarily if the key exists.
    > llen colors         # => get length of list. l = list.
    > lrange colors  0 -1 # => get everything in the list (we can get certain colors only)
    > lpop colors # => Pop from left and return to command line
    > rpop colors
    > lrem colors 2 green # => remove 2 greens from the left.
    > lrem colors -2 greem # => remove 2 greens from the right.
    > linsert colors before orange green
    > linsert colors after yellow purple
    > linsert colors 4 # => insert at 4

    > rpoplpush colors otherColors #=> pop off right of colors, then make it first item of otherColors, then return it.
    > blpop otherColors 0 #=> Blocks the pop. Pops something out, and will wait for something to get pushed in. Once another client does `lpush otherColors blue`, that's when something will get popped. Second argument, 0 is the time to wait for a pop (in this case it's 0 so forever).
    > brpop otherColors 0 #=> Pop from the right.
    > brpoplpush nums nums2 0 #=>








