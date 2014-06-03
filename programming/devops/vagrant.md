# Vagrant, Up and Running

# 1: An Introduction to Vagrant

Vagrant does:

- Create a virtual machine  based on the OS of your choice.
- Modifies the physical properties of this VM (RAM, CPUs, etc.)
- Establishes network interfaces so you can access the VM from your own computer
- Sets up shared folders so that you can continue editing files
- Boots up the VM so it is running
- Sets the hostname of the machine
- Provisions software on the machine via a shell script/Chef/Puppet
- Perform host/guest specific tweaking to work around issues

Once Vagrant finishes setting up the machine, you are left with a completely sandboxed, fully provisioned development environment. *You can continue using your own editor and your browser to develop and test your apps, but the code runs on the VM.*

You can do:

- SSH into the machine.
- Halt/shut down the machine.
- Destroy the machine, completely deleting its virtual hard drive and metadata.
- Suspend or resume the machine.
- Package the machine state so you can distribute it to the other developers.

## Why Vagrant?

Prior to Vagrant, the preferred method of working on a web application was to install and configure all the software you needed locally on your development machine. That might work with few apps but now you have MySQL+PostgreSQL+Redis+Riak+Cassandra, Ruby+Python+Java+whatever, web servers, application servers, back-end services (Apache+Nginx+Unicorn+Thin+RabbitMQ+Solr).

Problems:

- Everything must be installed manually by a human.
- Configuration is even more difficult than installation.
- When manually setting up development machines, there is a difference between development and production. "Works on my machine" bugs.
- Multiple projects are hard because each project requires a slightly different configuration of their services.
- Hard to keep development environments in sync.
- It's difficult for multiple developers to use different operating systems.

## The Tao of Vagrant

*In a world with Vagrant, developers can check out any repository from version control, run `vagrant up`, and have a fully running development without human interaction. Developers continue to work on their own machines, in the comfort of their own editors, browsers, and other tools. The existence of Vagrant is transparent and unimportant in the mind of the developer.*

## Setting Up Vagrant

Vagrant must be installed on every computer that you want to run Vagrant-created development environments.

Install Virtualbox.

Install Vagrant.

# 2: Your First Vagrant Machine

    $ vagrant init precise64 http://files.vagrantup.com/precise64.box
    A `Vagrantfile` has been placed in this directory. You are now ready to `vagrant up` your first virtual environment!

This downloads a 300MB file, which you can run `vagrant up` on.

    $ vagrant up
    $ vagrant ssh
    $ vagrant destroy

## The Vagrantfile

Vagrant is configured per project, where each project has its own isolated work environment (`Vagrantfile`). This is jus a description of what OS you want to boot, physical properties, and ways you'd like to access the machine over the network.

    $ mkdir vagrant_example
    $ cd vagrant_example
    $ vagrant init precise64 http://files.vagrantup.com/precise64.box

There should be a `Vagrantfile`.

    Vagrant::Config.run do |config|
      config.vm.box = "precise64"                      # Variable Assignment

      config.vm.share_folder "v-root", "/vagrant", "." # Function call

      config.vm.provision "shell" do |s|               # Configurationg block
        s.path = "script.sh"
      end
    end

## Boxes

Because building a virtual machine from scratch is resource-intensive and time-consuming, Vagrant uses a base image and clones it to rapidly create a usable machine. Boxes contain already-installed operating systems, so they're usually large.

Multiple Vagrant environments often share the same underlying box, so Vagrant manages boxes globally, unlike Vagrantfiles which are managed on a per-project basis.

## Up

    $ vagrant up
    Bringing machine 'default' up with 'virtualbox' provider...
    [default] Importing base box 'precise64'...                      # Create a new VirtualBox machine based on the base image of the box
    [default] Matching MAC address for NAT networking...             # Randomly generates a MAC address so the Internet can work on this machine
    [default] Setting the name of the VM...                          # Visible name
    [default] Clearing any previously set forwarded ports...         # Clears out existing forwarded ports on the machine
    [default] Creating shared folders metadata...                    # Config VM with the shared folders needed
    [default] Clearing any previously set network interfaces...
    [default] Preparing network interfaces based on configuration...
    [default] Forwarding ports...
    [default] -- 22 => 2222 (adapter 1)
    [default] Booting VM...
    [default] Waiting for VM to boot. This can take a few minutes.
    [default] VM booted and ready for use!
    [default] Configuring and enabling network interfaces...         # Configures the actual OS for the network devices
    [default] Mounting shared folders...                             # Mount shared folders so that data can be shared across the VM and your host machines
    [default] -- /vagrant

You should see a `VBoxHeadless` process running. This is your virtual machine.

## Working with the VM

    $ vagrant status
    $ vagrant ssh

Shared folders let uses of Vagrant edit files using their own editor on the host machine, and have these changes synced into the virtual machine automatically.

By default, Vagrant shares the project directory (the directory with the Vagrantfile to `/vagrant` inside the VM). After SSHing into the virtual machine, this can be verified by listing the files in that directory:

    vagrant@precise64:~$ ls /vagrant/
    Vagrantfile

You can do shared folders, too.

Networking: Developers can continue using their own browser and development tools to access their project, while the web application code itself and all its dependencies run isolated within the virtual machine.

    config.vm.forward_port 80, 8080

Teardown: Either suspend (save current state), halt (shut down), destroy.

# 3: Provisioning your Vagrant VM

Installing software on a booted software is known as provisioning, which is the job of shell scripts, configuration management systems, or manual command line entry.

Automated provisioning: Ease of use, repeatability, improving parity between development and production. Historically, without Vagrant, developers have a giant README file with various platform-specific steps to set up the machine for development.

I recommend starting with shell scripts. Chef: Either Chef Solo or Chef Client. Puppet: Puppet Agent or masterless via `puppet apply`.
