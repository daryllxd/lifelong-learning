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
