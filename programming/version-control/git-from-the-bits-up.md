# Git From the Bits Up
[link](https://www.youtube.com/watch?v=MYP56QJpDr4)

When developers start to see the details of Git under the covers, things begin to click.

Proper way to create a Git repo and

Normal person way:

    $ git init jax
    Initialized empty Git repository in ...

It creates the hidden `.git` folder. Say we add a file:

    $ vim beowulf.txt # edit the file
    $ git add beowulf.txt
    $ git status
    $ git commmit -m "Initial commit"

In the `.git`, we have something new.

The non-mainstream way;

    $ mkdir jax && cd jax
    $ mkdir .git # Instead of git init. The .git directory is not enough to make it a Git repository.

A Git repository is a collection of objects and a system for naming those objects. The system for naming objects in Git, we call those `refs`. To be a Git repository, we need objects and we need refs. Lots of other stuff, we might have--we might have configuration, we might need hooks, but we don't need that right now.

    $ mkdir .git/objects
    $ mkdir .git/refs
    $ mkdir .git/refs/heads

There is a syntax that is underneath here, it is the `refspec` syntax (which is super complicated). Refs are a generalized namespace. The particular ref that we need are what we call `heads` and what normal people call `branches`. This is still not a Git repository.

Now I need to create a file, and I need to use `git hash-object`. This

    $ while :
      > do
      > clear
      > tree .git
      > sleep 1

## Rebasing

Consistently show the Git branch:

    while :
    do
        clear
        git --no-pager log --graph --pretty=oneline --abbrev-commit --decorate --all $*
        sleep 1
    done

    $ git branch new_branch HEAD^ # Branch from one commit prior to the head
    $ git branch new_branch HEAD~5 # Branch 5 commits back

    $ git rebase

"I wish I would just branch from master right now. I still want to merge, but I will rebase first.

    $ git reset --hard          # I want to go back to where I was prior to the merge. BTW this removes uncommited files!!!
    $ git reflog                # Check the reflog. This isn't just a list of commits, this is the graph. It is the list of the changes that I've made to the commit logs. This is so powerful because I
    $ git reset --hard HEAD@{1} # I move back literally to the point before the feature. I want this to be pulled up!
    $ git rebase master         # Puts it back to the front
    $ git checkout master
    $ git merge feature

Make 10 random changes.

The problem of the super many commits is that you want commits that are cohesive, and you want them to be decoupled/make them look like a story per commit. We don't want commits that are "by the way, there was a misspelling here". `cherry-pick` and `revert` will get destroyed.

To fix the 10 commits, do this:

    $ git rebase -i HEAD~10

Using interactive rebase, we can change history, AS LONG AS YOU DON'T PUSH.

