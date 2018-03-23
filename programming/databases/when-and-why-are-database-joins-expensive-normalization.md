## When and why are database joins expensive?
[Reference](https://stackoverflow.com/questions/173726/when-and-why-are-database-joins-expensive)

- Joins involving properly selected keys with correctly set up indexes are cheap, because they allow significant pruning of the result before the rows are materialized.
- Denormalized: bulk disk read to create the result.
- Normalized: Just retrieve the keys, actually just the hash values, mitigating the cost of multi-column joins and reducing the cost of joins involving string comparisons.
- A good optimizer will choose the most restrictive condition and apply it before it performs a join.
- It is important to understand that table scans (examination of every row in a table in the course of producing a join) are rare in practice. A query optimiser will choose a table scan only when one or more of the following holds.
  - Fewer than 200 rows in the relation
  - No suitable indexes on the join columns
  - Type coercion needed before the columns can be compared
  - Comparing is done with an expression (no index)
- Denormalizing to precompute a join - notwithstanding the update anomalies entailed - is a commitment to a particular join. If you need a different join, that commitment is going to cost you big.
- **Denormalization is a commitment to a particular join strategy. As mentioned earlier, this interferes with other join strategies. But if you have buckets of disk space, predictable patterns of access, and a tendency to process much or all of it, then precomputing a join can be very worthwhile.**
- Possibly okay to denormalize in OLAP cases.

- As a general rule, I've always stored a normalized structure and denormalized caches that can be reconstructed. Eventually, these caches save my ass to solve the future normalization problems.

- I think the whole question is based on a false premise. Joins on large tables are not necessarily expensive. In fact, doing joins efficiently is one of the main reasons relational databases exist at all. Joins on large sets often are expensive, but very rarely do you want to join the entire contents of large table A with the entire contents of large table B. Instead, you write the query such that only the important rows of each table are used and the actual set kept by the join remains smaller.

- **The order in which you're joining the tables is extremely important. If you have two sets of data try to build the query in a way so the smallest will be used first to reduce the amount of data the query has to work on.** -> Postgres does not care about the order of the joins.

# When should you denormalize?
[Reference](https://dba.stackexchange.com/questions/4622/when-should-you-denormalize)

- Denormalize for OLAP transactions (online analytical processing/OLAP).
- OLAP = "read mostly" databases.
- All the indexes in the world with multiple joins are never so fast as a denormalized table that represents cached data that is not going to change.
- Controlled denormalization: that mechanism are implemented to ensure that inconsistencies can't arise due to redundant data.
- Denormalize if you're frequently accessing computed data.

# How far should you go with normalization?
[Reference](https://dba.stackexchange.com/questions/505/how-far-should-you-go-with-normalization)

- Profile until you can't know for sure what's going to work.
- When you're designing models for your application, you should normalize everything you can. But then you should profile the queries built over the model, especially those executed frequently.
- Attributes that took joins to reach will mostly be a performance hog. Balance normalization with performance.

# When to Denormalize a Database Design
[Reference](https://stackoverflow.com/questions/4301089/when-to-denormalize-a-database-design)

- Performance DBA
  - One set of table for current/archival purposes.
  - `InvoiceItem` has FKs both to `InvoiceHeader` and `InvoiceProduct`.
  - On if things get deleted from the database: you'll need to do an audit (check triggers?).
  - Summary tables/data warehousing tables?
- An invoice is a snapshot in time. Denormalizing the information you need to produce that invoice can make your reporting so much easier.
- It is perfectly acceptable to denormalize as long as you do it consciously and ensure that benefits overweight deficiencies and that anomalies will not bite you.
- Caching can even be done at the application layer.
- Archive: Everything that is in it should never be updated.
- Reporting services: a warehouse table that is trigger-updated, something you build by script whenever. It is ideal to be normalized, but it isn't always fast.
