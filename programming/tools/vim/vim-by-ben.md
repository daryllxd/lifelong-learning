# The Path to Mastery

1. Vim help. Highest ROI. It takes practice to parse it.
2. Keep a cheat sheet on your desk. Vim is a practice of accretion. It means you slowly add parts. Focus on just a few commands at a time. You don't build muscle memory until you do the command. WE DON'T WANT STUFF IN THE CHEAT SHEET, WE WANT THEM IN OUR BRAIN. Undo what you do and use the command and do it the right way.
3. Keep track of your annoyances. When you feel that you are doing something inefficient, capture those in a list. Ex: :Q to quit... few seconds of annoyance is subtracted. We want to stay in the zone and when you have to program in your head, you don't want to stop what you're dong.
4. Learn all the single letter commands. The most important commands are bound to the single letter keys.
5. Bind Esc to Caps Lock.

## The Vim Learning Curve is a Myth
[Link](http://robots.thoughtbot.com/the-vim-learning-curve-is-a-myth)

*You can learn to use vim in 30 minutes.* `vimtutor`, and after 30 minutes you can start grasping the ideas that make vim so amazing.

*Learning vim is fun because it's game-like.* _No one ever says "I'd love to learn Street Fighter 2, but there are just so many combos!"_ People don't say this because learning a game is enjoyable. You start off with just the basic kicks and punches, and those get you by. Later, you learn more advanced moves, maybe even by accident.

At first, everything is simple, but then you can chain your commands together. Over time, you burn advanced tricks into your muscle memory.

*You'll be faster than your old editor in two weeks.*

# Write Code Faster - Railsberry 2012

Vim is just a programming language for editing test.

People who don't get good at vim are people who aren't intolerant of typing and people who aren't intolerant of changing thingies.

Anti-pattern: Navigating between files. Use Cmd-P and Rails.vim. Motions and verbs and nouns.

Need to learn all the motions! Delete inside, delete around.

Macros: Are just keystrokes.

# Vim for Rails Developers

You need to know all the 1-key keystrokes. Use viemu. Most important vim plugin: `Rails.vim` by Tim Pope.

To make things work use :find application_ to automatically find stuff. here we find application_controller and we can tab to find other helpers, etc.

:gf to find shit when stuff is highlighted. ex: gf on `posts` in `has many posts` to move to the post model itself. Then you can navigaate around using C-o. gf understand controllers and partials. Even things such as a named route path will make you go there. 

We usually want to jump between related files within your files. Model + unit test. I can us the :Runittest, :Rmodel, :Rcontroller, :Rfunctionaltest.

So I want to split the window. We want a vertical split between the model and the test. I type :RVunittest to split them in 2 side by side, or:RSunittest to split them in 2 top bottom.

To see the unit test, do RTunittest.

:Rake to execute the unit tests. It is aware of different shit anyway.

:Rgenerate migration etc.

Snipmate

Exuberant CTags. Vim uses this to figure out where something is defined.

$ ctags -R --exclude=.git --exclude=log * #index everything, ignore git and log. Then add the shit to the gititnore. 

vimrc, do `set tags=./tags;` to know that the tags are in the current directory.

C-] to trigger the source of things. You can put rails in `vendor/rails` to source-dive Rails immedi]tely.

:tag `named_scope` to bring you to the method definition.
:tag /`validates_presence` * # you can put in a regular expression.

## Using Ack

- ack has replaced grep.  ack --ruby controller to look for all controller things in .rb.

You can have a .ackrc file to append the thingie.

set grepprg=ack from inside vim.  :cn and :cp to go to next and prev results. So he bound C-n and C-p to search shit. 

ct" to delete everything inside a "" surrounder. we can just do ci" to `change inside ""`.

da" to delete AROUND double quotes. we delete the `""` too. we can do daw to delete around the word.

gi tells vim to go back to THE LAST TIME YOU WERE IN INSERT MODE and put you in insert mode again. so you can do gg to go to the top and then do gi to somehere so you can type shit again.

Case switching
~ to change per word
g~w to change casing of next word.



