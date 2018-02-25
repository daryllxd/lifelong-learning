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
