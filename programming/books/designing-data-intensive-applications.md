# Introduction to Architecting Systems for Scale
[Reference](https://lethain.com/introduction-to-architecting-systems-for-scale/)

- Load balancing
  - User to web server.
  - Web server to an internal platform layer.
  - Internal platform layer to your database.
- Smart clients: Because devs are devs, they are used to writing software to solve their problems, and smart clients are software.
  - These take in a pool of service hosts and balanced load across them, detects downed hosts and avoids sending requests their way.
- Hardware load balancer: expensive and non-trivial to configure.
- Software: `HAProxy`.
  - Runs locally on your box, and each service you want to load balance has a locally bound port.
  - Platform machine: 9000, DB read: 9001, DB write: 9002.
- Caching: Pre-calculating results, pre-generating expensive index (search history), storing copies of frequently accessed data in a faster back-end (Memcache instead of PostgreSQL).
  - Caching is important earlier in the dev process rather than load-balancing, and starting with a consistent caching strat saves you time early on.
  - App vs db caching: requires explicit integration in the app code itself. Check if value is in cache, if not, retrieve the value from the DB, then write that value into the cache.
  - Database caching: just improving the DB for performance.
  - CDN.
  - Cache invalidation: these require consistency between your caches and the source of truth (cache invalidation).
- Off-line processing.
  - Message queues.
    - These allow your web applications to quickly publish messages to the queue, and have other consumer processes perform the processing outside the scope and timeline of the client request.
    - You can inform the user that the task will occur offline, or perform enough work in-line to make it appear that it's worked.
- Scheduling periodic tasks: cron.
- Map-reduce.
- Platform layer.

# Designing Data-Intensive Applications

## Part 1: Foundations of Data Systems

### Chapter 1: Reliable, Scalable, and Maintainable Applications

- More data-intensive applications (vs compute-intensive). They need to:
  - Store data (databases).
  - Remember results of expensive operations (caching).
  - Allow users to search data by keyword/filter it in various ways (search indexes).
  - Send messages that are to be handled asynchronously (stream processing).
  - Crunch a large amount of accumulated data (batch processing).
- Data systems:
  - Data stores that are also used as message queues (Redis).
  - Message queues with database-like durability guarantees (Kafka).
  - Application-managed caching layer via Memcached.
  - Full-text search server using ElasticSearch or Solr.
- Three concerns for software systems:
  - Reliability, scalability, and maintainability.

#### Reliability

- You can put a fault inside just to make sure that they would still work even with poor error handling.
- HDD have a mean time to failure of about 10-50 years. On a storage cluster with 10,000 disks, we should expect on average one disk to die per day.
- Software errors: a runaway process, a service that the system depends on slows down.
- Human errors:
  - Design systems that minimizes opportunities for error.
  - Decouple the places where people make the most mistakes from the places where they can cause failures.
  - Test thoroughly at all levels.
  - Set up detailed/clear monitoring.

#### Scalability:

- The term we use to describe a systems' ability to cope with an increased load.
- Ex: Posting a tweet = 4.5k requests/sec, at 12k requests/sec at peak.
- Viewing tweets: 300k requests/sec.
- Approaches: database join + update everyone's timeline caches. Timeline write = a single tweet can result in x million writes to home timelines!
- The new approach is that most users tweets are fanned out, but the celebrities are exempted.
- Performance:
  - Service's response time, and you also need to think about the distribution.
  - Even if you have slow response times in the 99th percentile, you still have to think about them, because they usually have the most data and thus, most purchases. (Tail latency).
  - Service level objectives and service level agreements.
- Approaches:
  - Vertical scaling (powerful machine) or horizontal (distributing the load across multiple smaller machines).

### Maintainability

### Chapter 2: Data Models and Query Languages

- Each layer hides the complexity of the layers below it by providing a clean data model.
- Object-relational mismatch: There is an awkward translation layer required between the objects in the application code and the database model of tables, rows, and columns.
- Possible approaches for storing resume information:
  - Put position, education, and contact information in separate tables.
  - Structured data types/XML data, storing JSON in a single row.
  - Encode jobs, education, and contact info as a JSON or XML document, store it on a text column, and let the app interpret.
  - JSON: Better locality (it's easier to construct a profile than in the relational, where you have to perform multiple joins).
- ID or plain-text strings?
  - For drop-down lists, we have consistent style, we avoid ambiguity, we have ease of updating.
  - When you store ID, no duplicated info.
  - If DB doesn't support joins, you have to emulate a join in application code by making multiple queries to the DB.
- RDBMS vs document databases:
  - If the data in your app has a document-like structure, use a document model.
  - The code that reads a document database usually assumes some sort of schema.
  - ***RDBMS: schema on write, document db: schema on read.***
  - Schema changes have a bad reputation of being slow and requiring downtime.
- Query languages for data:
  - Imperative: tell the computer to perform operations in a certain order.
  - Declarative: Specify the pattern of the data you want, but not how to achieve that goal, the database system's query optimizer will decide which indexes and which join methods to use, and in which order to execute various parts of the query.
  - HTML and CSS: Declarative.
- MapReduce Querying:
  - The logic of the query is expressed with snippets of code, which are called repeatedly by the processing framework, using `map` and `reduce` (`fold` or `inject`).
  - `map` and `reduce` functions must be pure functions.
- Graph-like data models
  - Social graphs: people = vertex, edge = which people know each other.
  - Web graph: vertices= web page, edge = hyperlink.
  - Didn't take notes here.

#### Summary, other data models

- Genome data: sequence-similarity searches, which means taking one very long string and matching it against a large database of strings.
- Full tech search.

### Chapter 3: Storage and Retrieval

- The simplest database: 2 bash functions (one to set, and one to get). Key-value pair, some kind of CSV file.
- Most databases internally use a log.
