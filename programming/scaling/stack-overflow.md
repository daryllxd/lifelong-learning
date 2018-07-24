# Stack Overflow: The Architecture - 2016 Edition
[Reference](https://nickcraver.com/blog/2016/02/17/stack-overflow-the-architecture-2016-edition/)

- Rules:
  - Everything is redundant.
  - All servers and network gear have at least 2x 10 Gbps connectivity.
  - Redundant partner.
  - Redundant via another data center.
- DNS: CloudFlare. We also have our own, just to make sure.
- Load balancer: HAProxy.
- Cache, Pub/Sub: Redis. Values are stored in the Protobuf format. Client: `StackExchange.Redis`.
- Machine learning instance (for recommended questions, matching to jobs).
- WebSockets: `StackExchange.NetGain`. More efficient than polling at scale.
- Search: ElasticSearch. ES over SQL search because it's cheaper. Not Solr because we want to search across the entire network but this wasn't supported at decision time.
- Database: SQL server, used as the source of truth.
- Libraries:
  - Dapper Micro-ORM for ADO.NET.
  - `MiniProfiler` as a profiler for each page.
  - Exceptional: Error logger for SQL, JSON, MySQL.
  - `Jil`: High-performance JSON deserializer.
  - `Bosun`: Backend monitoring system.
  - `PRIZM`: A/B testing and tracker for funnels.
  - `Calculon`: Ad server.

## Comments

- Stored procedures are, at a minimum, harder to debug, log, profile, and source control. We prefer simplicity, and stored procedures are a layer of abstraction that don't net us any benefits.
- We write almost every query (as you would using Stored Procedures), they simply live in code - not hidden in a stored procedure. Also keep in mind that we manage hundreds of copies of the same schema across hundreds of databases (one per site). The pain points I mention above are multiplied in our situation.
