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

## Hash Commands

Using Hashes, we can have subkeys in values.

    > hset user name "Jane Doe"
    > hset user age 20
    > hget user name                       #= > "Jane Doe"
    > hgetall user                         #= > "name", "Jane Doe", "age", "50"
    > hkeys user                           #= > 1) "name", 2) "age"
    > hvals user                           #= > 1) "Jane Doe", 2) "20"
    > hexists user name                    #= > 1 because it exists, 0 if not
    > hincrby user age 2                   #= > add 2 to age
    > hincrbyfloat user age 2.3
    (no decrement operators in Redis only)
    > hlen user                            #= > get number of keys
    > hmget user name age
    > hmset user2 name "john Doe" age 30
    > hget all user2
    > hdel user age                        #= > 1 to delete the age value

## Set Commands

A set is a collection of distinct objects. In math, there are operations (difference/union) that Redis will allow you to do. There is no order of elements.

    > sadd numbers "one"
    > sadd number "two" three four
    > srem numbers six
    > smembers numbers
    > sismember numbers "two"
    > scard numbers                         #=> length
    > srandmember numbers                   #=> Get a random number
    > spop numbers                          #=> Get a random number and take it out
    > sdiff numbers numbers2                #=> Get the difference of first - second
    > sdiffstore numbers3 numbers2 numbers  #=> The difference is stored in numbers3
    > sinter numbers numbers2               #=> Intersection
    > sunion numbers numbers2               #=> Get union, don't have duplicates
    > sunionstore numbers3 numbers numbers2
    > smove numbers numbers2 "one"          #=> move "one" from numbers to numbers2

## Sorted Set

## Other Commands

    # DO NOT USE THIS IN THE SERVER, IS SERVER-INTENSIVE
    > keys user                                                                       #=> Get all keys that red
    > keys *                                                                          #=> Get all the keys of the database return
    > keys user:*                                                                     #=> Regex matching.

    > exists user                                                                     #=> check if key "user" exists
    > type name                                                                       #=> string
    > type numbers                                                                    #=> set

You can run different dbs on the Redis server, we start on database 0, the next is 1.

    > move user:2 1                                                                   #=> Move the key user:2 to database 1
    > select 0                                                                        #=> Select database 0
    > hgetall user2
    > pexpire

## Sorting

## Publish/Subscribe Commands

    > subscribe my_channel channel2            #=> Subscribe to channels my_channel channel2
    > publish my_channel "this is the message" #=> three values: "message" "my_channel", "this is the message"
    > psubscribe a*                            #=> subscribe to any channel that starts with a

In the CLI, there is no way to unsubscribe (you can just quit). But in the code...

    > unsubscribe channel
    > punsubscribe a*

## Transaction Atomicity

Every Redis command is atomic. Transactions cannot be partially completed: it is all or nothing. We want all of the commands to be executed. We don't want the commands to be missed. We can do this using Redis transaction.

    > multi          #=> Start the command
    > set name "joe" #=> QUEUED
    > set age 20     #=> QUEUED
    > exec           #=> Execute the commands. BTW we are not sure if the command will be executed successfullly or not. It will run at the same time, but the command can return an error.
    > discard        #=> Our multi command is no longer in effect (cancelling the multi).

## Redis Config Files

> `redis.conf`

    daemonize yes                 #=> By default, Redis does not daemonize the server (it keeps the Redis operation in front). Redis will run in the background now.
    redis-server redis.conf       #=> No output, because Redis is daemonized.
    port 8088                     #=> Change port to 8888. Run it using redis -p 8088
    loglevel                      #=> Either debug, verbose, notice (default), warning
    logfile                       #=> Where the information will be logged to. It will, by defaul, log to stdout.
    save 300                      #=> Save Redis every 300 seconds
    save 1                        #=> Save only if there is at least one change
    requirepass tuts              #=> Need to put password in
    rename-command config 1231dqw #=> Rename the command "config" to 1231dqw. Need to restart server for this to work.
    maxclients 1                  #=> Max number of Redis clients we want our server to accept. We can open multiple clients but we cannot execute commands on the seconds client.

Redis has a backup server (slave) as opposed to the master.

    slaveof localhost 6379       #=> If you $ redis-server redis.conf on a file with this setting, this will slave to the second server.
    slave-read-only no           #=> Slave servers are read-only by default. If you want to save to slave, do this. We would rather not do this, because we want to copy the master server.

> Killing Redis

    $ ps - A | grep redis #=> Find Redis PID
    $ kill 22348          #=> Kill Redis PID

