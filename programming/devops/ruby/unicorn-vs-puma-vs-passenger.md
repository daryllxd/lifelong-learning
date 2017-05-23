## Unicorn vs Puma vs Passenger: Which app server is right for you?
[Reference](http://blog.scoutapp.com/articles/2017/02/10/which-ruby-app-server-is-right-for-you)

- An app server's raw speed is unlikely to be a factor for the vast majority of apps.
- What matters is your app's execution time, db queries, and HTTP calls.
- If there is a 30 second db query, don't impact every user of the app, just impact the guy who triggered the query.
- *Slow clients:* Puma and Passenger do request buffering: a separate process downloads incoming requests, and when the request is completed, it is passed on to an available worker.
- Unicorn cannot help slow clients by itself: to get around this, you use Nginx as a reverse proxy and let it buffer client requests.
- *Slow apps:* If your app is running MRI, your app is subject to the global interpreter lock. This means your app server must support clustering/spawn multiple processes to execute application code on the same host across multiple requests.
- *Slow I/O.* Don't forget to add a `limit(10)` to your queries. Multithreading is better than clustering for this. A worker process spawns worker threads, each request is handled by one of those threads, but when it pauses for I/O, another thread starts its work. Puma/Passenger Enterprise.
- **So you need multiple processes so your host can run Ruby code across multiple requests concurrently, and you need multithreading, so your host can more efficiently use memory while waiting on I/O.**

### Which app server should I use?

- Unicorn: No multithreading and dependency on Nginx for slow client request buffering = ?.
- Passenger: Supports other languages. You can pay for an app server in Passenger Enterprise (documentation, config options, debugging tools, support).
- Puma: Generally just works. Try starting with Puma and evaluate Passenger as your app grows.

