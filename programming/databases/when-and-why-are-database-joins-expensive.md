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
