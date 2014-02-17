- Understanding Web Servers
- Building a Static Site
- Serving Multiple Sites from 1 VM
- Building a Dynamic Site Server (RoR) 1 VM
- Connecting Multiple VMs together

Toolset: Ubuntu Server, Nginx (Web server), Unicorn App Server, RoR, PG, Redis, ElasticSearch, Git deployment, Shell Scripts

Stack: Browser sends to server and server returns the response: HTML, JS, JSON

Basic server

    Static Files
    Web Server (Port 80/443) (Nginx/apache)

More complex/dynamic sites

    Redis       Elastic Search (9200)
    Worker      DB (PG/MY/SQLite) (5432/3306)
    -----App Server (Ruby, PHP...)--------
    -----------Web Server (80/443)--------

Reverse proxy: The Nginx retrieves a response from another server and spits it back out. Why? SSL, load balancing, caching, compressing data, request queueing.

Components

- Nginx/Apache: Handles web request from the browser
- App server: Business logic
- Database: Yun
- Workers: Process queued jobs
- Redis: Fast write datastore that can be used for anything
- Elasticsearch: Search engine
- Other crap

A DevOPs job is to ensure that each component can run and talk to each other efficiently, for as long as possible.

## Episode 3: Nginx Setup

1. SSH into the VM.
2. `sudo apt-get update` to update shit.
3. `sudo apt-get upgrade -y` to upgrade and `-y` to answer yes to everything.
4. `sudo apt-get install curl vim build-essential python-software-properties git-core -y` install this stuff.
5. `addgroup admin` 
6. `adduser deployer --ingroup admin` Set up a user other than `root`.
7. Type password
8. Copy public key

[TODO] https://www.youtube.com/watch?v=TIaBrUo2944&feature=c4-overview-vl&list=PLjQo0sojbbxUav7I746f0lT4apGX8-iON
