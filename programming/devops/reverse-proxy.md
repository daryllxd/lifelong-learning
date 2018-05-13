# Forward Proxies and Reverse Proxies/Gateways
[Reference](http://httpd.apache.org/docs/2.4/mod/mod_proxy.html#forwardreverse)

- Forward proxy: an intermediate server that sits between the client and the origin. To get content from the origin server, you send a request to the proxy naming the origin server as the target. You then request the content from the origin server and return it to the client.
  - This can be used to provide Internet access to internal clients that are otherwise restricted by a firewall.
- Reverse proxy (bad name lol)/gateway: This appears to the client like an ordinary web server.
  - Client doesn't say where to send the request, just says the namespace of the reverse proxy.
  - Used to provide Internet users access to a server behind a firewall.
  - Used for load balancing or to provide caching for a slower back-end server.

# Difference between proxy server and reverse proxy server
[Reference](https://stackoverflow.com/questions/224664/difference-between-proxy-server-and-reverse-proxy-server?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa)

- Forward: grant the client anonymity. Reverse: grant back-end servers anonymity.
