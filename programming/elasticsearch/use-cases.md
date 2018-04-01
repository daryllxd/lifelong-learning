# What are use cases of Elasticsearch?
[Reference](https://www.quora.com/What-are-use-cases-of-Elasticsearch)

- Users: Wikipedia for full-text search to provide suggested text. The Guardian to give editors feedback about public opinion. StackOverflow: To complete full-text search, geolocation queries. Github: Searching code.
- Advantages
  - Scalable: distributed by nature and can easily scale horizontally.
  - Speed: able to execute complex queries extremely fast, caches the structured queries commonly used as a filter for the result set and executes them only once.
  - Query Fine Tuning: Powerful JSON-based DSL which allows dev teams the ability to construct complex queries/fine tune them to receive the most precise results from a search.
  - Data types: text, numbers, dates.
  - Plugins.

# What are some use cases for using Elasticsearch versus standard SQL queries?
[Reference](https://stackoverflow.com/questions/33283725/what-are-some-use-cases-for-using-elasticsearch-versus-standard-sql-queries)

- Text search: Traditional RDBMS do not perform well (poor config, acts as a black box, poor performance). ES is highly customizable, extendable through plugins.
- Logging and analysis: Loggly, Kibana.
- Update: It's no longer just a distributed RESTful text-search engine:
  - Logstash.
  - Beats.
  - Kibana
  - X-Pack.
