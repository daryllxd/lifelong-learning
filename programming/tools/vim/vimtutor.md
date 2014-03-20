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

