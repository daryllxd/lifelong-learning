
## Tmux: A Crash Course

**tmux is aliased to t**

Prefix: C-a, C-q

#### Commandz

    tmux list-keys                  # list keys lol
    tmux list-commands              # list every 
    tmux info                       # list every sesson, window, pane, pid
    tmux source-file ~/.tmux.conf   # reload conf (aliased to prefix C-f)

#### My Bindings: Check out `dotfiles/tmux.conf`.




## Tmux: A Simple Start
[Link](http://www.sitepoint.com/tmux-a-simple-start/)

tmux is a terminal multiplexer. What is a terminal multiplexer? It lets you switch easily between several programs in one terminal, detach them (they keep running in the background) and reattach them to a different terminal. And do a lot more.

    $ brew install tmux
    $ tmux

Status line: Date, time, host, what "windows" are open, and the name of the session ("0").

A tmux session is a container for windows and panes. A window contains one or more panes.

    $ cd APP_ROOT
    $ tmux                      # This will be the edit window for the session

Prefix: `C-A`

    r                           # Reload tmux.conf

#### Scrolling
    
    [                           # Enter scroll mode
    Shift-Page Up               # Scroll up

#### Sessions

    $ tmux new -s session_name  # Create session    
    $ tmux attach -t NAME       # Attach session with session name
    $ tmux kill-session -t 0    # Kill lol
    d                            # Detach session

#### Panes. 

    %                           # Horizontal split.
    "                           # Vertical split.
    Up, Down...                 # Navigate panes.
    o                           # Swap panes.
    x                           # Kill pane.
    z                           # Toggle pane into full screen.
    q                           # Show pane numbers
    {                           # Move pane left
    }                           # Move pane right
    
#### Windows

    c                           # Open a new window.
    0,1                         # Jump windows.
    ,                           # Renaming windows

## Humans Present: tmux

tmux over screen: Panes + scriptability. tmuxinator is a popular plugin that automates all the cycles up on it.

Copy and paste in OS X is horrible.
