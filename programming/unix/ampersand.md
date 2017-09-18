## What does ampersand mean at the end of a shell script line?
[Reference](https://unix.stackexchange.com/questions/86247/what-does-ampersand-mean-at-the-end-of-a-shell-script-line)

- `sh sys-snap.sh &`: If the script starts with a shebang (`#!`)
- With `&`, the process starts in the background, so you can use the shell and do not have to wait until the scrip it finished. If you forget it, you can stop the current running process with `Ctrl+Z` and continue it in the background with `bg` or `fg`.
- `sh --version` to figure out what shell is being used.
