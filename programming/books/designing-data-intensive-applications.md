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

# Part 1: Foundations of Data Systems

# Chapter 1: Reliable, Scalable, and Maintainable Applications

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

# Chapter 2: Data Models and Query Languages

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

# Chapter 3: Storage and Retrieval

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

# Chapter 4: Encoding and evolution

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
                                    - Message deliver is not guaranteed.
                                    - Rather than dealing directly with threads (and the associated problems of race conditions), logic is encapsulated in actors.
                                    - This integrates a message broker and the actor programming model into a single framework. If you want to worry about forward and backward compatibility, feel free to send from a node running the new version to a node running the old version, and vice-versa.
                                    - Example of Actor frameworks:
                                    - Akka: Java's built-in serialization.
                                    - Orleans: custom data encoding format that does not support rolling upgrade deployments.
                                    - Erlang OTP: Hard to make changes to record schemas.

# Part 2: Distributed Data

                                    - Scalability, fault tolerance, latency.
                                    - Scaling to higher load:
                                    - Problem with vertical scaling is that the cost grows faster than linearly (a machine with 2x CPU, RAM, disk costs more than twice as much).
                                    - Shared disk: there is a limit to the scalability of this thing.
                                    - Replication vs partitioning:

# Chapter 5: Replication

                                    - Advantages of Replicating:
                                    - To keep data geographically close to your users.
                                    - To allow the system to continue working, even if some of its parts have failed.
                                    - To scale out the number of machines that can serve read queries.
                                    - Trade-offs:
                                    - Synchronous or asynchronous replication?
                                    - How to handle failed replicas?
                                    - Old topic, principles haven't changed much since they were studied in the 1970s.
                                    - Master/slave:
                                    - Leader/master/primary. Writes.
                                    - Followers/read replicas/slaves/secondaries/hot standbys.
                                    - Replication: asynchronous or synchronous?
                                    - If everything is synchronous, then the write cannot be processed until everything is synced. Usually, only one of the followers is synchronous (if the synchronous follower becomes unavailable or slow, one of the asynchronous followers is made synchronous). Semi-synchronous setup.
                                    - Often, leader-based replication is configured to be completely asynchronous. If the leader fails, any writes that have not yet been replicated to followers are lost. So a write is not guaranteed to be durable, even if it has been confirmed to the client.

                                    - Setting up new followers?
                                    - You cannot just simple copy files, because the data is always in flux.
                                    - No to locking.
                                    - How it's done:
                                    - Take a consistent snapshot of the leader's database at an exact point in time, if possible, without taking a lock on the entire database.
                                    - Copy the snapshot to the new follower node.
                                    - The follower connects to the leader and requests all the data changes that have happened since the snapshot was taken. This requires that the snapshot be associated with an exact position in the leader's replication log.
                                    - When the follower has processed the backlog of data changes, it has "caught up."

                                    - Handling Node Outages
                                    - Follower failure: catch-up recovery: on its local disk, each follower keeps a log of the data changes it has received from the leader. So it can connect again to the leader and get the data changes that occurred during the time when the follower was disconnected.
                                    - Leader failure: Failover process:
                                    - One of the followers needs to be promoted to the new leader.
                                    - Clients need to be reconfigured to send their writes to the new leader.
                                    - The other followers need to start consuming data changes from the new leader.
                                    - Failover-process steps:
                                    - *Determining the leader has failed.* If a node doesn't respond for so-and-so seconds, assume that it's dead.
                                    - *Choosing a new leader.* Election process via the remaining replicas, or be appointed by a previously elected controller node. The best candidate for leadership is usually the replica with the most up-to-date data changes from the old leader.
                                    - *Reconfiguring the system to use the new leader.*
                                    - Things that can go wrong in the failover process:
                                    - If asynchronous replication is used, the new leader may not have received all the writes from the old leader before it failed. (Those writes usually just get discarded).
                                    - Discarding writes is dangerous if other storage systems outside of the database need to be coordinated with the database contents.
                                    - 2 nodes can believe that they are the leader! (Split-brain phenomenon).
                                    - What is the right timeout before the leader is declared dead?

                                    - Implementation of replication logs:
                                    - Statement-based replication: log each write request (`INSERT...`).
                                    - Cons: Things like `NOW()` and `RAND()`, auto-increment, and side effects such as triggers/stored procs/user-defined functions.
                                    - Write-ahead log (WAL) shipping: the write is appended to a log as a main place for storage. Log segments are compacted and garbage-collected in the background. Used in PostgreSQL/Oracle. Disadvantage: the log describes the data on a very low level, just what bytes were changed in which disk blocks, so the format is coupled to the storage engine.
                                    - Logical (row-based) log replication:
                                    - Usually a sequence of records describing writes to database tables.
                                    - Trigger-based replication: triggers and stored procedures.

