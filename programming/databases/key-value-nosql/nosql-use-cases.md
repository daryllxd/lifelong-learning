# SQL vs NoSQL
[Reference](https://www.educative.io/collection/page/5668639101419520/5649050225344512/5728116278296576)

- NoSQL types:
  - K-V stores.
  - Document databases: documents are grouped together in collections.
  - Wide-column databases: column families/containers for rows.
  - Graph databases: used to store data whose relations are best represented in a graph.
- When altering a schema, it involves modifying the whole database and going offline.
- Scalability: vertically scalable for SQL, horizontally for NoSQL.
- ACID: Relational. NoSQL: performance and scalability.
- SQL: If we need to ensure ACID compliance. This is why e-commerce and financial applications almost always use this. When data is structured and unchanging.
- NoSQL: Storing large volumes of data that often have little to no structure. A NoSQL database sets no limits on the types of data we can store together.
- Cloud computing/storage.
- Good for rapid development.

# What The Heck Are You Actually Using NoSQL For?
[Reference](http://highscalability.com/blog/2010/12/6/what-the-heck-are-you-actually-using-nosql-for.html)

## General

- The new stack supporting big data, big numbers of users, big numbers of computers, big supply chains, big science, and so on.
- Massive write performance. Ex: Facebook storing 135 billion messages a month. At 80MB/s, it would take a day to store Twitters' 7TB writes.
- Fast key-value access. Hashing on a key and reading the value directly from memory or in as little as one disk seek.
- Flexible schema/flexible data-types. No complex schemas and ORM frameworks.
- Schema migration. Schema-less makes it easier to deal with schema migrations without so much worrying. Schemas are in a sense, dynamic, because they are imposed by the application at run-time, so different parts of an application can have a different view of the schema.
- Write availability: If writes need to succeed no matter what, get into partitioning, CAP, eventual consistency.
- Easier maintainability, administration, and operations: tools created by NoSQL vendors trying to gain adoption by making it easy for developers to adopt them.
- No single point of failure. A definite convergence on relatively easy to configure and manage high availability with automatic load balancing and cluster sizing.
- Generally available parallel computing. We are seeing Map-Reduce baked into products.
- Programmer ease of use. (?)
- Using the right model for the right problem. Graph problems = relational database, or graph database?
- Avoid hitting the wall when it comes to scaling.
- Distributed systems support.
- Tunable CAP trade-offs.

## More Specific Use Cases

- Managing large streams of non-transactional data: Apache logs, application logs, MySQL logs, clickstreams...
- Syncing online and offline data.
- Fast response times.
- Avoiding heavy joins.
- Load balance.
- Real-time inserts, updates, and queries.
- Hierarchical data like threaded discussions and parts explosion.
- Dynamic table creation.
- Two tier applications where low latency data is made available through a fast NoSQL interface, but the data itself can be calculated and updated by high latency Hadoop apps or other lower priority apps.
- Slicing off part of the service that needs better performance/scalability onto it's own system. Ex: user logins may need to be high performance and this feature could use a dedicated service to meet those goals.
- Caching.
- Voting.
- Page view counters.
- User registration/profile/session data.
- CMS, catalog management, document management, for storing complex documents.
- Archiving.
- Analytics.
- Timeline.

## Redis Use Cases

- Calculating whose friends are online using sets.
- Memcached on steroids.
- Distributed lock manager.
- Full text inverted index lookups.
- Tag clouds.
- Leaderboards/sorted sets for maintaining high score tables.
- Fast counters.
- Polling the database every few seconds.
- Transient data such as CSRF tokens.
- 30K reads/writes per second on a laptop with the default configuration.
- Heat maps.
- Publish/subscribe.

## Poor Use Cases

- OLTP.
- Data integrity.
- Data independence. Data outlasts applications.
- Ad-hoc queries.
- Complex relationships.

# When to Redis? When to MongoDB? [closed]
[Reference](https://stackoverflow.com/questions/5400163/when-to-redis-when-to-mongodb)

- If you require a lot more QUERYING, then it would be more work for your developers to use Redis, as your data might be stored in a variety of specialized data structures, customized for each type of object for efficiency.
- *In Mongo, the same queries might be easier because the structure is more consistent across your data. Redis is just fast. So its payoff is the extra work of dealing with the variety of structures your data might be stored with.*
- So Redis requires more effort to learn, but greater flexibility.
- The Redis database size is limited by the amount of RAM in the machine.
- Some small problems with RDBMS: so much migrations, and having to write SQL.
- MongoDB: Good for prototyping.
- Redis: Used to speed up an existing application. Cache. Data structures but you have to explicitly define how you want to store your data. Scaling is not as easy as Mongo.
- Mongo: Prototyping, startups, hackathons. Also, when you need to change your schema quickly.
