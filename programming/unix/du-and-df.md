## How to remember the difference between du and df?
[Reference](https://unix.stackexchange.com/questions/41863/how-to-remember-the-difference-between-du-and-df)

- `du`: Disk usage. It may not output exact information due to the possibility of unreadable files, hard links, and think how much disk space is being used by these files.
- `df`: Disk free. Looks at disk used blocks in file system metadata.