### Problems with Replication Lag

                                    - Read-scaling architecture: you can increase the capacity for serving read-only requests by adding more followers.
                                    - If an app reads from an async follower, it may see outdated information if the follower has fallen behind.
                                    - Reading your own writes: ex is letting a user submit some data and then view what they've submitted.
                                    - Read-after-write consistency: the guarantee that if the user reloads the page, they will always see any updates they submitted themselves.
                                    - Implementations:
                                    - When reading something that the user may have modified, read it from the leader; otherwise, read it from a follower. Ex: read your user profile information from the leader, and read other people's profile information from a follower.
                                    - If most things in the app can be edited, you can do some tracking from the last time it was edited?
                                    - The client can remember the timestamp of its most recent write, and the system can do something to check the reads for any user until that timestamp.
                                    - Cross-device read-after-write consistency: user viewing on 2 devices.

### Monotonic Reads

### Consistent Prefix Reads

### Solutions for Replication Lag

                                    - It's possible that replication lag isn't that much of a problem.
                                    - *Multi-leader replication:* if you can't connect to the leader for any reason, you can't write to the database.
                                    - Multiple datacenters (faster, higher tolerance for datacenter outages and network problems).
                                    - Offline operation: Leader db = your local db in the phone, then replication process between the replicas of your calendar on all your devices. CouchDB is designed for this.
                                    - Collaborative editing: you have a local db, homies have a local db as well.
                                    - On writing conflicts:
                                    - Give each write an ID and pick the one with the highest one. Last write wins. (Prone to data loss).
                                    - Give each replica a unique ID, and let writes that originated at a higher-numbered replica always take precedence over writes that originated at a lower-numbered replica.
                                    - Merge the values together?
                                    - Merge conflicts, just tell user that this is what happened, how will you merge?
                                    - Conflict-free replicated data structures for sets, maps, ordered lists, counters.
                                    - *Leaderless replication:* Riak, Cassandra, Voldemort.
                                    - No failover, when a node fails, it still writes to the other 2 nodes.
                                    - When they read, they read from all those nodes in parallel. Version numbers are used to determine which value is newer.
                                    - Catching up:
                                    - Read repair, update stale values when a read is executed.
                                    - Background process to look for differences in the data between replicas and copies missing data from one replica to another.
                                    - Quorum consistency.
                                    - For two clients adding items to the same cart, the server maintains a version number for each key just for checking.
                                    - Reading a key: the server returns all values that have not been overwritten, as well. When writing a key include version number.

### Summary

                                    - Replication
                                    - High availability: keeping the system running, even when one machine, or an entire datacenter goes down.
                                    - Disconnected operation: allowing an application to continue working when there is a network interruption.
                                    - Latency: placing data geographically close to users.
                                    - Scalability: being able to handle a higher volume of reads than a single machine could handle, by performing reads on replicas.

                                    Chapter 6: Partitioning/Sharding

                                    - Usually combined with replication so copies of each partition are stored on multiple nodes.
                                    - TODO: Read later!

                                    Chapter 7: Transactions

                                    - "Better to have application programmers deal with performance problems due to overuse of transactions than coding around the lack of transactions."
                                    - Things can happen: hardware failure, crashing app, interruptions in the network, partial updates, race conditions.

