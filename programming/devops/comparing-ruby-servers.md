# App Server Arena: Part 1, A Comparison of Popular Ruby Application Servers
[link](https://blog.engineyard.com/2014/ruby-app-server-arena-pt1)

- Passenger: One of the easiest to configure and very common.
- Thin: An EventMachine-based server.
- Unicorn: A very straight-forward app server for fast clients and responses.
- Puma: A truly concurrent application server.

## Passenger

- App server that is compiled either as an Apache module or compiled directly along with the nginx source code (nginx doesn't have a plugin architecture like Apache).
- Passenger: Embeds itself into nginx or Apache. When running Passenger, you get nginx from Phusion. Once compiled/installed, Passenger is a part of nginx.
- Under its default configuration, Passenger will use an elastic worker spawning method that waits until a worker is necessary before starting one.
- When Passenger is configured, it's set as a "location" in nginx configuration, and then further configuration instructs nginx to forward requests to that location, which is how Passenger takes over.

Request routing is either per-worker or pool wide (global queue).

Passenger is best used in situations where its unique spawning method can really shine. *Passenger has the ability to kill off workers that don't have enough traffic to justify their existence to conserve memory, and dynamically respawn them as needed.*

For an always-on, dedicated application, this behavior can be a real pain. While it can be changed, the problem with this method for large, dedicated applications is that during periods of low traffic, workers will be killed off, and when traffic picks up, requests will hang inside Passenger while it tries to launch new worker processes in memory.

For machines with multiple applications that have low to moderate traffic, you can deploy more applications to the same hardware (the application can launch quickly when Passenger needs to spin up another worker.

Passenger doesn't have multithreading, zero-downtime deploys in the free version.

## Unicorn

Unicorn does not have a single router process. Unicorn launches a master process that contains one single copy of your application in memory, and then forks itself into worker processes. The number of worker processes depends on how Unicorn is configured; it could be one to as many as the machine can reasonably hold.

*Unicorn is then configured to bind to a unix socket on the local machine. Requests from nginx are then placed in this socket. Each worker dips into the socket, finds the next request to handle, works it, and returns a response to nginx.*

*When Unicorn starts up with an appropriate configuration, it will first read your application into memory as one master process. Then it will read that configuration and run its `before_fork`, fork itself into N number of workers, then each worker will execute its own `after_fork` block.*

Unicorn's master process then plays manager, just watching the other processes, ready to kill one off via `SIGKILL` if it takes too long to execute a request. If that happens, the Unicorn master will fork itself to replace it.

*Unicorn is capable of a zero downtime deploy. By sending the Unicorn master a HUP signal, it will reload itself and its workers based off your most recent code deploy.*

It is best used in situations with one specific application on a host, as it will spawn several workers as configured and maintain them at all times. Memory consumption could be a problem if you launch more workers than you have memory to reasonably support.

Unicorn is not well suited to applications that have long-running requests, large uploads, or long-polling/websockets, as it doesn't run a threaded or evented architecture. It finds any request it can, works as fast as it can, and then repeats the loop. Any request that takes longer than the configured cut-off time will just be terminated.

We find that Unicorn's best use case is with a single, dedicated application running at all times behind a reverse proxy (nginx) and load balancer (haproxy or ELB) that stick to a regular, request/response application flow cycle.

## Thin

Thin is an EventMachine-based application server that is similar to Unicorn in that it launches multiple workers and listens to a socket, but different in that it has no master controlling process and has one specific socket per worker process.

When started in cluster mode, each Thin worker opens its own socket, or is bound to its own port. Nginx can then be configured to "round-robin" balance requests between as many Thin sockets/ports as you have configured to start. It doesn't have a master process (by default) like Unicorn, but it is capable of restarting each worker one at a time for zero-downtime deploys.

Like Unicorn, Thin is best suited to a single application running at all times on a given host. It runs based on EventMachine under the hood, meaning that applications that can benefit from an evented architecture - for example, a long-polling application - may benefit significantly from Thin.

## Puma

Puma's primary strength is that it's a truly concurrent application server. It can be configured to bind to ports or to pull from a socket. However, Puma will open a new thread for each incoming request, so blocking actions that aren't heavy on CPU usage should not be a problem for Puma.

