# Why The Hell Would I Use Node.js? A Case-by-Case Tutorial
[Reference](https://www.toptal.com/nodejs/why-the-hell-would-i-use-node-js)

- Unified language/data format (JSON).
- The original target of Node was to create real-time websites with push capability, inspired by applications like Gmail.
- *The main idea: use non-blocking, even-driven I/O to remain lightweight and efficient in the face of data-intensive real-time applications that run across distributed devices.*
- Not for CPU-intensive operations, but for fast/scalable network applications.
- Traditional: server creates a new thread from pool or waits for an available thread.
- Node: Handles event-based callbacks with one thread.
- Possible problem: heavy computation could choke up Node's single thread and cause problems for all clients because of incoming request blockage.
- Need to be careful not to allow an exception bubbling up to the core loop, which will cause the Node.js instance to terminate.
- Technique to avoid exceptions: passing errors back to the caller as callback parameters.
- Tools:
  - `express`: a Sinatra-inspired web development framework for Node.js.
  - `hapi`: configuration-centric framework.
  - `connect`: provides a collection of high performance "plugins" known as Middleware.
  - `socket.io` and `sockjs`: websockets.
  - `mongodb`.
  - `lodash`.
  - `forever`: makes sure that a given Node script runs continuously.
  - `bluebird`: promises/A+ implementation.
- Rails: converts requests from JSON to binary models to JSON back over through HTTP. With Node, you just use a REST API for the client to consume.
- Message queue to eventually write stuff to the database.
- Where Node can be used:
  - Pros: Server-side web apps. Crawlers receive a fully-rendered HTML response, which is more SEO-friendly.
  - Cons: Computation is bad. Node is bad for a relational database.

# Node.js as Backend: Best Use Cases, Tools & Limitations
[Reference](https://medium.com/dailyjs/node-js-as-backend-best-use-cases-tools-limitations-9c65165a5bac)

- JS is built on Chrome's V8 JS engine. Event-driven, non-blocking I/O model that makes it lightweight and efficient.
- NPM is now the largest software registry on the web.
- Debugging JS/Node.js: `node-inspector`, universal debugger.
- Enterprise server?
- Static shit: Typescript/Flow.

- Use cases
  - Code universality across the stack.
  - Webpack to reuse code on both ends.
  - Render both on the browser and server seamlessly.
  - `async/await` feature.
- Real-time applications/live chat/instant messaging/online gaming: RTAs that benefit from a Node.js architecture. Node: facilitates handling multiple client requests, enables reusing packages of library code, syncing data between the client and the server.
- SPA apps.
- Scalable. It's made to assemble multiple small distributed nodes communicating with each other.

- Limitations
  - Node allows you to shoot yourself in the foot. Because YOU create the structure that supports your back-end, that involves a lot of decision-making, meaning you have to know what you're doing.
  - Callback hell.
  - "I would use Go to build a server web." - Ryan Dahl

- Tooling
  - Express.
  - Meteor.
  - Sails.js. Designed to emulate MVC of Ruby/Rails.
  - Koa.js. Smaller/more expressive.
