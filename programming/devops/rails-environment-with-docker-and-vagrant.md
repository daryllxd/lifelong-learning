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

# Rails Development Using Docker and Vagrant
[link](https://blog.abevoelker.com/rails-development-using-docker-and-vagrant/)

## Why Docker?

After getting sick of the slowness of VMs, I switched to `vagrant-lxc`, which allowed Vagrant to provision lightweight Linux containers (LXC) instead of VMs.

Problems with Vagrant + Ansible:

- Need to wait for the machines to be provisioned.
- Deployment scenario where external sources are unavailable (APT repositories, Github, gems).
- Dependencies mutating between development, testing, and deployment time.

Docker simplifies development by making it fast and easy to spin up containers that are exact filesystem-level snapshots of production, typically differing only by environment variables or by config file difference. *This same snapshotting mechanism makes it much less nerve-wracking to deploy to staging or production, because you are uploading the full snapshots at once. You don't have to cross your fingers while APT updates packages, git does checkouts, or Bundler updates gems from RubyGems.org. Everything is already there in the Docker image.*

Docker is appealing because you have to do other things like compile assets for the asset pipeline or upgrade the Ruby interpreter version--things that are annoying to try and write in Capistrano or Ansible.

Vendor everything: No longer have to worry about `RubyGems.org` being down when you do deploys, but you add bloat to source control by storing fat binary files in it. Docker gives you the same benefit without corroding your source control.
