# Octopus - Easy Database Sharding for ActiveRecord
[Reference](https://github.com/thiagopradi/octopus)
# Gem review: Octopus, database sharding for ActiveRecord
[Reference](http://www.stjhimy.com/posts/19-gem-review-octopus-database-sharding-for-activerecord)
# Ruby Database Sharding with Sequel
[Reference](https://www.calebwoods.com/2014/10/26/ruby-database-sharding-sequel/)
# database replication in 2016?
[Reference](https://www.reddit.com/r/rails/comments/4upei1/database_replication_in_2016/)

- Multiple databases.
- Sharding, Replication (master/slave), moving data between shards with migrations, tools to manage database configurations.
- *When using replication, all write queries will be sent to master, and read queries to slaves.* When using replication and sharding concurrently, you must specify a shard, and can optionally specify a slave group.
- To use, `shards.yml` inside your `config/` directory.
- Why/When? Tables with massive reads/writes, replicating, moving data along databases.

``` yml
# config/shards.yml
octopus:
  shards:
    shard_sqlite:
    adapter: sqlite3
    database: db/db_one.sqlite3
    pool: 5
    timeout: 5000

    shard_pgsql:
      adapter: postgresql
      username: postgres
      password:
      database: db_two
      encoding: unicode
```

- You can do the `Octopus.using(:shard_sqlite)` if you want to use a specific shard in only a part of the project, for a report/big queries.
- On octopus: It does not allow for adding shards dynamically or pulling shard connection information from the database instead of a config file.

## Sequel

- Sequel has plugins for handling database sharding.
- Multiple layers of abstraction for querying using Datasets and Models.
- Choosing Sequel over AR
  - Building on a legacy database
  - Using non-PostgreSQL or MySQL
  - Using PostgreSQL with native data types
  - Small web apps or API outside of Rails.

## Comments

- Clustering instead of a single box?
- If using MySQL on RDS, I suggest doing a POC using Aurora. Otherwise, read slaves are a good idea, but then you typically change your operations so that read operations go to the slaves, writes to master.

- TODO:
  - Makara [Reference](https://github.com/taskrabbit/makara)
  - Octopus vs Makara [Reference](https://ypoonawala.wordpress.com/2015/11/15/octopus-vs-makara-read-write-adapters-for-activerecord-2/)
