## REST APIs are REST-in-Peace APIs. Long Live GraphQL.
[Reference](https://medium.freecodecamp.org/rest-apis-are-rest-in-peace-apis-long-live-graphql-d412e559d8e4)

- GraphQL solves:
  - The need to do multiple round trips to fetch data required by a view.
  - Clients dependency on servers: the request language can be understood by the server, which eliminates the need for the server to hardcode the shape or size of the data, and decouples clients from servers.
  - With GraphQL, developers express the data requirements of their user interfaces using a declarative language. They express what they need, not ho to make it available.
- *GraphQL is a language. If we teach GraphQL to a software application, that application will be able to declaratively communicate any data requirements to a backend data service that also speaks GraphQL.*
- This layer, which can be written in any language, defines a generic graph-based schema to publish the capabilities of the data service it represents. Client applications who speak GraphQL can query that schema within its capabilities. This approach decouples clients from servers and allows both of them to evolve and scale independently.
- Either queries or mutations.

- Benefits
  - Multiple requests for data become just one request, then have the GraphQL layer deal with it.
  - When you have multiple clients requesting data from multiple services, a GraphQL layer in the middle can simplify/standardize this communication.
  - Can specify fields for each resource to get.

- Costs
  - Resource exhaustion: overly complex queries. To solve: we can do cost analysis on the query and enforce a limit on the amount of data one can consume, timeout to kill requests that take too long to resolve.
  - Authentication/authorization: GraphQL is another layer. We can use GraphQL to communicate the access tokens between the clients and the enforcing logic.
  - Client data caching: the location of the data can serve as a cache key for the client. To solve, use the query text as the key to the client.
  - `DataLoader`: a utility one can use to read data from databases and make it available to GraphQL resolver functions. No need to read the data directly, the loader will act as an agent to reduce the number of actual SQL queries we send to the database.
