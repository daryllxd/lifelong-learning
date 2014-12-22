## Redis - Seven Databases in Seven Weeks

Redis: `REmote DIctionary Service`. Redis can do 100,000 SET operations per second. "Data structure server."

At a basic level, it's a key-value store. It supports advanced data structures, though not to the degree that a document-oriented database would. It supports set-based query operations, but not with the granularity or type support you'd find in a relational database.

It trades durability for raw speed.

Redis is a blocking queue or stack and a publish-subscribe system. It features configurable expiry policies, durability levels, and replication options.

    > SET 7wks http://www.sevenweeks.org
    OK
    > GET 7wks
    'http://www.sevenweeks.org'
    > MSET gog http://www.google.com yah http://www.yahoo.com

Wrapping transactions:

    > MULTI
    > SET prag http://pragprog.com
    > INCR count
    > EXEC

    > DISCARD # Will just not run the transaction at all.
