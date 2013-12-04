## 1.1 – Getting Started - About Version Control

VC is a system that records changes to a file or set of files over time so that you can recall specific versions later. So you can have multiple versions of a file.

Local VCS(system): Copy files into another directory.

Centralized VCS: CVS, Subversion, Perforce. Central server that contains all versioned files, and a number of clients that check out files from that central place.

Distributed VCS: Every client that uses a file mirrors the repository.

## 1.3 – Getting Started: Git Basics

Git stores references of the files; if they haven't changed, then its just stores a link to the previous identical file.

You have a local version of the stuff you have, without connecting to the remote.

#### Three States
- __Committed:__ Data is safely stored in the local database
- __Modified:__ Have changed the file but not yet committed to the database
- __Staged:__ Marked a modified file in its current version to go into your next commit snapshot.
 
#### Git project
- `Git` directory: where Git stores the metadata and object database for your project.
- Working directory: A single checkout of one version of the project. 
- Staging area: A simple file which contains info on what will go into your next commit.
 
#### Workflow
- Modify files in your working directory.
- Stage the files, adding snapshots of them to the staging area.
- You do a commit, which takes the files as they are in the staging area and stores that snapshot permanently to your Git directory.

## 2.1 – Getting a Git Repository

Navitage to directory
	
	git init
	git add (whatever you want) *.docx
	git add README
	git commit -m "initial project version"
	//git add adds to staging phase (and not commit phase). You have to commit them if you want the change to be reflected.
	Cloning
	git clone git://github.com/shacon/grit.git

Creates a directory named grit, initializes a .git directory inside it, pulls down all the data for that rep, and checks out a working copy of the latest version.

	git clone git://github.com/shacon/grit.git mygrit

Folder's name is mygrit.

## 2.2 – Recording Changes to the Repository

Each file in your working directory can either be tracked or untracked. Untracked: not seen by git.

Tracked files are files that were in the last snapshot; they can be unmodified, modified, or staged.

	git status # This would show which files are which and which aren't committed yet.

	git reset FILE # Cancels the files you would add before you commit them.

If you stage a file then modify it, then it will be both staged and unstaged. The staged version is the version of the file that you added. The unstaged version is the newest one.

Ignoring files:  `.gitignore`

	git diff # You will be able to see what you changed and not just which files were changed using this. "Changed but not yet staged".
	git diff --cached or git diff --staged # See "staged but not yet committed"
	git commit # Tries to push the commit using the default compiler
	git commit -m # You specify the change inline.
	git commit -am "Hello" # Everything inside the directory that was changed will be added and committed.
	git rm *.txt # This is removing the file from the working directory.

Although Git doesn't track file movement, Git figures things out when you rename or move files.

## 2.3 – Viewing the Commit History

	git log # Shows the commits
	git log -p -2 # Shows the last 2 commits
	git log --stat # Prints a list of modified files, how many files were changed, and how many lines in those files were added and removed
	git log --pretty=[oneline|short|full|fuller] # Changes to formats other than the default
	git log --since=2.[weeks|hours|minutes]

Time description

	Option  			Description
	-(n)    			Show only the last n commits
	--since, --after    Limit the commits to those made after the specified date.
	--until, --before   Limit the commits to those made before the specified date.
	--author    		Only show commits in which the author entry matches the specified string.
	--committer 		Only show commits in which the committer entry matches the specified string.