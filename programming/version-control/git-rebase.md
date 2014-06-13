# A Rebase Workflow for Git
[link](http://randyfay.com/content/rebase-workflow-git)

Merge workflow: `git commit, git pull, git push`.

The problem with the merge workflow:

- It has the potential disaster, because every merge and merge commit has to be handled correctly by every committer.
- History become a mess. It has all kinds of inexplicable merge commits and the history (`gitk`) becomes useless.

## Rebasing?

- A branch is a separate line of work.
- A public branch is one that more than one person pulls from.
- A topical branch is a private branch that you alone are using.
- A tracking branch is a local branch that knows where its remote is (???).

*The fundamental idea of rebasing is that you make sure that your commits go on top of the public branch, that you rebase them so that instead of being related to some commit way back when you started working on this feature, they get reworked a little so they go on top of what's there now.*

Don't do work on the public branch. Work on a topical or feature branch, as if it were a single patch you were applying.

    $ git checkout origin master
    $ git pull
    $ git checkout -b my_feature
    $ git fetch origin
    $ git rebase origin/master
    $ git checkout master
    $ git rebase my_feature
    $ git push

*The fundamental idea is that I as a developer am taking responsiblity to make sure that my work goes right in on top of everybody else's work. And it "fits" there--that it doesn't requrie any magic or merge commits.*

Since we are using rebase, we only plop out commits right on top, and then push. It does not change the public history.