### ACID
                                    - ***Atomicity: The thing cannot be broken down into smaller parts.***
                                    - This describes what happens if a client wants to make several writes, but a fault occurs after some of the writes have been processed.
                                    - If writes are grouped together and something bad happens, those transactions are aborted and the database must discard or undo any writes it has made so far in that transaction.
                                    - Can be called abortability: the ability to abort a transaction on error and have all writes from that transaction discarded.
                                    - ***Consistency: There should be certain statements about your data (invariants) that must always be true.***
                                    - Making sure that the app and database can implement your invariants.
                                    - Consistency can be an application thing, not a database thing.
                                    - ***Isolation: Concurrently executing transactions are isolated from each other.***
                                    - The database ensures that when the transactions have committed, the result is the same as if they had run serially.
                                    - ***Durability: Once a transaction has committed successfully, any data it has written will not be forgotten, even if there is a hardware fault or the database crashes.***
                                    - Perfect durability does not exist: if all your hard disks and all your backups are destroyed at the same time, bye.

                                    - Single-object writes: what happens if the power or network goes down when writing or editing a big JSON file?
                                    - Multi-object transactions: are used in RDBMS graph databases, updating indexes, updating denormalized documents.
                                    - Rails: No easy way to retry aborted transactions.
                                    - Transaction isolation:
                                    - (No) dirty reads: seeing something written to the database even if the transaction has not yet committed or aborted.
                                    - (No) dirty writes: trying to update the same object in the database.
                                    - Snapshot isolation/repeatable read: each transaction reads from a consistent snapshot of the database. Even if the data is changed by another transaction, the transaction sees the old data from that particular point in time.
                                    - Used in backups, OLAP things.

                                    - Things on weak isolation levels/write skew: TODO.
                                    - Serializability: TODO.

                                    Chapter 8: The Trouble With Distributed Systems

                                    Chapter 9: Consistency and Consensus

# Part III: Derived Data

                                    Chapter 10: Batch Processing

                                    - Types of systems:
                                    - Services (online systems): Waits for a request/instruction, does the thing, then sends a response back.
                                                                 - Batch processing systems (offline systems): Takes a large amount of input data, runs a job to process it, and produces some output data.
                                                                                                               - Stream processing systems: Like batch processing, but it operates on events shortly after they happen.
                                                                                                               - Sorting vs in-memory aggregation (Unix vs Ruby):
                                                                                                                 - The `sort` utility in Linux handles larger-than-memory datasets by spilling to disk, and parallelizes sorting across multiples CPU cores.
                                                                                                                   - The Unix philosophy: Automation, rapid prototyping, incremental iteration, being friendly to experimentation, and breaking down large projects into manageable chunks.
                                                                                                                   - `sort` is a great example of a program that does one thing really well, it's probably a better sorting implementation than most programming languages, but it's not that useful in isolation.
                                                                                                                   - The uniform interface for Unix is a file/file descriptor.
                                                                                                                   - Another uniform interface: URLs (identifies a thing/resource on a website).
                                                                                                                   - Log analysis: uses `\n` as a record separator.
                                                                                                                   - Unix's separation of logic and wiring:
                                                                                                                   - Standard input: keyboard, but can go to a file.
                                                                                                                   - Standard output: screen/file.

### MapReduce/Distributed File systems

                                                                                                                   - Like Unix, but distributed across potentially thousands of machines. It reads and writes files on a distributed filesystem. (Hadoop).
                                                                                                                   - Shared-nothing principle: no hardware, just computers connected by a datacenter network.
                                                                                                                   - To tolerate machine/disk failures, file blocks are replicated on multiple machines. This could be several copies of the same data on multiple machines or an erasure coding scheme which allows lost data to be recovered with lower storage overhead than full replication.
                                                                                                                   - How it executes things:
                                                                                                                   - Reads a set of input files and breaks them up into records.
                                                                                                                   - Call the mapper function to extract a key and value from each input record.
                                                                                                                   - Sorts the key-value pairs by key.
                                                                                                                   - Calls a reducer to iterate over the sorted key-value pairs.
                                                                                                                   - Mapper/reducer only operate on record, not knowing where their input is coming from or their output is going to, so the framework can handle the complexities of moving data between machines.
                                                                                                                   - More common to do multiple MR jobs: they are chained together into workflows, such that the output of one job becomes the input to the next job.
  - Higher-level tools: Pig, Hive set up workflows of multiple Map-Reduce stages that are automatically wired together appropriately.
