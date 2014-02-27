
# Prying a file

    $ pry
    > load "./file.rb" # Inside the file, you need to have: 
    
    def a
        [1, 2, 3, 4, 5]
    end

    so you can access the vars
    > a #=> [1, 2, 3, 4, 5]


## [Rubyists, It’s Time to PRY Yourself Off IRB!](http://www.sitepoint.com/rubyists-time-pry-irb/)

Installation

	$ gem install pry pry-doc
	$ pry -v
	pry(main)>

Show documentation

	pry(main)> show-doc Array#map

Cd into an object
	
	pry(main)> cd arr
	pry(#<Array>)>
	pry(#<Array>)>ls #list all methods
	pry(#<Array>)>ls -h
	pry(#<Array>)>show-source map! #Show implementation of underlying code.

Able to see shit via the `binding.pry` method. But you have to define the editor first. So you can `edit` the method.

	pry(#<Order>) edit total

Stack trace: `wtf?` Longer stack trace: `wtf??`

List variables

### Learning about your context with the ls command

**Note:** This command has been significantly updated since Pry version 0.9.7. Some of the options below may work differently if you are using an earlier version; it is recommended you upgrade.

The `ls` command is essentially a unified wrapper to a number of Ruby's introspection mechanisms, including (but not limited to) the following methods: `methods`, `instance_variables`, `constants`, `local_variables`, `instance_methods`, `class_variables` and all the various permutations thereof.

By default typing `ls` shows you the local variables defined in the current context, and any public methods or instance variables defined on the current object.

Usage: 

```
    ls [-m|-M|-p|-pM] [-q|-v] [-c|-i] [Object]
    ls [-g] [-l]

options:

    -m, --methods        Show public methods defined on the Object (default)
    -M, --module         Show methods defined in a Module or Class
    -p, --ppp            Show public, protected (in yellow) and private (in green) methods
    -q, --quiet          Show only methods defined on object.singleton_class and object.class
    -v, --verbose        Show methods and constants on all super-classes (ignores Pry.config.ls.ceiling)
    -g, --globals        Show global variables, including those builtin to Ruby (in cyan)
    -l, --locals         Show locals, including those provided by Pry (in red)
    -c, --constants      Show constants, highlighting classes (in blue), and exceptions (in purple)
    -i, --ivars          Show instance variables (in blue) and class variables (in bright blue)
    -G, --grep           Filter output by regular expression
    -h, --help           Show help

## Rails Conf 2013 Pry-- The Good Parts! by Conrad Irwin

Devs spend 60% of the time is spent debugging.

Pry's variable on last output: `_`.
