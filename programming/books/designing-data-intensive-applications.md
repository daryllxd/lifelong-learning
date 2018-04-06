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
- Indexes don't affect the contents of the database, it only affects the performance of queries.
- Any index usually slows down writes, because the index also needs to be updated every time data is written.
- Well-chosen indexes speed up read queries, but every index slows down writes.
- This is why databases don't usually index everything by default.

- Hash indexes for K-V data.
  - K-V stores (like Redis) are similar to dictionary types in programming languages.
  - Simplest implementation: the key for where the value would be found is the number of offset bytes in the data file. When you append a new K-V pair to the file, you also update the hash map to reflect the offset of the data you just wrote.
  - CSV is not the best format for a log. It's faster to use a binary format that first encodes the length of a string in bytes.
  - Deleting: if you want to delete a key, you have to append a special deletion record to the data file. When log segments are merged, the tombstone tells the merging process to discard any previous values for the deleted key.
  - Crash recovery: If the database is restarted, the in-memory hash scripts are lost. In principle, you can restore each segment's hash map by reading the entire segment files from beginning to end and nothing the offset of the most recent value for every key as you go along.

- Append-only log pros:
  - Sequential writes (appending/segment merging) are generated much faster than random writes, especially on magnetic spinning-disk hard drives.
  - Concurrency and crash recovery are much simpler if segment files are append-only or immutable, you just look at the old and new files.
  - Limitations: The hash table must fit in memory.
  - Range queries are not efficient, you have to scan everything if you want to scan over a range of keys.

- Sorted String Tables (`SSTables`) and LSM-Trees
  - Same as the log, but you can make the sequence be sorted by key. You do a mergesort. If the same key appears in different segments, check the timestamp.
  - To find the keys, you don't need to keep everything indexed, because they are sorted. You can find the beginning/end for the segment of keys you want to search at.
- Constructing SSTables:
  - When a write comes in, add it to an in-memory balanced tree structure called a memtable.
  - When the memtable gets bigger than some threshold, write it out to disk as an SSTable file. This can be done efficiently because the tree already maintains the key-value pairs sorted by key.
  - In order to serve a read, find the key in each of the memtables, etc.
  - From time to time, do a merging and compaction process in the background to combine segment files.
  - The problem: if the database crashes, the most recent writes are lost: to fix that, we have another log on the disk to which every write is appended to, so we have a backup just in case the thing is lost.
- Performance optimizations:
  - You use a Bloom filter to approximate the contents of a set. It can tell you if a key does not appear in the database, and thus save many unnecessary disk reads for non-existent keys.
  - Compaction strategies: size or leveled compaction.

- ***B-trees: the most widely used indexing structure.***
  - One page is designed as the root of the B-tree, and the page contains several keys and references to child pages. At some point we get to a leaf page small enough which contains the value for each key inline or contains references to the pages where the values can be found.
  - Reliability: To make it resilient to crashes, there is usually a write-ahead log (also known as a redo log). This is an append-only file to which every B-tree modification must be written before it can be applied to the pages of the tree itself. When the database comes back up after a crash, this log will be used to restore the B-tree back to a consistent state.
- Optimizations:
  - Copy-on-write scheme: A modified page is written to a different location, and a new version of the parent pages in the tree is created, pointing at the new location.
  - Do not store the entire key, but abbreviate it.
  - Try to lay out the tree such that the leaf pages are sequential.

- ***Advantages of LSM-trees:***
  - A B-tree index must write every piece of data at least twice: once to the write-ahead log, and one to the tree page itself. There is also overhead from having to write an entire page at a time, even if only a few bytes in that page changed.
  - Write amplification: the effect where one write to the database results in multiple writes to the disk over the course of the database's lifetime.
  - In write heavy applications, the performance bottleneck might be the rate at which the database can write to disk.
- ***Downsides of LSM-trees:***

