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

## Reddit
[Reference](https://www.reddit.com/r/programming/comments/6zd0op/so_whats_this_graphql_thing_i_keep_hearing_about/)

- No mention on inserts or updates.
- Ex: Rails app with Postgres database.
  - GraphQL uses "resolvers" that can basically do anything. The resolvers could do some kind of in-memory data access, a calculation, or whatever. Inside the resolver, you can code like normal: if you need to hit a Postgres, you would use some type of package that establishes the connection, makes a query, and then turns the rows into JSON objects that conform to the GraphQL schema you decided upon.
  - With Rails apps though, there is the concept of routing, params parsing, ORM, serializing, permissions.
  - From the client side, it's super easy and grokkable, but implementing it on the server seems to be a lot more difficult, especially when you have a working REST API and you want to make the move to GraphQL.
- We did a test project of GraphQL as an API unifying and exposing a complex object graph distributed over a bunch of microservices. We implemented parallel on-demand caching fetching of dependent entities and declarative checks.
- Perceived benefit: writing a declarative query that explains what I want, then manually piecing together a bunch of different REST request responses, especially when they're asynchronous.
- GraphQL encourages having that logic centralized on the server and having individual clients ask for the data they need from one place by using a very simple query.
- With a traditional API, if a client wishes to gather some data from the server, they have to make several round trips. The responsibility the server is pushing onto the client is that it's up to them to orchestrate these requests, handle errors/retries, and then stitch together the data into a usable form.
- GraphQL: The server handles that responsibility, so the client can send a query and get a single response.
- Great for collecting multiple APIs into one stream.
- A lot of people put GraphQL in front of a series of REST APIs (which then do db writes), few early apps were written ground up with GraphQL. Writing to a db with GraphQL mutations consist of in a SQL client and firing off a query, bring in a REST client and firing off a request, mutating an in memory store. All of this happens in the programming language of your choice.
- GraphQL's spec more or less ends when the query hits your server and gets parsed/routed to a resolver. At that point, it's up to you to determine how to efficiently resolve it.

## The GitHub GraphQL API
[Reference](https://githubengineering.com/the-github-graphql-api/)

- This is partly because, by its nature, hypermedia navigation requires a client to repeatedly communicate with a server so that it can get all the information it needs. Our responses were bloated and filled with all sorts of `_url` hints in the JSON responses to help people continue to navigate through the API to get what they needed. Despite all the information we provided, we heard from integrators that our REST API also wasn't very flexible. It sometimes required two or three separate calls to assemble a complete view of a resource. It seemed like our responses simultaneously sent too much data and didn't include data that consumers needed.
- What e wanted:
  - We wanted to collect some meta-information about our endpoints.
  - For example, we wanted to identify the OAuth scopes required for each endpoint.
  - We wanted to be smarter about how our resources were paginated.
  - We wanted assurances of type-safety for user-supplied parameters.
  - We wanted to generate documentation from our code.
  - We wanted to generate clients instead of manually supplying patches to our Octokit suite.
- This type of design enables clients where smaller payload sizes are essential. For example, a mobile app could simplify its requests by only asking for the data it needs. This enables new possibilities and workflows that are freed from the limitations of downloading and parsing massive JSON blobs.
- OAuth scopes can also be implemented per resource?
- Other GraphQL benefits:
  - Batch requests
  - Create subscriptions
  - Defer data--mark your response as time-insensitive.
- Defining the schema
  - GraphQL has a type schema that forces the server to be unambiguous about the requests it receives and the responses it produces.

# Disadvantages of GraphQL?
[Reference](https://stackoverflow.com/questions/40689858/are-there-any-disadvantages-to-graphql)

- Joins are not trivial.
- Nested queries can lead to circular queries.
- Rate limiting of calls becomes harder due to the user firing multiple queries in one call.
- The response matches the shape of the query.
- Caching is hard, you have to have a transformation layer to reshape the response.
- Handling file upload: nothing in the GraphQL spec.
- Unpredictable/possible to N+1.
- For really simple APIs, why not just use normal REST?
