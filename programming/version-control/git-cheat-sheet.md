## git

To git out of the vim thing (huehue): "q" 

    $ git remote add origin https://daryllxd@github.com/ueccssrnd/name-of-project.git
    $ git remote set-url origin git://new.url.here
    Check last 2 commits: git log -2
    Check last 2 diffs: git log -p -2
    Revert to last commit: git reset --hard HEAD
    Remove untracked shit: git clean -fd

> Cloning from BB

    $ git clone https://daryllxd@bitbucket.org/icanpassaccounting/icpa.git icpa_redesign

#### Branches

> View local
    $ git branch 

> View remote

    $ git branch -r

> View all

    $ gir branch -a

> Check last commit of each branch

    $ git branch -v

#### Deleting

    $ git branch -d local_branch_to_be_deleted
    
    # $ git push [REMOTE] :[NAME_OF_REMOTE_BRANCH]
    $ git push origin :facebook_integration

> Pull from remote but different branch

    $ git pull [remote_location] [remote_branch]
    $ git pull origin master

> Cloning from BB

    $ git clone https://daryllxd@bitbucket.org/icanpassaccounting/icpa.git icpa_redesign

## ALIASES-DESU for add + commit

    $ git config --global alias.add-commit '!git add -A && git commit'

## ALIASES-DESU for last

    $ git config --global alias.last ’log -1 HEAD’

## heroku

    $ heroku addons:add heroku-postgresql:dev
    $ heroku pg:promote HEROKU_POSTGRESQL_BROWN
    $ heroku apps:destroy app-to-be-destroyed

See more at: http://blog.tacticalnuclearstrike.com/2012/07/sinatra-on-heroku/#sthash.gVoDFq4u.dpuf