## 4 Architecture Issues When Scaling Web Applications
[Reference](http://highscalability.com/blog/2014/5/12/4-architecture-issues-when-scaling-web-applications-bottlene.html)

- Scaling out is more important because commodity hardware is cheaper compared to special boxes (better computers).
- Possible to have low response times but not scalable.
- Capacity planning: figuring out the required hardware to handle expected load in production.
- Scaling load balancer: using multiple IP addresses and DNS round robin.
- RDBMS scaling: read/write on master databases and reads on slave databases.
- NoSQL: Usually compromise on consistency to get high availability and partition.
- Database split: vertical (Customer database, Product database...) or horizontal (American customers and European customers).
- Architecture bottlenecks: centralized component that cannot be scaled out, and a slow component in the request pipeline.
- CPU bound: high crunching data, cache heavily, asynchronous. Fix: Caching precomputing values, background jobs.
- IO bound: limited by the throughput. Most apps are IO bound due to CRUD application.


## 7 Years Of YouTube Scalability Lessons In 30 Minutes
[Reference](http://highscalability.com/blog/2012/3/26/7-years-of-youtube-scalability-lessons-in-30-minutes.html)

- Python, Apache, Linux, MySQL.
- `Vitess`: a front-end to MySQL. It's RPC based.
- `Zookeeper`: distributed lock configuration.
- `Wiseguy`: CGI servlet container.
- `Spitfire`: Templating system.
- Choose simplest solution possible.
- Youtube is not asynchronous, everything is blocking.
- Philosophy, not doctrine.
- A lot of Youtube systems start as one Python file and become large ecosystems after many many years.
- CDN.

### Techniques

- Sharding: it's how you partition.
- Python: no matter how bad your API is, you can stub or modify or decorate your way out of a lot of problems.
- Cheat a little: make sure the comment writer sees that comment immediately, but other people don't need to see it. Your system doesn't need globally consistent transactions always.
- Jitter: Cache randomly expires between 18-30 hours. That prevents things from stacking up.
- Fake things: sometimes, you can do a transaction every once in a while re: view count and update by a random amount.
- API specifications: be as well defined as possible. Have a tight specification of what data comes out every function.
- Your components are not perfect.
- With so many people, you need to define components.
- Efficiency is traded off for scalability.
