# Seven Databases in Seven Weeks: PostgreSQL

PostgreSQL is an RDBMS, which means it's a set-theory-based system, implemented as two-dimensional tables with data rows and strictly enforced column types.

Prevalence is due to: toolkits (triggers/stored procedures/advanced indices), data safety via ACID, mind share.

PG has plugins for NLP, multidimensional indexing, geographic queries, custom data types, and much more.

PostgreSQL is a design-first datastore. First, you design the schema, and then you enter the data that conforms to the definition of that schema.

RDBMSes contain relations which are sets of tuples which map attributes to atomic values.

*Strengths:* Support across different programming languages/ORMs, the flexibility of the join, anyone can write language extensions, indexes, etc.

*Weaknesses:* Partitioning, if you need to scale out rather than up, you may be better served looking elsewhere.
