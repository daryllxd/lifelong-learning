# Reader's note. I think Git's UI is a clusterfuck

## git

    $ g remote add origin https://darllxd@github.com/ueccssrnd/name-of-project.git
    $ g remote set-url origin git://new.url.here
    Check last 2 diffs: g log -p -2 
    

    Cancel last commit: git reset --soft HEAD~1. Then you can do a gre (git reset --hard HEAD && git clean -f) after. So this "cancels a commit".

#### You pushed a wrong commit message.

    $ git reset --soft head~
    $ git commit -m "new commit message"
    $ git push -f

#### Branches

> View remote

    $ git branch -r

> View all

    $ g branch -a

> Check last commit of each branch

    $ git branch -v

> Pull from remote the branch `fix_stuff`

    $ g checkout -b fix_stuff origin/fix_stuff

#### Deleting

    $ g branch -d local_branch_to_be_deleted
    
    # $ g push [REMOTE] :[NAME_OF_REMOTE_BRANCH]
    $ g push origin :facebook_integration

> Pull from remote but different branch

    $ g pull [remote_location] [remote_branch]
    $ g pull origin master

> Cloning from BB

    $ g clone https://daryllxd@bitbucket.org/icanpassaccounting/icpa.git icpa_redesign

## ALIASES-DESU for add + commit

    $ g config --global alias.add-commit '!g add -A && g commit'

## ALIASES-DESU for last

    $ g config --global alias.last ’log -1 HEAD’

## heroku

    $ heroku addons:add heroku-postgresql:dev
    $ heroku pg:promote HEROKU_POSTGRESQL_BROWN
    $ heroku apps:destroy app-to-be-destroyed

See more at: http://blog.tacticalnuclearstrike.com/2012/07/sinatra-on-heroku/#sthash.gVoDFq4u.dpuf

Revert to last commit: g reset --hard HEAD
Remove untracked shit: g clean -fd
