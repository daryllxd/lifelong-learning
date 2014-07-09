# Unix Fundamentals 101

## File Systems

Filesystem: A map of addresses to where data is located on your drive. Unix: EXT3.

Disks in Linux are named `/dev/sda`, `/dev/sda`, `/dev/sdb`, etc. In a VM, it's `/dev/xvda`, `/dev/xvdb`. Last letter = physical drive in your computer.

    $ find ~/rails_projects/lifelong-learning to find shit.
    $ parted /dev/sda to modify and create disk partitions and disk labels.
    $ mkfs to make a file system. On Linux system ext4 is a good general purpose choice.
    $ fdisk is another tool to view and modify partitions on disk.

Mounting a filesystem is the act of placing the root of one filesystem on a directory, or mount point, of a currently mounted filesystem.

## Shell

A Unix shell is the command-line interface between the user and the system.

Command-line Editing Modes

    <C-b>: Move backward one character
    <C-f>: Move forward one character
    <C-a>: Move to beginning of line # Doesn't work with my tmux setup
    <C-e>: Move to the end of the line
    <C-k>: Delete from cursor forward
    <C-u>: Delete from cursor backward
    <C-r>: Search the command history
    $ set -o vi

- `$PATH`: Defines the set of directories that the shell can search to find a command.
- `env`: Show all of the shell's environment variables.
- Shell profiles: Global (`/etc/profile`), user (`~/.bash_profile`)
- `ps`: Check process ID.
- `!!`: Execute the last command.

## Jobs

    $ sleep 30 & # Execute a job
    $ jobs       # To see the current jobs bein run
    $ fg         # To bring all the jobs to the foreground. Once they are there, the jobs can be suspended with <C-z>
    $ bg         # Move the job to the background.

Multiple jobs:

    $ sleep 120 &
    $ sleep 240 &
    $ jobs        # List both
    $ fg %1       # Move the first job to the foreground
    $ bg %2       # Move the second job to the background

## Package management

Windows: Windows Installer. Linux: APT (used by Debian/Ubuntu), RPM (used by RedHat, CentOS, Fedora, SuSe).

### RPM and yum

    $ yum search dstat
    $ yum install dstat # Installs dstat
    $ yum upgrade # Upgrade all packages that have newer versions available
    $ yum remove dstat # Uninstall
    $ yum clean all # Force yum to refresh package metadata from its sources

### dpkg and APT

    $ apt-cache search dstat # Search for packages
    $ apt-get install dstat # Install dstat
    $ dpkg -i dstat_0.7.2-3_all.deb # Install the package directly
    $ apt-get install dstat # To upgrade a package, ask apt to install it again. Same with dpkg and installing directly.
    $ apt-get remove dstat # Uninstall a package
    $ dpkg -r dstat # Uninstall a package
    $ apt-get purge dstat # Removing a package still leaves behind any configuration files, in case you wish to reinstall the package again later. purge to fully delete packages/configuration files.
    $ apt-get --purge remove dstat
    $ dpkg -P dstat

## Shell tools

    $ ps (process status)           # Shows running processes
    $ ps aux                        # Shows the processes from a user standpoint
    $ ps -lfU <username>            # To see the processes owned by username
    $ top                           # Show the most CPU intensive processes, press m while running to sort by memory use.
    $ df                            # Looks at your mounted filesystems and reports on their use.
    $ du                            # Estimates the size on disk of a file or files.
    $ find .                        # Finds files recursively
    $ find . -name "y*"             # Finds all files starting with y
    $ kill 123                      # Kill process ID.
    $ kill -KILL 123 or kill -9 123 # Do not give the process a chance to gracefully shut down. Just kill it immediately.
    $ lsof                          # Lists open files
    $ lsof -i                       # Examines what network activity is going on.
    $ mount                         # Mount filesystems.

## Extracting and manipulating data

    $ cat # Outputs the contents of a file either to the shell, another file that already exists, or a file that does not yet exist.
    $  cat hello.md yolo.md > combined.md # Cat combines the two and creates the combined.md file. cat will also overwrite the contents of the receiving file.

    John Doe|25|john@example.com
    Jack Smith|26|jack@example.com
    Jane Doe|24|jane@example.com

    $ cut -f1 -d'|' students.txt # "Cut out" the first field, using the delimiter |. We get John Doe, Jack Smith, Jane Doe

## awk

    $ ps -ef | awk '{print $1, $4}'          # Print stuff from the ps -ef command but only get the first and the 4th columns of the file.
    $ awk -F ' - ' '{print $1}' students.txt # Use ' - ' as a delimiter

## Crontab

`cron` enables users to schedule jobs to run periodically at certain times or dates. It is commonly used to automate system maintenance or administration. `cron` allows you to run routine jobs on a Unix-based system automatically at a specific future time or at regular intervals rather than running such jobs manually.
