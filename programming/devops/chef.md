# Deploying Rails Applications

# Chef Definitions

The simplest way to provision a new server is to create a new VPS on something like Linode or Digital Ocean, login via SSH and start `apt-get` the packages you need, dropping into Vim to tweak config files and adding a few custom package sources where newer versions are needed.

When something new is needed you ssh back in, install or upgrade a package, building the server up in layers. (Somewhere there's a text file or wiki page with "all the commands you need".)

Problems with text file:

1. Hard to keep track of what you've done.
2. Slow (and therefore expensive).
3. It doesn't scale, with multiple servers.

## Tools for automating provisioning

*Chef/Chef Solo.* Chef is an automation platform which uses a Ruby DSL to represent the commands required to provision a server in a reusable format. With Chef you can define the steps required to configure a server to fulfill a "role", such as Rails app server or a database server, and then apply combinations of these roles to a particular remote machine.

The central Chef server "knows" the roles that a large number of other servers should have applied to them. If you update the role, the changes are applied to all of those servers automatically.

Solo configuration: We use the local development workstation to define server roles and configurations and then manually apply these configurations to servers as and when we need to. This is perfect for small projects running all parts of the stack on a single box.

*Knife and Knife Solo.* Knife is the CLI that provides the interface between a local (on our dev machine) chef repository and a remote server. Traditionally, this would be the master "chef server" but an additional tool "knife solo" allows us to use chef in solo mode an interact directly with the server we're trying to provision.

*Berkshelf.* Recipe = the commands to install an individual component on the system (ex: Ruby, Rails gem dependencies, MySQL server). Several recipes relating to a particular piece of functionality (MySQL server/client) are bundled together in a Cookbook. Berkshelf is like the Bundler for these recipes.

