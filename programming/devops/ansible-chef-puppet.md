# What is difference between docker, puppet, chef and vagrant?
[Reference](https://www.quora.com/What-is-difference-between-docker-puppet-chef-and-vagrant)

- Puppet: For ops teams.
  - Abstracts specific concepts of the target machine and makes the configuration process more OS agnostic.
  - You can install a package or run a background service on startup independently.
- Chef: Mature/works at scale, Ruby.
  - Transforms your infrastructure into code. Config Management Software.
  - Define the state with diff parameters as your config files.
  - Pros: Modules/config recipes, code-driven approach, centered around Git, Knife tool.
  - Cons: Learning curve is steep if you're not familiar with Ruby. Not simple to learn. Doesn't support push functionality.
- Ansible: Simplest, written in Python.
- Docker:
  - A way to package code into consistent units of work, which can be deployed to testing, QA, and production environments with ease.
  - Because Docker needs to only express the config for a single process, the process becomes easier.
  - Artifact management: Docker Hub.
  - Should only contain the processes needed for the application.
- Vagrant:
  - Takes the entire description of your dev env and couches it in a Ruby file.
  - Spawns VMs.

# Why we use Terraform and not Chef, Puppet, Ansible, SaltStack, or CloudFormation
[Reference](https://blog.gruntwork.io/why-we-use-terraform-and-not-chef-puppet-ansible-saltstack-or-cloudformation-7989dad2865c)

- Configuration Management vs Orchestration
  - Configuration management: Designed to install and manage server on existing servers.
  - Orchestration tools: Designed to provision the servers themselves.
  - Docker/Packer: If you use these, then the majority of your configuration management needs are already taken care of.
- Mutable Infrastructure vs Immutable Infrastructure
  - CM such as Chef: It'll run the software update on your existing servers. Configuration drift: where each server becomes slightly different than all the others, leading to subtle configuration bugs.
  - Orchestration (such as Terraform): Every change is actually a deployment of a new server. Deploy an image across a set of totally new servers.
- Procedural vs Declarative
  - Chef: Procedural.
    - Problems: You need to know the order in which those templates were created.
    - Limited reusability because you always take into account the current state of the codebase.
  - Terraform/CloudFormation/SaltStack/Puppet: Declarative, specify the end state.
    - Problem: Since declarative/no full programming language, the expressive power is limited.
