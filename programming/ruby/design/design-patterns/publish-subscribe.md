# Implementing PUB/SUB in Rails; using ActiveSupport::Notifications
[Reference](http://alma-connect.github.io/techblog/2014/03/rails-pub-sub.html#problem-handling-special-events)

# Evaluating Ruby pub/sub gems.
[Reference](https://www.reddit.com/r/ruby/comments/49iztg/evaluating_ruby_pubsub_gems_mainly_firehouse/)

- `message_bus`.
- Ruby to do web sockets? The migration path from Ruby to Node is not pretty and is full of problems.
- RabbitMQ.
- Wisper is great for notifications, but where it falls down is it makes you put a million pieces together in an app. `message_bus`.
- Firehose: Tied to HTTP, expects clients to be in JS and servers to be in Ruby, and something oriented around the metaphor of a path-oriented queue.
- RabbitMQ + Bunny + Sneakers.
