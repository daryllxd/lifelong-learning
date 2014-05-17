# Tutsplus SSH for Newbs

SSH = secure shell, an easy way to connect to remote machines. Type `ssh daryll@172.16.115.134`. When prompted for a password, type it in.

Typical setup: Debian + Bash shell. `root` = highest user in Linux. Pound sign = root, $ = normal user.

A lot of commands need to be performed as root, use `sudo` for this.

C-R and type command to look for a command.

## File Manipulations

    $ pwd
    $ touch testfile
    $ ls
    $ mkdir TutsPlus
    $ mv testfile TutsPlus
    $ cat testfile to read text files
    $ echo Hello >> testfile # add the string 'Hello' to the testfile
    $ cp testfile testfile2
    $ rm testfile
    $ cp -R TutsPlus/ TutsPlus2/ # recursively copy the inside of the other folder
    $ rm -rf TutsPlus # remove recursively and remove the original folder

## Chmod

    $ sudo adduser tutsplus # It will prompt you for a password to the new user, and do shit. There are groups already.
    $ sudo mkdir /testgroupfolder
    $ touch /testgroupfolder/ # This is something that cannot be accessed by normal users, need to be root.

