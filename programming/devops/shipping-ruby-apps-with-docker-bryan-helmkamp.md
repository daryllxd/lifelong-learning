# RedDotRuby 2014 - Shipping Ruby Apps with Docker by Bryan Helmkamp
[link](https://www.youtube.com/watch?v=mVN7aTqr550)

I'm really excited about Docker. I think Docker is something that you will all be using in the next 2 years. So my goal in this presentation is to paint a picture for you.

We can run any (Linux, not Windows/Mac) service anywhere. You put your application in a cargo container, you send it to your ops team, and you can run it anywhere. It's container-based virtualization, combined with a generic package format, that you can use for any service.

*Container-Based Virtualization.* This is the big DevOps idea that is being pushed. All of Google, all of Twitter, all of Facebook, they use container-based virtualization. You don't need to run as many servers as Google for this to be valuable, we can use this for just one server, but at least you know that this thing can scale up to that level.

*Linux Containers (LXC).* You get a shared kernel and isolated resources. So you only get one version of the Linux kernel. So you get a sandbox for resources like PIDs, networking, and files. The root on your container is not the root on your OS, and the PIDs are different. You can do all sorts of fancy things such as accessing the host networking through a bridge, or not.

Docker is a PaaS that was akin to Heroku. They realized that the technology running under the hood was more valuable than the service itself. They chose to want to be the standard for container-based virtualization.

Docker has a server daemon/REST API and a CLI. It's structure is like this:

    Docker                            |
    AUFS         | LXC/libcontainer   |
    AUFS         | cgroups/namespaces |
    Linux Kernel                      |

AUFS = the file system that docker uses.

## Ruby and Docker

- Isolation
- Ephemeral-ish. Processes are supposed to be disposable (request this, get that, end).
- Low CPU/memory overhead. You need about 1/2 GB RAM per VM, but with Docker, you can run hundreds because you don't need to run a new operating system.
- Low boot time. If you boot up a new VM, you need a few seconds, in Docker it's a few milliseconds.
- Small images.
- High density (saves money/time, you can run your infrastructure on fewer servers).

## Docker Images

This is a saved version of something that can be run in a container. Think of it like a package. It consists of a root file system that could be any Linux file system, and there is also metadata on how to run the package. Possible metadata are stored in a registry, like RubyGems.

We can use `boot2docker` to take care of installing it on OS X.

## Docker CLI

    $ docker build # Compiles a package from a directory. If you have a Rails app, you can go to your Rails app and do docker build, and the end result is a built package.
    $ docker run # Runs an image as a container. You can customize just a few things, so you can use stuff like the environment variables. What you'd like to do is when you deploy an application to staging, you deploy a package that you've previously tested on CI, then when you've tested that on staging, you can promote that to production (byte for byte). The only thing that changes is the environment variables and other stuff your ops people want to do. At minimum you give an image, but you can provide envars if ever.

There's also some commands available: stuff like `search`, `pull`, `ps`, and there are also packages for stuff like Redis, MongoDB, RabbitMQ.

## Dockerfiles

This is how Docker knows how to package your application. It's sort of a DSL.

    FROM   : Start with a parent image.
    RUN    : Execute build commands.
    ADD    : Import files.
    ENV    : Set environment variables.
    EXPOSE : Make ports available.
    CMD    : Run a command when booting.

## Ex to run a Sinatra app:

    FROM phusion/passenger-full:0.9.8

    RUN rm /etc/nginx/sites-enabled/default
    ADD nginx.conf /etc/nginx/sites-enabled/webapp.conf
    RUN rm -f /etc/service/nginx/down

    RUN mkdir /home/app/webapp
    WORKDIR /home/app/webapp
    ADD ./home/app/webapp

    RUN bundle install --deployment
    CMD ["/sbin/my_init"]
    EXPOSE 80

We start with the image from Passenger (we'd rather start from somewhere already as opposed to an empty image).

RUN just runs a shell command.

ADD is a way of moving files from your directory into the Dockerfile. ADD then `.` will move the entire tree into the `/home/app/webapp` image.

The `sbin/my_init` is provided for by Passenger to run the image. Then you expose port 80 to the outside world.

## Ruby and Docker

I strongly recommend starting from `passenger-docker`. They have images of Ruby from 1.8-2.1, Python/Node,a build tool chain. The amount of overhead is about 10MB.

So when you run it, what it (`baseimage-docker`) gives you this:

    my_init # A script to start the others.
    syslog  # Logs
    cron
    sshd    # See stuff running inside Docker itself.

DEMO!
