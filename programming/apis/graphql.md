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

## So what’s this GraphQL thing I keep hearing about?
[Reference](https://medium.freecodecamp.org/so-whats-this-graphql-thing-i-keep-hearing-about-baf4d36c20cf)

- The solution Facebook came up with is conceptually very simple: instead of having multiple “dumb” endpoints, have a single “smart” endpoint that can take in complex queries, and then massage the data output into whatever shape the client requires.
- Schema, queries, and resolvers.
  - Queries: `query getMyPost($id: String) { post(id: $id) { title body author } }`.
  - Resolvers: A resolver tells GraphQL how and where to fetch the data corresponding to a given field.
  - *With GraphQL, your API schema and your database schemas are decoupled. There may be no `commentsCount` in the database, but we can simulate them through the power of resolvers.*
  - Schema: Typed schema system.
- Since you write your own resolvers, you can address any security concerns at that level.
- Front-end developer's view:
  - I can get many resources in a single request.
  - I can customize the response to be what I want to be.
- Back-end developer's view:
  - Versionless API.
  - No API documentation. By defining your resource type, you don't need to specify what your API response should look like, your front-end friends will specify it themselves by giving your the query they want.
  - Introspection.
