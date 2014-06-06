# A Rails Development Environment with Docker and Vagrant
[link](http://www.talkingquickly.co.uk/2014/06/rails-development-environment-with-vagrant-and-docker/)

Docker:  We can use the same containers we create in development to deploy to production.

Vagrant 1.6 added native support for Docker as a provider. If on Linux, it will run Docker natively, otherwise it will spin a VM to use as the Docker host. Vagrant is used to setup a standard Ubuntu VM and install Docker, while everything else is done using standard Docker shell commands.

    $ vagrant up

Will Create:

- A VM running Ubuntu with Docker installed
- Separate Docker containers for the Rails application, PostgreSQL, and Redis
- Shared folder linked to Docker container
- Simple interface for running the Rails commands in the Docker environment

## Dockerising the App

- Standard Rails 4.1.0 application + model + use PostgreSQL.
- Secret values use the `dotenv` gem.
- 3 Dockerfiles: one for Rails, one for Redis, one for PostgreSQL. Rails Dockerfile in the root of the Rails project, others in su-folders of `docker`.

    Dockerfile/
    Vagrantfile/
    docker/
      postgres/
      rails/
      redis/
      scripts/

- Copy the Vagrant thingie and `vagrant up`

[TODO]: BASICALLY_EVERYTHING_I_DONT_UNDERSTAND_FROM_HERE