- (TODO: A bunch of stuff about joins.)

### The Output of Batch Workflows

  - Original use of MR: building indices for the Google search engine (a workflow of 5-10 MapReduce jobs). Can still be a good way of building indexes for Lucene/Solr.
  - Other uses: building ML systems (classifiers, recommendation systems). You can build another database to serve as the job's output directory, and are then loaded in bulk into servers that handle read-only queries.

### Dataflow Engines:

  - Apache Spark: they handle an entire workflow as a job, to process one record at a time on a single thread. Instead of alternating between map/reduce, they can assemble the thing in multiple ways.
  - Sorting needs only to be performed in places where it is actually required.
  - Because joins/data dependencies are explicitly declared, the scheduler knows what data is required where, so it can make local optimizations.
  - Fault tolerance: no intermediate state, so they recompute from data that is near? (That operation must be deterministic.)

## Summary

  - Problems that batch processing frameworks need to solve:
  - Partitioning: mappers are partitioned according to input file blocks. The output of mappers is repartitioned, sorted, and merged into a configurable number of reducer partitions.
  - Fault tolerance: MR writes to disk, which makes it easier to recover from an individual failed task, but slows down execution in a failure-free case. Dataflow engines: faster, but need to recompute if a node fails.

# Chapter 11: Stream Processing

- In general, a "stream" refers to data that is incrementally made available over time.
- *In a stream processing context, a record is more commonly known as an event: a small, self-contained, immutable object containing the details of something that happened at some point in time.*
- Producers: generate events.
- Consumers/subscribers: processed by.
- Topic/stream: related events are grouped together into this.
- Polling: becomes expensive if the data store is not designed for this kind of usage. The more often you poll, the lower the percentage of requests that return new events, and thus the higher the overheads become. Instead, probably better for consumers to be notified when new events appear.
- RDBMS triggers: are limited in what they do.

## Messaging Systems

- Unix/TCP pipes: one sender with one recipient. Messaging system: multiple producers nodes send messages to the same topic and allow multiple consumer nodes to receive messages in a topic.
- What happens if the producers send messages faster? The system can drop messages, buffer messages, flow control (block producer from sending more messages).
- If nodes crash/go offline: durability may require some combination of writing to disk and/or replication.
- Direct messaging: UDP multicast for the financial industry, ZeroMQ (brokerless messaging library). They require the app code to be aware of the possibility of message loss. Lower fault tolerance.
- Message brokers: a database that is optimized for handling message streams. It runs as a server, with producers/consumers connecting to it as clients. Producers write message to the broker, and consumers receive them by reading them from the broker.

- Brokers vs databases:
  - Databases usually keep data until it is explicitly deleted. MB delete a message when it has been successfully delivered to its consumers.
  - Since they quickly delete messages, most MB assume their working set (queue) is short. So more messages means throughput may degrade.
  - DB often supports secondary indexes/ways of searching for data, while message brokers often support some way of subscribing to a subset of topics matching some pattern.

## Keeping Systems in Sync

- No single system that can satisfy all data storage, querying, and processing needs.
- Example solution: OLTP DB + cache + full-text index to handle search queries + data warehouse for analytics.
- Either full database dumps or dual writes (write both to DB and search index and invalidate the cache entries). Problem with dual writes: you write once but the other fails, so inconsistent data.
- Change data capture: the process of observing all data changes written to a database and extracting them in a form where they can be replicated to other systems.
  - The log consumers are called *derived data systems*.
  - CDC makes sure that all changes made to the system of record are also reflected in the derived data systems so that the derived systems have an accurate copy of the data.
  - So one database is the leader and the rest are followers. Message broker or database trigger can be used to implement CDC.
  - Ex: LinkedIn's Databus, Facebook's Wormhole to implement this at scale.
  - CDC is usually asynchronous: the system of recording database does not wait for the change to be applied to customers before committing it.
  - Log compaction: optimization to throw away duplicates for things.
  - API Support: RethinkDB allows queries to subscribe to notifications when the results of a query change, Firebase/CouchDB provides data sync based on a change feed also made to applications, Meteor uses the MongoDB oplog to subscribe to data changes and update the user interface. VoltDB: Allows transactions to continuously export data from the database in the form of a stream, the database represents and output stream in the RDBMS model as a table into which transactions can insert tuples, but cannot be queried.

