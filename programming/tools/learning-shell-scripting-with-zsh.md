# Learning Shell Scripting

# 2: Alias and History

    $ unalias <aliasname>
    alias -g L='|less' # Global alias, now oyu can append the less pager by adding the L suffix.

Expansion

    $ foo=hello
    $ echo "${foo}, world"
    > hello, world

History

    $ history
    $ !! # Runs the recent stuff
    $ "do something"
    $ sudo !!
    $ !ssh # Execute your last SSH command.

# 3: Advanced Editing

The zsh line editor (ZLE) allows you to define your own key bindings and set of custom keymaps (collections of key bindngs) in addition to extending predefined entries.

# 4: Globbing

This is the process that allows the shell to read a pattern and generate a series of filenames. Remember that filename substitution happens in the shell right before the line you typed is sent to the command.

    $ echo *
    $ echo *.md
    $ echo .*zsh*
    $ echo *.??
    $ echo [ML]*        # Everything starting the M or L.
    $ echo *.log_[1-9]
    $ echo [[:alpha:]]*
    $ echo *.[^o]       # Deny o

