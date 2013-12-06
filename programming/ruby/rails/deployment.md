Apache vs Nginx: Web servers. They serve static files but they can serve dynamic web apps. Apache has more features, Ngins is smaller and faster.

Apache/Nginx can server Ruby web apps out-of-the-box. You need to use Apache/Nginx in combination with some kind of add-on.

Mongrel: Ruby app server: load your Ruby app and sets up a TCP socket.

WEBrick is not fit for production: it is written entirely in Ruby. Mongrel: Ruby and C.

Unicorn: a fork of Mongrel. It supports limited process monitoring: if a process crashes it is automatically restarted.

Thin: Evented I/O model by utilitzing the EventMachine library.

Puma: forked from Mongrel, but it is designed to be purely multi-threaded.

Phusion Passenger: Integrated directly into Apache/Nginx.

Capistrano: Automates the: uploading of Ruby code, installing libraries, setting up the app’s databse, starting and stopping daemons.
 
Redis/Memcache: Memcache/Redis = Key-value stores. Memcache in memory, redis is memory + HDD. It can store differnet types.