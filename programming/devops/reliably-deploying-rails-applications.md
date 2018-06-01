# 5 Minute Server

Stack: Ruby 1.9.3, PG, Redis

    $ git clone git@github.com:TalkingQuickly/rails-server-template.gi
    $ bundle install # Install chef, berkshelf, knife-solo

# Reliably Deploying Rails Applications

# Part 1: Chef

## Stack

- Ubuntu 16.04 LTS - High level of support/very common.
- Nginx - High performance, small memory footprint. Event driven architecture, memory usage is predictable, even under heavy loads.
- Unicorn - Web HTTP server for rack applications. When requests come into the server, they are handled by Nginx which then passes them back to Unicorn which runs the rails application and returns the response.
- PostgreSQL: Native JSON support.
- Ruby - Ruby 2.0.x, rbenv because its operation is simple to understand and troubleshoot.
- Redis - Fast key value store. Caching/API rate limiting.
- Memcached - Similar to Redis but entirely in memory. Great for caching.

### Automation

- If you're doing anything which involves running more than one command or sshing into a remote server more than once in a month, it's probably worth stopping and thinking "how can I automate this?"

Automating server deployments not only makes disaster recovery easier, it makes the creation of accurate test and staging environments easier, making the testing of new deployments easier and more efficient and so decreasing downtime.

*Automation is easier than you think.*

### Tools for automating provisioning

- Chef = hub/spoke style arrangement, central Chef server.
- For smaller setups: `chef-solo` lets you use your local development workstation to define server roles and configurations and then manually apply these configurations to servers as and when we need to.
- *Knife:* Knife is the CLI that provides the interface between a local chef repository and a remote server.

### Minimal workflow

- Use Knife to tell Chef Server to `bootstrap` a node. This means installing Chef Client on the remote node and creating a node definition file for that node on the Chef server.
- Use Knife to tell Chef Server that we want certain "recipes" or "roles" added to the "run list".
- Use Knife to set "attributes" on our node which customizes how the recipes in our "run list" behave.
- Use Knife to upload our Cookbooks to the Chef Server.
- Use Knife to tell Chef Server to "converge" our node.
- Chef Server will then connect to the Chef Client on the target node, copy across the relevant cookbooks and have Chef Client execute them.

``` bash

$ knife node run_list add NODE_NAME 'role[server],role[nginx-server],role[postgres-server],role[rails-app],role[redis-erver]`
$ openssl passwd -1 "plaintextpassword"
$ knife node edit NODE_NAME # Opens vim and edits the node
$ knife data_bag

# Applying configuration to the node
$ knife zero converge name:NODE_NAME --ssh-user root (ubuntu?)
```

```
// Sample data_bag
{
  "name": "data_bag_item_users_deploy",
  "json_class": "Chef::DataBagItem",
  "chef_type": "data_bag_item",
  "data_bag": "users",
  "raw_data": {
    "id": "deploy",
    "password": "PASSWORD",
    "ssh_keys": [
      "SSH_KEY"
    ],
    "groups": [
      "sysdamin"
    ],
    "shell": "/bin/bash"
  }
}

