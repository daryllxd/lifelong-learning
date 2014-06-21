# Ruby on Rails Server Options
[link](http://stackoverflow.com/questions/4113299/ruby-on-rails-server-options)

## Apache vs Nginx

Apache vs Nginx: They are both web servers. *They can serve static files but with the right modules can also serve dynamic web apps.* Apache is more popular and has more features, Nginx is smaller and faster and has less features.

Neither Apache nor Nginx can server Ruby web apps out of the box, you need to use an add-on.

*Apache/Nginx can also act as reverse proxies, meaning that they can take an incoming HTTP request and forward it to another server which also speaks HTTP.* When that server responds with an HTTP response, Apache/Nginx will forward the response back to the client.

## Mongrel/other servers vs. WEBrick

Mongrel is a Ruby application server, in concrete terms this means that it can load your Ruby app inside its own process space, and it sets up a TCP socket for communication with the outside world. Mongrel listens for HTTP requests on this socket and passes the request data to the Ruby web app. The Ruby web app then returns an object which describes what the HTTP response should look like, and Mongrel takes care or converting it to an actual HTTP response.

WEBrick is slower, has known memory leaks, and has some known HTTP parsing problems. WEBrick is only used as the default server because WEBrick is included in Ruby by default.

## The app server and the world

All current Ruby app servers speak HTTP. However, some app servers may be directly exposed to the Internet at port 80, but some may not. They are put behind a reverse proxy. Why?

- Some app servers can only handle 1 request concurrently, per process. *If you want to handle 2 requests concurrently you need to run multiple app server instances, each serving the same Ruby app.* This set of app server processes is called an *app server cluster*. You must then setup Apache or Nginx to reverse proxy to this cluster. Apache/Nginx will take care of distributing requests between the instances in the cluster.
- The web server can buffer requests and responses, protecting the app server from "slow clients" (HTTP clients that don't send or accept data very quickly). You don't want your app server to do nothing while waiting for the client to send the full request, because during that time the app server may not be able to do anything else. Apache and Nginx are very good at doing many things at the same time because they're either multithreaded or evented.
- *Most app servers can serve static files, but are not particularly good at it, Apache/Nginx can do it faster.*
- It's good practice, Apache/Nginx are very mature and can shield the app server from corrupted requests.

## App servers compared

- Mongrel was bare bones (single-threaded multi-process, so it is only useful in a cluster). No process monitoring: if a process in the cluster crashes, it needs to be manually restarted. People tend to use external process monitoring tools such as Monit and God.
- Unicorn is a fork of Mongrel: if a process crashes, it is automatically restarted by the master process. This is a purely single-threaded multi-process.
- Thin uses the evented I/O model by utilizing the EventMachine library.
- Puma was also forked from Mongrel, but unlike Unicorn, it was designed to be purely multithreaded. So there is not built-in cluster support

## Passenger

Passenger integrates directly into Apache or Nginx, and so can be compared to `mod_php` for Apache. Passenger allows Apache/Nginx to serve Ruby apps.

Instead of starting a process or cluster for your app/configuring Apache/Nginx to serve static files and/or reverse proxying requests to the process/cluster with Passenger, you just need to edit the web server config file and specify the location of your Ruby app's public directory.

## Passenger advantages vs. Other app servers

- Dynamically adjusts the number of processes based on traffic. Things like Gitlab/Redmine can be spun down when they're not used, allowing more resources to be available for more important apps. With other app servers, all your processes are turned on all the time.
- Passenger can run the Ruby garbage collector outside the normal request/response cycle, potentially reducing request times by hundreds of milliseconds.

## Capistrano

To start your app, you need to:

- Uploading the Ruby app code and files to the server machine.
- Installing libraries your app depends on.
- Setting up or migrating the database.
- Starting and stopping any daemons such as Sidekiq/Resque.

Capistrano automates all the preparation work. You tell Capistrano where your server is and which commands need to be run every time you deploy a new version of your app, and Capistrano will take care of uploading the Rails app to the server for you and running the commands you specified.

Of course you don't have to use Capistrano. If you prefer to upload your Ruby app with FTP and manually running the same steps of commands every time, then you can do that. Other people got tired of it so they automate those steps in Capistrano.

# 5 Common Server Setups for your Web Application
[link](https://www.digitalocean.com/community/articles/5-common-server-setups-for-your-web-application)

1. Everything on one server (LAMP): Good for setting up an application quickly, but offers little in scalability/component isolation. Hard to know which of the stack is performing poorly.
2. Separate database server: Keeps the application and database from fighting over the same resources. Can scale each tier separately, but performance issues can arise if the network connection between the two servers is high-latency.
3. Load balancer (reverse proxy): Distributes the workload across multiple servers. If one server fails, other servers will handle the incoming traffic. You can serve other apps through the same domain and port, using a layer 7 reverse proxy. Ex: HAProxy, Nginx, Varnish. Useful in an environment that requires scaling by adding more servers (horizontal scaling).
4. HTTP Accelerator (Caching reverse proxy): Cache responses from a web or application server in memory, so future requests for the same content can be served quickly, with less unnecessary interaction with the web or application servers. Varnish, Squid, Nginx. Useful in an environment with content-heavy dynamic web applications, or with commonly accessed files. Increases site performance by reducing the CPU load on web server, but requires tuning to get the best performance out of it.
5. Master-Slave Database Replication. All updates are sent to the master node and reads can be distributed across all nodes.

# New Relic eBook on DevOps

DevOps is a software development method that stresses communication, collaboration, and integration between software developers and IT operations professionals.

On one hand, business users demand change--new features, new services, new revenue streams--as fast as possible. At the same time, they also want a system that is stable and free from interruptions.

DevOps was created to resolve this dilemma by integrating everyone--business users, developers, test engineers, system administrators--into a single, highly automated workflow: rapid delivery of high-quality software that meets user requirements while maintaining the integrity and stability of the entire system.

## How does DevOps Work?

Automation. DevOps relies on toolchains to automate large parts of the end-to-end software development and deployment process.

Continuous Integration. Isolated changes are immediately tested and reported on when they are added to a larger code base. The goal of CI is to provide rapid feedback so if a defect is introduced into the code base, it can be identified and corrected as soon as possible.

Continuous Testing. The days are over when developers can throw the code to a QA and say, "have at it." In DevOps, everyone is involved in testing. Developers make sure that they provide test data sets. They also help test engineers configure the testing environment to be as close to the production environment as possible.

Using automated tools reduces the cost of testing and allows test engineers to leverage their time more effectively. Most importantly, continuous testing shortens test cycles by allowing integration testing earlier in the process.

Continuous Delivery. Amazon can do hundreds of releases per hour.

Continuous Monitoring. The goal is to quickly determine when a service is unavailable, understand the underlying causes, and apply these learnings to anticipate problems before they occur.

## Why Are Your Peers Embracing DevOps?

Developers. Automated provisioning is a big win for programmers. When developers can provision a working environment in 15 minutes, it changes the way that they work.

Operations. Increased involvement by developers actually improves system stability. Automation also helps by eliminating human errors.

Test engineers. "Chaos monkey." The best way to avoid major failures is to fail constantly. The software simulates failures of instances of services by shutting own one or more of the virtual machines.

