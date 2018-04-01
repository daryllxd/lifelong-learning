# Seven Databases in Seven Weeks: Riak

Riak is a distributed key-value database where the values can be anything (plain text, JSON, XML, images, video clips), all accessible through an HTTP interface.

- Fault tolerant
- Queried via URLs, headers, and verbs
- Used by data centers like Amazon, since it was inspired by Amazon's Dynamo paper

You need: Erlang, the source code, a general Unix build tool like Make. cURL is used as the REST interface: you can do stuff like `curl http://localhost:8091/ping` or `curl http://localhost:8091/riak/no_bucket/no_key`.

