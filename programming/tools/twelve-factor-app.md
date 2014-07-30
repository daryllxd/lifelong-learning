# The Twelve-Factor App
[link](http://12factor.net/codebase)

## I. Codebase

A twelve-factor app is always in VCS (Git, Mercurial, Subversion). If there are multiple codebases, it's not an app--it's a distributed system. Each component in a distributed system is an app, and each can individually comply with twelve-factor.

Multiple apps sharing the same code is a violation of twelve-factor. The solution is to factor shared code into libraries which can be included through the dependency manager.

*There is only one codebase per app, but there will be many deploys of the app.* A deploy is a running instance of the app--this is typically a production site, and one or more staging sites, and each developer has a copy running in the local development environment.

## II. Dependencies

*A twelve-factor app never relies on implicit existence of system-wide packages. It declares all dependencies, completely and exactly, via a dependency declaration manifest.*

Ruby: Gemfile. Python: Pip and Virtualenv. This simplifies setup for developers new to the app. The new developer can check out the app's codebase onto their development machine.

Twelve-factor apps also do not rely on the implicit existence of any system tools (ImageMagick or curl). If the app needs to shell out to a system tool, that tool should be vendored into the app.

## III. Config

An app's config is everything that is likely to vary between deploys (staging, production, developer environments, etc.). This includes:

- Resource handles to the database, Memcached, and other backing services
- Credentials to external services such as S3 or Twitter
- Per-deploy values such as the canonical hostname for the deploy

Apps sometimes store config as constants in the code. This is a violation of twelve-factor, which requires strict separation of config from code. Config varies substantially across deploys, code does not.

*A litmust test for whether an app has all config correctly factored out of the code is whether the codebase could be made open source at any moment, without compromising any credentials.*

The twelve-factor app stores config in environment variables. These are easy to change between deploys without changing any code.

## IV. Backing Services

A backing service is any service the app consumes over the network as part of its normal operation. Ex: datastores (MySQL or CouchDB), messaging/queuing systems (RabbitMQ/Beanstalkd), SMTP services for outbound email (Postfix), caching systems (Memcached).

Backing services like the database are managed by system admins. Third-party services: SMTP, metrics-gathering (New Relic), binary asset services (Amazon S3), API-accessible consumer services (Twitter, Google Maps).

*The code for a twelve-factor app makes no distinction between local and third party services. To the app, both are attached resources, accessed via a URL or other locator/credentials stored in the config.* A deploy of the twelve-factor app should be able to swap out a local MySQL database with one managed by a third party (such as Amazon RDS) without any changes to the app's code. Likewise, a local SMTP server could be swapped with a third-party SMTP service without code changes. In both cases, only the resource handle in the config needs to change.

Each distinct backing service is a resource: a MySQL database is a resource; two MySQL databases (for sharding) qualify as two distinct resources. *The twelve-factor app treats these databases as attached resources, which indicates their loose coupling to the deploy they are attached to.*

## V. Build, release, run

A codebase is transformed into a (non-development) deploy through three stages:

- The build stage is a transform which converts a code repo into an executable bundle known as a build. The build stage fetches and vendors dependencies and compiles binaries and assets.
- The release stage takes the build produced by the build stage and combines it with the deploy's current config. The resulting release contains both the build and the config and is ready for immediate execution in the execution environment.
- The run stage runs the app in the execution environment, by launching some set of the app's processes against a selected release.

The twelve-factor app uses strict separation between the build, release, and run stages. For example, it is impossible to make changes to the code at runtime, since there is no way to propagate those changes back to the build stage.

Deployment tools typically offer release management tools, most notably the ability to roll back to a previous release. The Capistrano deployment tool stores releases in a subdirectory named releases, where the current release is a symlink to the current release directory. Its rollback command makes it easy to quickly roll back to a previous release.

Builds are initiated by the app's developers whenever new code is deployed. The run stage should be kept to as few moving parts as possible, since problems that prevent an app from running can cause it to break in the middle of the night when no developers are on hand.

## VI. Processes

The app is executed in the execution environment as one or more processes. In the simplest case, the code is a stand-alone script, the execution environment is a developers' local laptop, and the process is launched via the command line.

On the other end of the spectrum, a production deploy of a sophisticated app will use many process types, instantiated into zero or more running processes.

*Twelve-factor processes are stateless and share nothing. All data that needs to persist must be stored in a stateful backing service, typically a database.* Never assume that anything cached in memory or on disk will be available on a future request or job--with many processes of each type running, chances are high that a future request will be served by a different process.

## VII. Port binding

Web apps are sometimes executed inside a web server container. The twelve-factor app is completely self-contained and does not rely on runtime injection of a web server into the execution environment to create a web-facing service. The web app exports HTTP as a service by binding to a port, and listening to requests coming in on that port.

In a local development environment, the developer visits a service URL like `http://localhost:5000/` to access the service exported by their app. In deployment, a routing layer handles routing requests from a public-facing hostname to the port-bound web processes.

This is typically implemented by using dependency declaration to add a web server library to the app, such as Tornado for Python, Thin for Ruby, or Jetty for Java and other JVM-based languages. This happens entirely in user space, that is, within the app’s code. The contract with the execution environment is binding to a port to serve requests.

## VIII. Concurrency

In the twelve-factor app, processes are a first class citizen. Processes in the twelve-factor app take strong cues from the Unix process model for running service daemons. Using this model, the developer can architect their app to handle diverse workloads by assigning each type of work to a process type. For example, HTTP requests may be handled by a web process, and long-running background tasks handled by a worker process.

This does not exclude individual processes from handling their own internal multiplexing, via threads inside the runtime VM, or the async/evented model found in tools such as EventMachine, Twisted, or Node.js. But an individual VM can only grow so large (vertical scale), so the application must also be able to span multiple processes running on multiple physical machines.

The process model truly shines when it comes time to scale out. The share-nothing, horizontally partitionable nature of twelve-factor app processes means that adding more concurrency is a simple and reliable operation. The array of process types and number of processes of each type is known as the process formation.

Twelve-factor app processes should never daemonize or write PID files. Instead, rely on the operating system's process manager (such as Upstart, a distributed process manager on a cloud platform, or a tool like Foreman in development) to manage output streams, respond to crashed processes, and handle user-initiated restarts and shutdowns.

## IX. Disposability

The twelve-factor app's processes are disposable, meaning they can be started or stopped at a moment's notice. This facilitates fast elastic scaling, rapid deployment of code or config changes, and robustness of production deploys.

Processes should strive to minimize startup time. Short startup time means you can move processes to new physical machines when needed.

Processes shut down gracefully when they receive a SIGTERM signal from the process manager. *For a web process, graceful shutdown is achieved by ceasing to listen on the service port (thereby refusing any new requests), allowing any current requests to finish, and then exiting.* Implicit in this model is that HTTP requests are short (no more than a few seconds), or in the case of long polling, the client should seamlessly attempt to reconnect when the connection is lost.

For a worker process, graceful shutdown is achieved by returning the current job to the work queue. For example, on RabbitMQ the worker can send a NACK; on Beanstalkd, the job is returned to the queue automatically whenever a worker disconnects. Lock-based systems such as Delayed Job need to be sure to release their lock on the job record. Implicit in this model is that all jobs are reentrant, which typically is achieved by wrapping the results in a transaction, or making the operation idempotent.

## X. Dev/prod parity

Historically, there have been substantial gaps between development (a developer making live edits to a local deploy of the app) and production (a running deploy of the app accessed by end users). These gaps manifest in three areas:

- Time. A developer may work on code that takes days to go into production.
- Personnel. Developers write code, ops engineers deploy it.
- Tools. Developers may be using a stack like Nginx, SQLite, and OS X, while the production deploy uses Apache, MySQL, and Linux.

*The twelve-factor app is designed for continuous deployment by keeping the gap between development and production small.*

Backing services, such as the app's database, queueing system, or cache, is one area where dev/prod parity is important. Many languages offer libraries which simplify access to the backing service, including adapters to different types of services. Ex: Rails AR can access MySQL, PostgreSQL, and SQLite databases.

Developers sometimes find great appeal in using a lightweight backing service in their local environments, while a more serious and robust backing service will be used in production. For example, using SQLite locally and PostgreSQL in production; or local process memory for caching in development and Memcached in production.

Twelve-factor: Use the same backing services as much as possible. Modern backing services such as Memcached, PostgreSQL, and RabbitMQ are not difficult to install and run thanks to modern packaging systems, such as Homebrew and apt-get. Chef, Puppet, Vagrant.

## XI. Logs

A twelve-factor app never concerns itself with routing or storage of its output stream. It should not attempt to write to or manage logfiles. Instead, each running process writes its event stream, unbuffered, to stdout. During local development, the developer will view this stream in the foreground of their terminal to observe the app's behavior.

In staging or production deploys, each process’ stream will be captured by the execution environment, collated together with all other streams from the app, and routed to one or more final destinations for viewing and long-term archival. These archival destinations are not visible to or configurable by the app, and instead are completely managed by the execution environment.

The event stream for an app can be routed to a file, or watched via realtime tail in a terminal.

## XII. Admin processes

The process formation is the array of processes that are used to do the app's regular business (such as handling web requests) as it runs.

One-off admin processes should be run in an identical environment as the regular long-running processes of the app. They run against a release, using the same codebase and config as any process run against that release. Admin code must ship with application code to avoid synchronization issues.
