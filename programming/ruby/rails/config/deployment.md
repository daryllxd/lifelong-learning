## [A Comparison of (Rack) Web Servers for Ruby Web Applications](https://www.digitalocean.com/community/articles/a-comparison-of-rack-web-servers-for-ruby-web-applications)

Phusion Passenger: Fast web server & app server: Directly integrated with Apache/NGINX. Referred to as `mod_rails` or `mod_rack`.

Passenger can work with multiple applications hosted on the same server. It is capable of handling slow clients. It is highly popular and used widely in many [production] scenarios.

Puma: Modern, concurrent web server for Ruby. Small footprint.

## Reddit

*Apache vs Nginx:* Web servers. They serve static files but they can serve dynamic web apps. Apache has more features, Ngins is smaller and faster.

Apache/Nginx can server Ruby web apps out-of-the-box. You need to use Apache/Nginx in combination with some kind of add-on.

*Mongrel:* Ruby app server: load your Ruby app and sets up a TCP socket. Mongrel: Ruby and C.

*WEBrick* is not fit for production. Single threaded pure-ruby server. Easy to get running, but slow. Use it as a last resort.

*Unicorn:* a fork of Mongrel. Forking webserver with automatic child management. You start up one Unicorn instance and it will fork off N children that it routes requests to. If children die, they are automatically reloaded. Pros: Stable, zero-downtime app reloads, forking model supports the "crash and burn" error recovery model nicely. Cons: Forking takes more memory than threading.

*Thin:* Evented I/O model by utilitzing the EventMachine library. Fast non-forking webserver with EventMachine and threaded concurrency support, depending on how it's configured. Very useful as a drop-in replacement for Webrick in development. Probably what you want if you're writing a node-style evented app based on EventMachine.

*Puma:* Pure threaded server. Concurrency is handled by individual threads in a single process. Is apparently quite fast, doesn't have the memory burden associated with forking models. Doesn't follow the typical POSIX daemonization model, so you have to manage it indirectly through some kind of manager like monit or supervisord.

*Phusion Passenger:* Integrated directly into Apache/Nginx. You should also be aware of Passenger, which is kinda sorta like Unicorn, except it gets compiled into the webserver as a module, so you don't have to do any proxying or daemon management. The downside is that when your http daemon restarts, so does your web app.

*Capistrano:* Automates the: uploading of Ruby code, installing libraries, setting up the app’s databse, starting and stopping daemons.
 
*Redis/Memcache:* Memcache/Redis = Key-value stores. Memcache in memory, redis is memory + HDD. It can store differnet types.

Personally, I recommend Thin for development, Unicorn or Passenger for deployment on MRI, and I suspect Puma would be your weapon of choice under JRuby. Torquebox is also worth looking at for JRuby installs. Passenger will be easiest for you to start with, but you'll have to pay if you want some of their advanced features like rolling restarts and error-resistant deploys, which you get for free with Unicorn.

I use Thin/Unicorn for development, and Unicorn for deployment.``
