Cloning from BB

	$ git clone https://daryllxd@bitbucket.org/icanpassaccounting/icpa.git icpa_redesign

Where am I?

	$ git branch (local)
	$ git branch -a (remote)
	$ git checkout [branch_to_checkout]

Revert back
	
	$ git log # Check mo kung nasaan ka
	$ git checkout 1234567 #

Pull from remote but different branch

	$ git pull [remote_location] [remote_branch]
	$ git pull origin master

Alias for add + commit

	$ git config --global alias.add-commit '!git add -A && git commit'
