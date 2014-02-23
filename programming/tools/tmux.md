## Tmux: A Simple Start
[Link](http://www.sitepoint.com/tmux-a-simple-start/)

tmux is a terminal multiplexer. What is a terminal multiplexer? It lets you switch easily between several programs in one terminal, detach them (they keep running in the background) and reattach them to a different terminal. And do a lot more.

    $ brew install tmux
    $ tmux

Status line: Date, time, host, what "windows" are open, and the name of the session ("0").

A tmux session is a container for windows and panes. A window contains one or more panes.

    $ cd APP_ROOT
    $ tmux                      # This will be the edit window for the session

#### Sessions
    
    $ tmux attach -t NAME       # Attach session with session name
    $ tmux kill-session -t 0    # Kill lol
    Ctrl+B d                    # Detach session

#### Panes

    Ctrl+B %                    # Horizontal split.
    Ctrl+B "                    # Vertical split.
    Ctrl+B Up, Down...          # Navigate panes.
    Ctrl+B o                    # Swap panes.
    Ctrl+B x                    # Kill pane.
    Ctrl+B z                    # Toggle pane into full screen.
    Ctrl+B q                    # Show pane numbers
    
#### Windows

    Ctrl+B c                    # Open a new window.
    Ctrl+B 0,1                  # Jump windows.