## Event Sourcing

- Storing all changes to the application state as a log of change events. But this applies the idea at a different level of abstraction:
  - In CDC, the app uses the database in a mutable way, updating and deleting records at will. Ensure that you match the order of writes in which the database was written.
  - In event sourcing, the app logic is built on the basis of immutable events that are written to an event log. Event store is append-only, and updates/deletes are discourages or prohibited.
- ***It is more meaningful to record the user's actions as immutable events, rather than recording the effect of those actions on a mutable database.***
- Ex: "student cancelled their course enrollment" means an entry gets deleted from the enrollments table, and a cancellation reason was added to the feedback table, and possibly, something like offering the thing to the next person on the waiting list can be chained into the action.
- Commands vs events:
  - Once something (command) is successful and the command is accepted, it becomes an event, which is durable and immutable.
  - Command: user trying to register a username. System needs to verify that username. When that check has succeeded, the app can generate an event to indicate that a particular username was registered by a user ID.
  - When the event is generated, it becomes a *fact*. A consumer of the event stream is not allowed to reject an event: by the time the consumer sees the event, it is already an immutable part of the log.
  - Theoretically, if you store the changelog durable, the state is reproducible.
  - Transaction logs record all the changes made to the db: high-speed appends are the only way to change the log. *From this perspective, the contents of the db hold a cache of the latest records in the log. The truth is the log.*
- Think of accountant ledgers: they have an append-only ledger, where if they make a mistake, they add another transaction to compensate for that mistake.
- *If you accidentally deploy buggy code that writes bad data to a database, recovery is much harder if the code is able to destructively overwrite data.*
- Ex: for analytics, better to know that a cx added and removed something from the cart though it's the sort of the same as if they never added it in the first place.
- By separating mutable state from the immutable event log, you can derive several read-oriented representations from the same log of events. Ex: Druid, Pistachio, Kafka connect.
- Having an explicit translation set from an event log to a database makes it easier to evolve your application over time: you can use the event log to build views for the new feature, and run it alongside existing systems without having to modify them.
- ***CQRS/command query responsibility segregation: separating the form in which data is written from the form it's read.***
- On normalization vs denormalization: this wouldn't matter if you can readily translate data from a write-optimized event log to a read-optimized application state.
- The problem with ES and CDC: since the consumers of the event are usually asynchronous, there is a possibility that a user may make a write to the log.
- To what extent is it feasible to keep the immutable history of everything? Depends on the amount of churn in the dataset, deleting user information for privacy regulations.

## Processing Streams

- Processing a stream:
  - Take the data in the events and write it to a database, cache, search index, or storage system, where it can then be queried by other clients.
  - Push events to users.
  - Process one or more input streams to make one or more output streams.
- Uses of Stream Processing
  - Fraud detection systems to determine if the usage patterns of a CC has changed.
  - Trading systems.
  - Manufacturing systems to monitor the status of machines in a factory, and quickly identify the problem if there is a malfunction.
- Complex event processing: allows you to specify rules to search for certain patterns of events in a stream.
  - These usually use SQL or GUI to describe the patterns of events that should be detected. Then, you submit these queries to a processing engine that checks for matches. When a match is found, an event is emitted.
  - A query is stored for the long-term, and events from the input streams flow past them in search of a query that matches an event pattern.
- Stream Analytics
  - Ex: Measure the rate of some type of event, calculate the rolling average, comparing current stats to previous time intervals.
  - We can also use probabilistic stuff like Bloom filters (less accurate but way more memory efficient).
