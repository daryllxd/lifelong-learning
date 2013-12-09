## git

To get out of the thing: "q"

	$ git remote add origin https://daryllxd@github.com/ueccssrnd/name-of-project.git
	$ git remote set-url origin git://new.url.here
	Check last 2 commits: git log -2
	Check last 2 diffs: git log -p -2
	Revert to last commit: git reset --hard HEAD

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

## heroku

	heroku addons:add heroku-postgresql:dev
	heroku pg:promote HEROKU_POSTGRESQL_BROWN
	heroku apps:destroy app-to-be-destroyed

See more at: http://blog.tacticalnuclearstrike.com/2012/07/sinatra-on-heroku/#sthash.gVoDFq4u.dpuf