```

- Skipped quick start for now, going to actually just make a chef thing.

## Creating an new Project & Berkshelf

- Cookbooks are stored in `~/.berkshelf`.
- If we're developing a cookbook locally, we should have a separate folder for our cookbook, outside of our Chef Repo structure.
- `$ berks vendor`: Running these creates the `berks-cookbooks` directory.
- It's a bad idea to delete `Berksfile.lock`!

# Using Knife

- `ssh-copy-id`
- `$ knife zero bootstrap SERVER_IP_OR_HOSTNAME --ssh-user root --node-name NODE_NAME`
  - Connects to the node as the user.
  - Installs Chef client on that node.
  - Generates a node definition file in `nodes/NODE_NAME.json`.
- `$ knife node edit NODE_NAME`.
  - When interacting with Chef resources, we use knife to edit files.
- Run list: This defines the list of recipes which should be applied to the node.
  - `$ knife zero edit NODE` and `knife node run_list add NODE_NAME 'recipe[redis::server]'`, etc.
- Roles: Exactly what it sounds like.
- `$ knife zero converge 'name:NODE_NAME' --ssh-user root`
  - Converge/has the local Chef Zero instance connect to the Chef client on the specified node, upload the relevant cookbooks and apply the nodes definition.
- Data bags:
  - Global: For API keys which do not vary across environments, public keys which should be valid for SSH login.
  - Sensitive: Data bags can be encrypted, and individual items in data bags can be encrypted with separate keys.
  - `$ knife data bag create users deploy`
    - Creates a `data_bags/users/deploy.json` with a simple JSON object.
  - Encrypted data bag:
    - `$ knife data bag create secrets some_secrets --secret PASSWORD`
    - `$ knife data bag edit secrets some_secrets --secret PASSWORD`
    - Weird? Hehe.

# Chef Cookbook

- `cookbook 'redis-server', path: '../cookbooks/redis-server'`
- The `recipes/` directory: We can have one recipe for installing Redis from a `ppa` and one for compiling it from source.
- The `templates/` directory: What you use to create a file on the remote server.
- The `attributes/` directory: Values set in a node or role def.

- Without the Chef cookbook we would be doing this:

``` bash
$ sudo apt-get install -y python-software-properties
$ sudo apt-get repository -y ppa:chris-lea/redis-server
$ sudo apt-get update
$ sudo apt-get install -y redis-server
$ cat <<EOF > .... (redis conf)
$ sudo chown -R redis:redis /etc/redis/
$ sudo /etc/init.d/redis-server restart

