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



