# Impressive Ruby Productivity with Vim -- Chris Hunt (LA Ruby Conf 2013)

Tmux is a server running on your machine, and clients connect to the server using sessions.

    $ tmux new -s la

Tmus Script (tmux.sh)

    tmux new-session -d -s my-app
    tmux new-window -t my-app:2 -n 'server' 'bundle exec rails server'
    tmux new-window -t my-app:3 -n 'vim' 'vi'
    tmux attach -t my-app

You can then run this (sh ./tmux.sh) and put that in iTerm2 (Preferences, Profiles, Command, Send text at start) so you pick up where you pick off ).

:Ag! MyAwesomeApp

Effing plugins:
surroung, tabular
