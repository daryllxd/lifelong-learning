``` shell
# Find a file:
find .* | ag "Cool"

# Find and replace with sed
find . -type f -exec gsed -i '' -e 's/STARTED/ACTIVE/g' {} +

# Get outputs from lines 2-5 (array indexed)
ls -l | sed -n 2,5p | xargs

set -ex

Symlinks
ln -s $PWD/bin/p /usr/local/bin # Creates a symlink from the bin PATH to the p found in the bin directory of the current directory

zsh cd directories  [Reference](https://robots.thoughtbot.com/cding-to-frequently-used-directories-in-zsh)
cdpath=($HOME/thoughtbot $HOME/src)
```

