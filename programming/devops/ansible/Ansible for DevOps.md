# Chapter 1 - Getting Started with Ansible


Ansible was built (and continues to be improved) by developers and sysadmins who know the command line—and want to make a tool that helps them manage their servers exactly the same as they have in the past, but in a repeatable and centrally managed way.

Ansible works by pushing changes out to all your servers (by default), and requires no extra software

to be installed on your servers (thus no extra memory footprint, and no extra daemon to manage),

unlike most other configuration management tools.


## Creating a basic inventory file

```
$ sudo touch /etc/ansible/hosts

[example]
www.example.com
```
