## Apache Thrift
[Reference](https://www.quora.com/In-simple-terms-what-is-Thrift-software-framework-and-what-does-it-do)

- Apache Thrift: When writing a server, you design protocols/code to serialize and deserialize the protocol, and you also deal with sockets and managing concurrency, writing clients in many languages.
  - Modularity, when you type things to Quora it will send an HTTP request to the Quora frontend, which will then talk to the search engine servers.
  - RPC (Remote Procedure Call) is like calling a function on a different server as a service.
  - AT has its own "Interface Definition Language" in which you define what are the functions and what are their parameters.
