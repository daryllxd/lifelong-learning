# What is Redis and what do I use it for?
[link](http://stackoverflow.com/questions/7888880/what-is-redis-and-what-do-i-use-it-for)

It is a "NoSQL" key-value data store/data structure server, as opposed to MongoDB which is a disk-based document store. Redis is like Memcached, but with built-in persistence (snapshotting or journaling to disk) and more datatypes.

Persistence to disk means you can use Redis as a real database instead of just a volatile cache. Other powerful features are built-in pub/sub, transactions, and Lua scripting. The entire data set is stored in memory- so it is extremely fast.

Redis is a fantastic choice if you want a highly scalable data store shared by multiple processes, multiple applications, or multiple servers.

*If you can map a use case to Redis and discover you aren't at risk of running out of RAM by using Redis there is a good chance you should probably use Redis.*

I can use Redis to sync pub/sub across multiple servers.

# 11 Common Web Use Cases Solved in Redis
[link](http://highscalability.com/blog/2011/7/6/11-common-web-use-cases-solved-in-redis.html)

1. *Show latest items listing in your home page.* This is a live-in memory cache and is very fast. `LPUSH` is used to insert a content ID at the head of the list, then `LTRIM` is used to limit the number of items in the list to 5000. If they need something beyond the page they are sent to the database.
2. *Deletion and filtering.* If a cached article is deleted it can be removed from the cache using `LREM`.
3. *Leaderboards and related problems.* `ZADD` command to implement a leader board (set sorted by score) and `ZREVRANGE` to get the top 100 users by score and `ZRANK` to get a users rank.
4. *Order by user votes and time.* `LPUSH` and `LTRIM` are used to add an article to a list. A background task polls the list and recomputes the order of the list and `ZADD` is used to populate the list in the new order. This list can be retrieved very fast by even a heavily loaded site.
5. *Implement expires on items.*
6. *Counting stuff.* `INCRBY` makes it easy to atomically keep counters; `GETSET` to atomically clear the counter, the `expire` attribute can be used to tell when a key should be deleted.
7. *Unique N items in a given amount of time.*A Use `SADD` for each page view.
8. *Real-time analysis of what is happening, for stats, anti-spam.*
9. *Pub/Sub.* Use `SUBSCRIBE`, `UNSUBSCRIBE`, and `PUBLISH`.
10. *Caching.* Redis can be used in the same manner as memcache.

# How to take advantage of Redis just adding it to your stack
[link](http://oldblog.antirez.com/post/take-advantage-of-redis-adding-it-to-your-stack.html)

In order to take advantage of Redis, you don't need to switch to Redis. You can just use it in order to do new things that were not possible before/fix old problems.

A Redis data set cannot be bigger than available memory, so if you have some big data application and a mostly-reads access pattern, Redis is not the right pick.

*Slow latest itesm listing in you home page.*

We have a web application where we want to show the latest 20 comments posted by our users, a link to "show all", and pagination to see the whole comment timeline.

To solve this in Redis:

- Every time a new comment is added, add ID to a Redis list: `LPUSH latest.comments <ID>`.
- Trim the list to a given length, so that Redis will just hold the latest 5000 items (`LTRIM latest.comments 0 5000`).
- We consistently query the range of items for the latest comments, but we are limited to 5000 IDs. The database is only queried if the user is paginating "far" intervals.

[TODO]: this.

