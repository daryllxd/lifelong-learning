## set -ex - The most useful bash trick of the year
[Reference](https://www.peterbe.com/plog/set-ex)

``` shell
set -ex
```

- Exit as soon as any line in the bash script fails.
- The naive solution is to "and" them.

``` shell
git pull origin master && find . | grep '\.pyc$' | xargs rm && ./restart_server.sh

pgrep -x ruby > /dev/null => pgrep to see if a process is running
                          => /dev/null what is that again?
if [ $? -eq 0 ]; then     => this is how loops are in bash
  killall -9 ruby         => the $? variable is "the exit code of the last command.
fi
```

Comments

- `set -e` is good for debugging, but once a script is working as expected, you'll want to remove `set -e` in most cases and catch failures within the script to take appropriate action.
- The appropriate solution to "exit if the git command fails" is `git pull origin master || exit`. If git returns a non-zero exist status, the script will exit with the very same status. It's far more obvious what will happen from reading the script, rather than contend with the side-effects of enabling `set -e`.
- `set -u`: Treats unset variables as an error and exit immediately.
