# Learn Docker
[link](https://www.docker.io/gettingstarted/#)

There are two programs: The Docker daemon, which is a server process and which manages all the containers, and the Docker client, which acts as a remote control on the daemon. On most systems, like in the emulator, both execute on the same host.

# ELI5: What is docker.io? What does it do?
[link](http://www.reddit.com/r/webdev/comments/1q4ybc/eli5_what_is_dockerio_what_does_it_do/)

Docker allows you to create hosts where each one is basically independent from the host (where you installed docker) and other containers. You can install and run a single or multiple applications in these containers since they mirror a Linux installation.

This allows you to: create a container, install/run an application, clone the containers as many times as you want, move it to other hosts and discard the containers without affecting the host or other containers.

You can also limit RAM, CPU, and disk usage of each container

Since you can move each container easily around, the community has a library of ready-made containers that you can pull adn run, allowing you to skip the installation and configuration for the most part.

A container is a self-sufficient wrapper for an application, it usually contains a normal Linux file system which the application uses. From the application perspective, it's like it's the only application installed in the computer (besides whatever it requires and the standard applications that comes with the file system).

Since the container is self-sufficient you can move it around, clone it, or just delete it without leaving any trace.

Without using containers, you would have to reinstall the application into other computers, might not be able to run multiple instances without conflict (depends on the application), and might leave traces in the computer after the uninstall (logs, packages, temporary files). These applications can also affect other applications and the computer where they are installed.

A container is where you stuff your code that you want to put on the server. The container is supposed to be able to be put on any server and even copied and stuff.

When we run multiple dedicated servers on one server, we call them virtual private servers. Now you don't have to pay the dedicated server price, and you could write your website in any language that you wanted. But simulating a server takes time and energy, so there was performance lost to the simulation. Also, the simulated server parts often required special drivers, so you couldn't use the latest operating system unless you knew how to add the special drivers, or you would wait until the person renting you the virtual server had added the drivers to the new version of the operating system.

Docker is a way to interact with containers that makes it simpler to create and manage the containers. Before docker, I would have to learn multiple technologies to get a simple container working which could take me a month or more, now that I have docker, I could get a complex multi-container system working in an afternoon.

Let's say I have an application that needs Redis, Memcached, Mongodb, and MySQL to talk to, in addition to a specific version of Ruby, specific system libraries, Imagemagick. I could manually manage virtual or dedicated servers by myself, where each new server would take a while to build. *Or I could write a dockerfile for my web application and specify that it needs services from public dockerfiles for MySQL, Mongodb, etc. Now my complicated application could be deployed fairly easily on a specialized Docker-based host, and VPS provider (Linode, AWS, Azure, Rackspace, Google), or even my own servers.*


