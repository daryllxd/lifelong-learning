# Writing Reviewable Code
[link](https://secure.phabricator.com/book/phabflavor/article/writing_reviewable_code/)

- Each commit should be as small as possible, but no smaller.
- The smallest a commit can be is a single cohesive idea: don't make commits so small that they are meaningless on their own.
- There should be a one-to-one mapping between ideas and commits: each commit should build one idea, and each idea should be implemented by one commit.
- Turn large commits into small commits by dividing large problems into smaller ones and solving the small problems one at a time.

If you're developing a feature and run into a preexisting bug, stash/checkpoint your change, check out a clean HEAD/tip, fix the bug in one change, and then merge/rebase your new feature on top of your bug fix so you have two changes:

"Add feature x" + "Fix bug in y" > "Add features x and fix a bug in y"

## Sensible Commit Messages

*Commit messages should explain why you are making the change.*

- Have a title, describing the change in one line.
- Have a summary, describing the change in more detail.
- Maybe have some other fields.

> Bad:

    Allow dots in usernames

    Change the regexps so usernames can have dots in them.

> Good:

    Allow dots in usernames to support Google and LDAP auth

    To prevent nonsense, usernames are currently restricted to A-Z0-9. Now that
    we have Google and LDAP auth, a couple of installs want to allow "." too
    since they have schemes like "abraham.lincoln@mycompany.com" (see Tnnn). There
    are no technical reasons not to do this, so I opened up the regexps a bit.

    We could mostly open this up more but I figured I'd wait until someone asks
    before allowing "ke$ha", etc., because I personally find such names
    distasteful and offensive.

Some guidelines which are organization dependent:

- If/where text is wrapped
- Maximum length of the title
- Whether there should be a period or not in the title
- Use of voice/tense ("fix" vs "fixes")