```

















# 6: A Template for Rails Servers

There is no magic involved, chef is literally executing the commands we would normally execute by hand. *If it can be done in the terminal, we can write a chef recipe to automate it.*

We can maintain complete control of how our stack is provisioned, while at the same time maintaining the convenience of something like Heroku or pre-made images which hide the process from you completely.

Try making your own recipes first. The aim should be to get sufficiently comfortable throwing together a chef recipe that it feels as easy to put together a chef recipe to complete the task as it would be to do it manually. Also, being comfortable with the structure of a Chef cookbook will enabled to use third party ones more efficiently. *Most Ruby developers get to a point where taking a quicky look at the source of a troublesome gem is easier than spending hours on Stack Overflow.*

## 6.1: Managing Cookbooks with Berkshelf

In a `Berksfile` we can define the cookbooks our chef repository is dependent on and the versions of these, then use `berks tinstall` to grab all of these cookbooks. `Berkshelf` generates `Berksfile.lock` with the relevant versions for each cookbook.

    $ bundle exec berks install

# 7: Basic server setup

## Basic packages for servers:

> `look_and_feel-tlq` cookbook

    package 'htop'   # alternative to top
    package 'vim'    # to edit Rails config files
    package 'unzip' # to unzip shit

[TODO]: THISPART

## 7.2: Security

### Gotchas

- Not updating Gems
- Hard coding credentials (AWS keys, mail server passwords, error logging services, database logins). Your development repository should contain no production credentials and it's worth checking initializers to make sure none remain.
- Re-using passwords. *Mail server credentials should not be identical to the VPS providers login credentials.*
- Don't reuse credentials between staging and production--*IT IS EASY TO THINK THAT YOU ARE ON STAGING WHEN YOU ARE ON PRODUCTION AND DROP DATABASES (GG).*

### Measures

- `Fail2Ban`: Configure this to update the firewall to block any further connection attempts from this user.
- SSH hardening: By default, when you use `ssh user@youruserip` authentication will first be attempted by public key (this means looking at your private key (`~/.ssh/authorized_keys`) and checking to see whether there is a matching public key in `~/,sshg/authorized_keys` on the remote machine.

  I disable password login via ssh. There will be persistent attempts to brute force ssh login. Disabling it removes the attack vector completely.
- Unattended upgrades: If you choose to setup unattended upgrades to automatically install security updates, a package update can break an element of your stack and take th server down.

## 7.3: Firewall

A firewall acts as a gate keeper layer between the outside world and th services running on your server. You can restrict which remote IP addresses are allowed to collect on which ports on your server.

# 8: Installing Ruby

I prefer `rbenv` because its simpler to use.

When you enter rake or `irb` in the console, the system searches through each of the directories in `$ echo $PATH` in the order they are displayed for an executable file with that name.

`rbenv` will add a directory called `shims`. If you check that directory out, you'll see a bunch of shell scripts. These will help `rbenv` determine which Ruby version to run to execute the command.

Install `rbenv via chef.`

# 9: Monit

# 10: Nginx

`Nginx` is famously quick and simple to configure and the included Nginx recipe is correspondingly simple.

    bash 'adding stable nginx ppa' do
      user 'root'
      code <<-EOC
        add-apt-repository ppa:nginx/stable
        apt-get update
      EOC
    end

    #install nginx
    package "nginx"

It begins by adding an updated Nginx version and adds a simple Nginx configuration file.

# 11: PostgreSQL

In our simple configuration, the only parameter which must be set is the postgres users password. It's important that you note this as it will be required to gain access to the postgres user which will be needed for creating databases.

# 13: Testing with Vagrant

Vagrant makes it easy to manage and distribute virtual machines.

# Part 2: Deploying with Capistrano
==================================================

Capistrano is a ruby gem which provides a framework for automating tasks related to deploying a Ruby-based application to a remote server. These include tasks like checking out the code from a git repository onto the remote server and integrating stage specific configuration files into our app each time we deploy.

## Adding Capistrano to an application

    gem 'capistrano', '~> 3.0.1'
    gem 'capistrano-rails', '~> 1.1.0'
    gem 'capistrano-bundler'
    gem 'capistrano-rbenv', '~> 2.0'

    $ bundle exec cap install

 Capistrano 3 is structured as a Rake Application. This means that in general, working with Capistrano is like working with Rake but with additional functionality specific to deployment work flows.

*When we talk about Capistrano tasks, we know they're just rake tasks with access to the Capistrano deployment specific DSL.*

## The Capfile

    require 'capistrano/setup'
    require 'capistrano/deploy'

    require 'capistrano/rbenv'
    require 'capistrano/bundler'

    Dir.glob('lib/capistrano/tasks/*.cap').each { |r| import r }
    Dir.glob('lib/capistrano/**/*.rb').each { |r| import r } # Import helper methods

It's just requiring task definitions from Capistrano itself and then from other gems which are intended to add functionality. Then it goes on to include any application specific tasks defined in `lib/capistrano/tasks`.

## Common configuration

When the `Capfile` requires `capistrano/setup` this:

- Iterates over the stages defined in `config/deploy/`
- For each stage, loads the configuration defined in `config/deploy.rb`
- For each stage, loads the stage specific configuration defined in `config/deploy/stage_name.rb`

[TODO]: Thingies.











Why not Mongrel?

- When actions take longer than 60 seconds to complete, Mongrel will try to kill the thread. Mongrel will get into a "stuck" stage and has to be killed by some external process.
- Memory growth: We restart mongrels that hit a certain memory threshold.
- Slow deploys: When your server's CPU is pegged, restarting 9 mongrels hurts. They need to load all of Rails, the gems, your libraries, and your app into memory before it can start serving requests.
- Slow restarts: Any time a mongrel is killed due to memory growth or timeout problem it will take multiple seconds until it's ready to serve requests again.

Unicorn:

- Nginx sends requests directly to the Unicorn worker pool over a Unix Domain socket, which manages the workers. The OS handles balancing, and the master itself never sees any requests.
