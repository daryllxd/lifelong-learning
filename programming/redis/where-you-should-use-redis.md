# What is Redis and what do I use it for?
[link](http://stackoverflow.com/questions/7888880/what-is-redis-and-what-do-i-use-it-for)

It is a "NoSQL" key-value data store/data structure server, as opposed to MongoDB which is a disk-based document store. Redis is like Memcached, but with built-in persistence (snapshotting or journaling to disk) and more datatypes.

Persistence to disk means you can use Redis as a real database instead of just a volatile cache. Other powerful features are built-in pub/sub, transactions, and Lua scripting. The entire data set is stored in memory- so it is extremely fast.

Redis is a fantastic choice if you want a highly scalable data store shared by multiple processes, multiple applications, or multiple servers.

*If you can map a use case to Redis and discover you aren't at risk of running out of RAM by using Redis there is a good chance you should probably use Redis.*

I can use Redis to sync pub/sub across multiple servers.

# 11 Common Web Use Cases Solved in Redis
[link](http://highscalability.com/blog/2011/7/6/11-common-web-use-cases-solved-in-redis.html)

1. *Show latest items listing in your home page.* This is a live-in memory cache and is very fast. `LPUSH` is used to insert a content ID at the
