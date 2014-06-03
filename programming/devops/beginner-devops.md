# 5 Common Server Setups for your Web Application
[link](https://www.digitalocean.com/community/articles/5-common-server-setups-for-your-web-application)

1. Everything on one server (LAMP): Good for setting up an application quickly, but offers little in scalability/component isolation. Hard to know which of the stack is performing poorly.
2. Separate database server: Keeps the application and database from fighting over the same resources. Can scale each tier separately, but performance issues can arise if the network connection between the two servers is high-latency.
3. Load balancer (reverse proxy): Distributes the workload across multiple servers. If one server fails, other servers will handle the incoming traffic. You can serve other apps through the same domain and port, using a layer 7 reverse proxy. Ex: HAProxy, Nginx, Varnish. Useful in an environment that requires scaling by adding more servers (horizontal scaling).
4. HTTP Accelerator (Caching reverse proxy): Cache responses from a web or application server in memory, so future requests for the same content can be served quickly, with less unnecessary interaction with the web or application servers. Varnish, Squid, Nginx. Useful in an environment with content-heavy dynamic web applications, or with commonly accessed files. Increases site performance by reducing the CPU load on web server, but requires tuning to get the best performance out of it.
5. Master-Slave Database Replication. All updates are sent to the master node and reads can be distributed across all nodes.

