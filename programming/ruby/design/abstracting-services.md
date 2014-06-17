# Abstracting Services in Ruby by Kurt Stephens
[link](http://ontwik.com/ruby/abstracting-services-in-ruby-by-kurt-stephens/)

1. Do everything asynchronously.
2. Fork the process or put them in a job.
3. Use other machines to poll a work table.
4. Use a queueing infrastructure such as `RabbitMQ`.

Issues:

*Problem domain/solution domain.* The client knows too much about the infrastructure, so not that easy to switch infrastructures.

*Service Middleware Semantics.* Is

[TODO]: THIS!

