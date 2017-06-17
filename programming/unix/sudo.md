## su VS sudo su VS sudo -u -i
[Reference](http://johnkpaul.tumblr.com/post/19841381351/su-vs-sudo-su-vs-sudo-u-i)

- `su otheruser`: Change your user id and start a shell as another user.
- `sudo su otheruser`: Run `su` as root.
- `sudo -u otheruer -i`: If you want to simulate precisely the initial logged in state of another user. No use yet.

## Using sudo
[Reference](http://aplawrence.com/Basics/sudo.html)

- The configuration of sudo is by the `etc/sudoers` file.
- `---s--x--x    1 root   root   81644 Jan 14 15:36 /usr/bin/sudo`
- You and everyone else have execute permission on this, so you can run it, and your effective user id becomes root, so you can remove any file from the system, etc.
- `visudo` to edit the sudoers file. The difference between adding someone as a sudoer and just giving them the password is that sudo commands can be logged, and we can turn sudo capability on or off for this specific user.
- To add logging to sudo: `visudo`, then add this: `Defaults logfile=/var/log/sudolog/`.
- `sudo -V` gets the version, but `sudo sudo -V` shows sudo's settings.
- You can also make sudoers be limited to certain commands.
