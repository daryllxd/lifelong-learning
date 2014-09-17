# Never Use a Warning When You Mean Undo
[link](http://alistapart.com/article/neveruseawarning)

Because software should “know” that we form habits. Software should know that after clicking “Okay” countless times in response to the question, we’ll probably click “Okay” this time too, even if we don't mean to. Software should know that we won't have a chance to think before accidentally throwing our work away.

Make the warning harder to ignore? It won't work. The more in-your-face the warning is, the faster we'll want to get away from it by clicking "Okay" and the more mistakes we'll make. No matter how fully in-your-face the computer presents the warning, we'll make the same mistake--clicking "Okay" when we don't mean to.

Having a character type the name before deleting it? Won't work. It is remarkably annoying, and it is always slower and more work-intensive than a standard warning. This works in Guild wars because deleting a character is an infrequent action.

With a robust undo, we can close our work and be secure in the knowledge that we can always get it back. We can make the horrible "oops" feeling go way by getting our work back.

*Never use a warning when you mean undo.* When we make a mistake, it isn't very costly because we can undo it. With undo, we spend less time worrying and more time doing work.

Gmail: After you delete a message, it just sits in the trash so you can retrieve it if you decide you really don't want to delete it yet.

Conclusion: *Warnings cause us to lose our work, to mistrust our computers, and to blame ourselves. A simple but foolproof design methodology solves the problem: “Never use a warning when you mean undo.” And when a user is deleting their work, you always mean undo.*

## Comments:

- The problem with undo is that it is not always practical. To undo you have to have a place to store the item while making it appear gone most of the time. Then you also have to have a way of restoring it. And you have to have a way of “emptying the trash”.
- It's all good and well to present Google as an example of the “right way” of doing things, but for most projects, there really isn't an infinite well of database storage to collect every single action the user might perform in a “history”.
- Instead of asking “Do you want to quit” perhaps we should ask “Would you like to Save before you quit?” and then label the buttons “Save” and “Don't Save”. This way the user can't just press OK or Yes by habit. At least for me it's harder to accidentally press “Don't save” than “Yes”.
- Undoing edits or updates would be hugely useful in more web applications. In the same way that Wikis maintain file change histories for their entries, web apps should be able to maintain histories for text objects (blog posts, comments, etc.) Even maintaining changes to other objects (for instance edits to a video) would be possible. Multi-user does make this tougher, but again, Wikis and version control systems prove that it can be done. “We don't have storage space for keeping infinite change history” is a straw man argument: text doesn't take up much space and it's reasonable to limit the number of undos in other cases.