- ***Other Indexing Structures***
  - Storing values within the index:
    - The key in an index is the thing that queries search for: it could be the actual row, or it could be a reference to the row stored elsewhere.
    - Heap file: the place where the reference to the rows are stored in.
    - The heap file approach is common because it avoids duplicating data when multiple secondary indexes are present: each index just references a location in the heap file.
    - When updating a value without changing the key: as long as the new value is not larger than the old value, the record can be overwritten in place. If the new value is larger, then it needs to be moved to a new location in the heap, and all indexes need to be updated to point to the new heap location of the record.
    - Clustered Index (MySQL's InnoDB): Store the indexed row directly within an index. Secondary indexes refer to the primary key. In SQL Server, you can specify one clustered index per data table.
    - Nonclustered: storing only references to the data within the index.
    - Covering index: an index which stores some of the table's columns within the index. This allows some queries to be answered using the index alone.
  - Multi-column indexes:
    - Concatenated index: Combine several fields into one key by appending one column to another (somewhat like a phone book). Strong for finding last name-first name combination, useless for finding people with a particular first name.
    - Used when querying for geospatial data: a restaurant search website may have a database containing the latitude and longitude of each restaurant.
    - Ex: e-commerce website can use a three-dimensional index on the dimensions `(R, G, B)` to search for products in a certain range of colors, weather observations can have an index on `date, temperature`.
  - Full-text search/fuzzy indexes:
    - Fuzzy querying. Lucene = uses an SSTable-like structure for its term dictionary.
  - Keeping everything in memory:
    - ***The performance advantage of in-memory databases is not due to the fact that they don't need to read from disk, rather, they are faster because they avoid the overheads of encoding in-memory data structures in a form that can be written to disk.***
    - Redis can provide data models (priority queue, set) that are difficult to implement with disk-based indexes.
    - Anti-caching approach: making in-memory database architecture extendable to support datasets larger than the available memory.

#### Transaction Processing or Analytics?

- OLTP vs OLAP:
  - Read pattern: small numbers per query vs aggregate over large numbers of records.
  - Write pattern: random access, low-latency write from user input vs ETL or event stream.
  - Used by: end user vs internal analyst.
  - What data represent: latest state of data vs history of events that happened over time.
- ETL: The process of getting data into the warehouse.
- Schemas for analytics: Usually a star/snowflake, where a central table (fact) is referenced by multiple smaller ones.
- Column-oriented storage: store all the values from each COLUMN together instead (?). Column families.

#### Column Storage

- Read about it when we get there.

#### Summary

- OLTP systems: user-facing, high volume of requests. In order to handle the load, applications usually only touch a small number of records in each query. Keys/index.
- OLAP/data warehouse: larger volume of queries, but each query is typically very demanding, requiring many millions of records to be scanned in a short time.

### Chapter 4: Encoding and evolution

- Translating from the in-memory representation to a byte sequence is called encoding (serialization/marshaling), and the reverse is called decoding (parsing, deserialization, and unmarshalling).
- JSON:
  - Distinguishes strings and numbers, but not integers and floating point numbers. Problem with large numbers.
  - Good support for Unicode character strings, but not binary strings.
  - Schema support?
- Binary encoding:
  - JSON still uses a lot of space compared to binary formats.
  - How do Thrift and Protocol Buffers handle schema changes while keeping backward and forward compatibility? Change field tags.
- Apache Thrift/Protocol Buffers/Apache Avro.

#### Modes of Data flow

- Via database:
  - "Writing a message for your future self."
  - Migrating data into a new schema is possible, but an expensive thing to do on a large dataset, so most databases avoid it if possible.
- Via REST and RPC:
  - REST: Emphasizes simple data formats, using URLs for identifying resources and using HTTP features for cache-control, authentication, and content-type negotiation.
  - ***Remote procedure call: The RPC model tries to make a request to a remote network service look like the same as calling a function or method in your programming language, within the same process.***
  - Problems with RPC:
    - Network requests are unpredictable.
    - Network request can return a timeout.
    - If you retry a failed network request, the requests might be coming through, but the responses are getting lost. So you might be doing something that you've done already.
- Via Message-Passing Dataflow.
  - Advantage of message broker over RPC:
    - It can act as a buffer if the recipient is unavailable or overloaded.
    - It can redeliver messages to a process that has crashed, and thus prevent messages from being lost.
    - Avoids the seller needing to know the IP/port of the recipient.
    - Allows one message to be sent to several recipients.
    - Logically decouples the sender from the recipient.
  - Brokers: RabbitMQ, Apache Kafka.
  - Implementations:
    - One process sends a message to a named queue or topic, and the broker ensures that the message is delivered to one or more consumers or of subscribers to that queue or topic. There can be many producers and many consumers on the same topic.
    - No data model. Just messages and shit.
  - Distributed actor frameworks:
    - A programming model for concurrency in a single process.
    - Rather than dealing directly with threads (and the associated problems of race conditions), logic is encapsulated in actors.