- Searching on streams:
  - Sometimes, you need to search for individual events based on complex criteria.
  - ElasticSearch has its percolator feature to implement this kind of stream search.
  - Traditional search: Index the documents and then run queries over the index.
  - Searching a stream: the queries are stored, documents run past the queries. (You can index queries/documents too.)
- Message Passing and RPC are not usually stream processors.
  - Actor frameworks are used to manage concurrency. Stream processing is used for data management.

## Reasoning About Time: TODO.

## Stream Joins

- Stream-stream join, stream-table join, table-table join.
- TODO.

## Fault Tolerance

- Batch processing: Faults can be tolerated easily, if a task in a MapReduce job fails, it can just be started again on another machine, and the output of the failed task is discarded.
- ***This works because the input files don't change, each task writes its output to a separate file on the HDFS, and output is only made visible when a task complete successfully.***
- The output of the batch job looks the same as if nothing had gone wrong, even if some tasks did fail: some records may be processed multiple times, but it doesn't look like that in the output.
- Harder to do this in stream processing, because a stream is infinite, and you can never finish processing it.
- Micro-batching: break the stream into small blocks, and treat each block like a small batch process.
- Checkpointing: Generate rolling checkpoints of state and write them to durable storage.

## Summary

- 2 types of MB:
  - AMQP/JMS-style MB: assigns individual messages to consumers, and consumers acknowledge individual messages when they have been successfully processed.
  - Log-based MB: assigns all messages in a partition to the same consumer node, and always delivers messages in the same order. (Usually used for streams).
- Streams come from user activity, data feeds, etc. Think of all the writes to a db as a stream: we can capture the changelog either implicitly through CDC or explicitly through event sourcing.

# Chapter 12: The Future of Data Systems

- Multiple syncs: as the number of different representations of the data increases, the integration problem becomes harder. DB, search index, analytics systems, data warehouses, batch/stream processing systems, caches, denormalized versions of objects, stuff that gets passed through ML/classification/recommendation systems, etc.
- Reasoning about data flows: where is data written first, and which representations are derived from which sources?

## Lambda Architecture

- Batch processing: used to reprocess historical data.
- Stream processing: used to process recent updates.
- Combining the two: lambda architecture.
  - Stream processor consumes events/quickly produces an approximate update to the view.
  - Batch processor consumes the SAME set of events and produces a corrected version of the derived view.
- Problems:
  - Hard!
  - These need to be merged in order to respond to user requests.
  - Although great to have the ability to reprocess the entire historical dataset, doing so frequently is expensive on large datasets.

## Unbundling databases

- Unix: low-level abstraction.
- RDBMS: high-level abstraction.

## Designing Applications Around Dataflow

- Spreadsheets: you can put a formula in one cell, and whenever any input to the formula changes, the result of the formula is automatically recalculated.
- We want this to work at a data system level: when a record in a database changes, we want everything to be updated.
- ***Databases do not fit well with the requirements of modern app development: dependency/package management, version control, rolling upgrades, evolvability, monitoring, metrics, calls to network services, integration with external systems.***
- ***Deployment and cluster management tools such as Docker/Kubernetes are designed specifically for the purpose of running application code.***
- It makes sense to have some parts of a system specialize in durable data storage, and other parts specialize in running application code. The two can interact while still remaining independent.
- In the modern web app, the DB acts as a kind of mutable shared variable that can be accessed synchronously over the network. The app can read and update the variable, and the DB takes care of making it durable.
- New style of application development: breaking down functionality into a set of services that communicate over synchronous network requests such as REST APIs.

## Correctness

## Enforcing Constraints

## Trust, But Verify

## Do the Right Thing

- Analytics to profile/discriminate against someone. :(
- Automated decision making to make decisions about people?
- Privacy and tracking.
- Surveillance.
- Consent and freedom of choice: users have little knowledge of what data they are feeding into our databases, or how it's retained and processed.
- ***Having privacy does not mean keeping everything secret; it means having the freedom to choose which things to reveal to whom, what to make public, and what to keep secret.***
