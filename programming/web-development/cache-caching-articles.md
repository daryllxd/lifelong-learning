# Caching
[Reference](https://www.educative.io/collection/page/5668639101419520/5649050225344512/5643440998055936)

- Recently requested data is likely to be requested again.
- Application server cache: per node?
- Distributed cache: each of the nodes own part of the cached data. Typically, the cache is divided up using a consistent hashing function, such that if a request node is looking for a certain piece of data, it can know where to look within the distributed cache.
- Global cache.
- CDN: For static media. If we don't want to have a CDN yet, we can serve static assets off an HTTP server.
- Cache invalidation:
  - Write through: write twice, both to cache and database.
  - Write-around: data is written directly to permanent storage, bypassing cache. Reduce writes, but read requests can get a cache miss.
  - Write-back: Write to cache, then client.
- Eviction:
  - First in first out.
  - Last in first out.
  - Least recently used.
  - Most recently used.
  - Least frequently used.
  - Random.
