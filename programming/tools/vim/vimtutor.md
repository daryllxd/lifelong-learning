I'm doing this from Vim!
:set syntax=markdown

File management
:new or :vnew  to open a new window
:new `FILE_NAME` (has to include the directory).

Splitting the window.
:split "heeehe  "
:vertical-split

:set splitbelow
:set splitright
C-w = - to make the 2 panes equal

To search: / then press enter after the search is executed.
Backward search: ?
After a search, type n to find the next occurence in the same direction or N to search in the opposite direction.
Find and replace through whole file: :%s/REPLACEE/REPLACER/g (add c to have a prompt)
:noh to remove highlight
Replace by itself: R then just keep on typing

To go backwords (cursor) , C-o. Forwards, C-i.

% -> Go to the opposite side of a parenthesis.

d: delete or something like cut. p to "put" or paste  this.
y: yank or "copy".

nG – jump to line n
Cursor movezz
L – jump to the bottom of the screen (“low”)
H – jump to the top of the screen (“high”)
M – jump to the middle of the screen (“middle”)

Screen centering movez
zt – move this line to the top of the screen (“top”)
zb – move this line to the bottom of the screen (“bottom”)
zz – move this line to the middle of the screen (“ziddle?”)

b – go to the previous (before) word.
B – go to the previous (before) WORD.
ge - end of PREVIOUS word.
) - next sentence.
} - next paragraph.

indent: v to visual, motion to higlight, = to indent, >>.

. - repeat command

.... C-N in insert mode: Autocomplete bitches

/ -> pattern matching
* - lookf for the next occurence of the word
% - find matching braces
gd - jumo from the user of a vairable to its local declaration.
0D - delete all text from the line
^D - delete all text starting from the first non-blank character.

find and replace:
:%s/\s\+$//

: - command
% - apply to entire file
s - substitute
/\s\+$/ - regex for "all whitespace, till the end of file"
// - regex for "empty string"

Macros - to define, q, then a. the nrecord, then to exit, q. then you have @a as the "saved macro". 

m - mark.
` - move to mark with a.
' - move to mark with a.

`p`: Put the previously delected text after the cursor. Use in conjunction with `dd` to paste the preivous line.

`ce`: Delete until end of word and put you in insert mode.

- `p` to put ghe deleted text AFTER the cursor
- To replace the 

Opening and closing a window
C-W s
:clo to close the other windows.

External commands
:! DO THE COMMAND
:w TEST - Create a file
:!rm TEST - Delete a file

Tabs
t to create tab
gt to switch to next tab (from insert mode). gT to previous tab.
0gt/1gt jumps to first tab. 3gt jumps to third tab.


Vim for Rails Developers

The faster you can type, the faster you can force your brain to see the next parts. A reasonable goal is 80 WPM. 

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

:tag named_scope to bring you to the method definition.
:tag /validates_presence* # you can put in a regular expression.

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

VIMCASTS netrw.vim 
