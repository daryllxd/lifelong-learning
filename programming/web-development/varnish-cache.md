# Getting Started with Varnish Cache
[Reference](https://www.linode.com/docs/websites/varnish/getting-started-with-varnish-cache/)

- Varnish works by handling requests before they make it to the back-end (Apache, nginx, or other web server).
- `sudo apt install varnish`
- Varnish configuration language, V will compile the VCL code into a C program that runs alongside the V process.
- Port, config file, memory allocation.
- Unlikely to cache POST.
- Backend polling: checks a ping to the backend and if it takes more than x seconds, then the backend is considered unhealthy.
- `sudo varnishlog` to test Varnish.
- Firewall: if V and your webdd
