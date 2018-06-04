## What is an index in SQL?
[Reference](https://stackoverflow.com/questions/2955459/what-is-an-index-in-sql)
[Reference](http://csharp-video-tutorials.blogspot.com/2012/09/advantages-and-disadvantages-of-indexes.html)

- Without an index on any column in the `WHERE` clause, the SQL server has to walk through the whole table and check every row to see if it matches, which may be a slow operation on big tables.
- Try doing `EXPLAIN` to see if the query will make use of any index.
- People forget that they have to index the foreign keys because an index is not automatically created when you set up the foreign key relationship.
- When created, they need to be maintained. If your data keeps on changing, they can get fragmented, slowed, and need to be refreshed.
- *Adds time to inserts, updates, and deletes (because it has to update the index too), but can speed up selects and joins in complex inserts, updates, and deletes.*
- Selecting a range--if the data is sorted (index), then it is easier to find data with those conditions.
- It can also speed up the `UPDATE` and `DELETE`, since the RDBMS finds the row first before it updates or deletes. RDBMS will find the row faster.It will

## When Should I Create Database Indexes?
[Reference](https://stackoverflow.com/questions/2004032/when-should-i-create-database-indexes)
[Reference](http://odetocode.com/articles/70.aspx)

- Where you have a choice of how to create the index on multiple columns, put the column that will always be referenced in the queries ahead of other fields.
- After uniqueness constraints, add referential integrity constraints.
- Each index slows up update operations and uses storage spaces. The intention is that it should win its place by speeding up queries.
- Advantage: Faster access, ability to enforce business logic like no duplicates.

### Advantages

- Searching for records.
- Sorting records.
- Grouping records (since the database will often sort the results included by the GROUP BY).
- Maintaining a unique.

### Drawbacks

- This can double the size of the table itself.
- *Any time a query modifies the data in a table, the database needs to update all of the indexes where the data has changed.*
- In decision support systems and data warehouses, data remains relatively static and report generating queries outnumber data modification queries.

## What columns generally make good indexes?
[Reference](https://stackoverflow.com/questions/107132/what-columns-generally-make-good-indexes)

- Places where we can consider indexing: columns references in the `WHERE` clause and columns used in `JOIN` clauses.
- Use the `NOT NULL` attribute for columns in which you consider the indexing, so that `NULL` values will never be stored.
- Best suited to columns with a data type that can be given some meaningful order when sorted.
- *You want an index that quickly identifies a small subset of your dataset that is relevant to a query. If you never query by datestamp, then you don't need an index on it, even if it's mostly unique.*
- Type of index: B-tree allows range queries, hash indexes don't allow but get you straight to the point.

## How do you know what a good index is?
[Reference](https://stackoverflow.com/questions/79241/how-do-you-know-what-a-good-index-is)

- Every index you add will increase performance on any search by that column but will decrease write performance across the whole table.
- When you add or update a row, it must add-to or update both the table itself and every index that row is a member of.
- Bad: Gender, there are only two common values. Full-length descriptions, as whoever is performing the query rarely knows the exact value of the string.

## When should you consider indexing your SQL tables?
[Reference](https://stackoverflow.com/questions/523018/when-should-you-consider-indexing-your-sql-tables)

- Create indexes on common join fields such as Foreign Keys when I create the table.
- *On write heavy tables (like activity logs) I avoid indexes unless they are absolutely necessary. I also tend to archive such data into indexed tables at regular intervals.*
- Creating an index on a searched field is not a pre-optimization, its just what should be done.
- When the query time is unacceptable. Better yet, create a few indexes now that are likely to be useful, and run an EXPLAIN or EXPLAIN ANALYZE on your queries once your database is populated by representative data. If the indexes aren't helping, drop them. If there are slow queries that could benefit from more or different indexes, change the indexes.
- Anti-pattern: Blanket coverage - Placing indexes on tables with little or no growth and a (very) low row count. This is counterproductive as the index lookup can take longer than a table scan.

## Postgres CLUSTER

- `CLUSTER [VERBOSE] table_name { USING index_name }`.
- When a table is clustered, it is physically reordered based on the index information. When the table is subsequently updated, the changes are not clustered.
- If you access single rows randomly, the actual order of the data in the table is unimportant.
- If you tend to access some data more than others, and there is an index that groups them together, you will benefit from using CLUSTER.

# Order of Columns in Indexes
[Reference](https://stackoverflow.com/questions/2292662/how-important-is-the-order-of-columns-in-indexes)

- The order of columns is critical, but it depends on how you query it.
- Exact seek: when values for a ll columns in the index are specified and the query lands exactly on the row. Order = irrelevant.
- Range scan: when some columns are specified. But if the inner columns are less relevant, placing low selectivity columns makes them nothing but noise for a seek, and so it makes sense to move them out of the intermediate pages and keep them on the leaf pages.
- The index on Least-Second Most-Most Selective: can be used to aggregate results on low selectivity columns. (Used for OLAP).

# When Not to Use Indexes
[Reference](https://searchsqlserver.techtarget.com/feature/When-not-to-use-indexes)

- Small number of fields = does not benefit from an index if a large percentage of its records are always retrieved from it.
- Small static data tables that are small enough to do a table scan instead of an index scan.
- On a small percentage of the fields in a table.
