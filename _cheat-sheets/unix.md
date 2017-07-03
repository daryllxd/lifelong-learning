``` shell
# Find a file:
find .* | ag "Cool"

# Find and replace with sed
find . -type f -exec gsed -i '' -e 's/STARTED/ACTIVE/g' {} +

# Get outputs from lines 2-5 (array indexed)
ls -l | sed -n 2,5p | xargs

set -ex
```

