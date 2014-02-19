## Stuff I want to remember

	Studying a command: $ man grep

	I know what the command does but I don't know what it was $ apropos search

	# Find all text files, save to aw.txt, and open in Sublime
	$ find . -name  "*.txt"  > aw.txt | subl

	# cat will read whatever you type and write it to that file. exit via ct-d.
	$  cat > somefile.txt

	# search directory+subdirectories for your string
	$ grep -r yourString* .

## Grep uses

	$ grep -i				# case insensitive
	$ grep "REGEX" file		# match regex
	$ grep -w				# must be full string as opposed to substring
	$ grep -c				# count the number of matches
	$ grep -l				# Display only the file names which matches the given pattern

## The Basic Shit

	$ c - 					# go back to old directory
	$ pwd 					# print working directory
	$ hostname 				# my computer's network name
	$ mkdir					# make directory
	$ rmdir					# remove directory (rm -rf na lang baby)
	$ pushd					# push directory
	$ popd					# pop directory
	$ cp 					# copy a file or directory
	$ mv 					# move
	$ xargs 				# execute arguments
	$ find					# find files
	$ env					# look at your environment
	$ echo 					# print some arguments
	$ export 				# export/set a new env variable
	$ exit 					# exit the shell
	$ sudo					# become super root
	$ chmod					# change permission modifiers
	$ chown 				# change ownership

####`ls`

	-A 						# lists all files
	-a						# list hidden files
	-f						# no file sorting
	-G						# colorized output
	-h						# readable file sizes kb, mb, gb
	-l 						# force to be one line
	-r						# reversed order
	-R 						# recursive, will list content of subtrees
	-S						# sort by filesize
	-t 						# sort by last modified
	-u						# sort by last accessed
	$ ls a*					# list all files that start with a
	$ ls *.zip				# list all zip files

####`rmdir`

	$ rm -rf *				# remove everything in the directory
	-f						# force remove
	-i						# interactive, you prompt before you remove each file.
	-r						# remove recursively

####Moving around (`pushd`, `popd`)

The pushd command takes your current directory and "pushes" it into a list for later, then it changes to another directory. It's like saying, "Save where I am, then go here."

The popd command takes the last directory you pushed and "pops" it off, taking you back there.

Finally, on Unix pushd, if you run it by itself with no arguments, will switch between your current directory and the last one you pushed. It's an easy way to switch between two directories.

####`touch`

	$ touch hi ho hum		# create multiple files
	$ touch -t YYMMDDHHMM.SS tecmint # create file with specified time. 
	-a						# change access time of file
	-c 						# do not create new file
	-m						# change modification time of file

#### Copy a file (`cp`): cp -flags filename destination

	$ cp a.txt b.txt		# basic syntax
	$ cp a.txt dir/			# copy to directory
	$ cp *.txt ..dir/		# copy all txt files to back dir
							# need slash at end to make sure it is dir
	-a						# preserve attribute of files
	-f						# force
	-i						# add prompt to ask if overwrite or not
	-n						# do not overwrite existing file
	-p						# preserve attributes
	-r						# recursive copy

#### Viewing/Streaming a File

	$ less FILE.txt
	$ more FILE.txt 		# (do the math bitches)
	$ cat FILE.txt 			# Stream (view the file in the buffer)

#### Pipes and Shit

	$ | $					# Takes the output from the command on the left and pipees it to the command on the right.
	$ < $					# Take and send the input from the file on the right to the program on the left.
	$ > $					# The > takes the output of the command on the left, and writes it to the file on the right.
	$ >> $					# Takes the output from the command on the left and appends it to the file on the right.


sed 's/@import "/@import "bootstrap\//' _bootstrap.css.scss > _bootstrap-custom.css.scss