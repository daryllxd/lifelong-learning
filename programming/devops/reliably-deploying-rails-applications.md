# Reliably Deploying Rails Applications

## Chef

- How best to install Ruby
- Using Monit to ensure everything runs smoothly
- Basic security precautions
- Firewall management with UFW
- Managing users and public keys
- Creating and populating databases
- Setting up Redis and common gotchas
- Setting up Memcached

## Capistrano

- What should be managed by Cap vs. Chef
- Creating simple/modular Cap recipes
- Avoiding falling foul of `$PATH`
- Dealing with `Virtualhost` files
- Managing SSL certificates
- Configuring Unicorn
- Zero Downtime Deployment & Gotchas
- Log Rotation
- Copying databases between environments
- Managing Cron jobs with `Whenever`
- Managing background jobs with `Sidekiq`

## Stack

- Ubuntu 12.04 LTS - Popular because of the level of community support.
- Nginx - High performance, small memory footprint. Memory usage is predictable, even under heavy loads.
- Unicorn - Web HTTP server for rack applications. When requests come into the server, they are handled by Nginx which then passes them back to Unicorn which runs the rails application and returns the response.
- Ruby - Ruby 2.0.x, rbenv because its operation is simple to understand and troubleshoot.
- Redis - Fast key value store. It's great and fast for things like caching and api rate limiting.
- Memcached - Similar to Redis but entirely in memory. Great for caching.

## Chef Definitions

Simplest way? Login via SSH, `apt-get` the packages you need, edit config files with Vim and add a few custom package sources where newer versions are needed, when something new is needed you SSH back in, install/upgrade a package, build the server in layers. There's a text file somewhere with "all the commands you need" written down.

### Pitfalls of SSH:

- Hard to keep track of what you've done.
- It's slow and expensive. *Even if an engineer does this, his time is better spent working on the produt itself.*
- It doesn't scale. Having an engineer type in a list of commands might hold together, but expand that to more servers and the cracks will soon start to show.

### Automation

We want to take the manual processes and automate them. *As a general rule, any long process which I'd expect to repeat more than once or twice a year in the life-cycle of deploying and managing I try and automate.*

If you're doing anything which involves running more than one command or sshing into a remote server more than once in a month, it's probably worth stopping and thinking "how can I automate this?"

Automating server deployments not only makes disaster recovery easier, it makes the creation of accurate test and staging environments easier, making the testing of new deployments easier and more efficient and so decreasing downtime.

*Automation is easier than you think.*

### Tools for automating provisioning

*Chef:* Automation platform made by Opscode which uses a ruby DSL to represent the commands required to provision a server in a reusable format.

With chef you can define the steps required to configure a server to fulfill a role: Rails app server, database server, then apply combinations of these roles to a particular remote machine.

Chef = hub/spoke style arrangement. A central chef server "knows" the roles that a large number of other servers should have applied to them, if you update the role, the changes are applied to all of those servers automatically.

*This is overly complicated if we're just looking at managing 1-10 servers.* `chef-solo` lets you use your local development workstation to define server roles and configurations and then manually apply these configurations to servers as and when we need to.

*Knife:* Knife is the CLI that provides the interface between a local chef repository and a remote server.

*Berkshelf:* Bundler for recipes.



Why not Mongrel?

- When actions take longer than 60 seconds to complete, Mongrel will try to kill the thread. Mongrel will get into a "stuck" stage and has to be killed by some external process.
- Memory growth: We restart mongrels that hit a certain memory threshold.
- Slow deploys: When your server's CPU is pegged, restarting 9 mongrels hurts. They need to load all of Rails, the gems, your libraries, and your app into memory before it can start serving requests.
- Slow restarts: Any time a mongrel is killed due to memory growth or timeout problem it will take multiple seconds until it's ready to serve requests again.

Unicorn:

- Nginx sends requests directly to the Unicorn worker pool over a Unix Domain socket, which manages the workers. The OS handles balancing, and the master itself never sees any requests.
