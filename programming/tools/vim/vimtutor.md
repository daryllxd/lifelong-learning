
:set wrap
:set syntax=markdown

Splitting the window.
:split "heeehe  "
:vertical-split

:set splitbelow
:set splitright
C-w - to make the 2 panes equal
:on - close all except in
:help opening-window

ciw: change inner word

C-w (hjkl) to move across the panes.

C-u - page up half a page 
C-b - page up
C-d - page down
nG – jump to line n
L – jump to the bottom of the screen (“low”)
H – jump to the top of the screen (“high”)
M – jump to the middle of the screen (“middle”)
C-o – jump back
C-i – jump forward
zt – move this line to the top of the screen (“top”)
zb – move this line to the bottom of the screen (“bottom”)
zz – move this line to the middle of the screen (“ziddle?”)

e – go to the end of the current word.
E – go to the end of the current WORD.
b – go to the previous (before) word.
B – go to the previous (before) WORD.
w – go to the next word.
W – go to the next WORD.
ge - end of PREVIOUS word.
) - next sentence.
} - next paragraph.

$ - end of line.
^ - start of line.

y$

q - record macro
w - next word start
e - next word end
r - replace in line
t 
y - yank
u - undo
i - insert mode. Insert On.
o - open below
p - paste
a - append: Insert AFTER.
s - substitute.
d 
f
g
h
j
k
l
z
x
c - change. chainable¡
v
b
n
m
. - repeat command

.... C-N in insert mode: Autocomplete bitches

/ -> pattern matching
* - lookf for the next occurence of the word
% - find matching braces
gd - jumo from the user of a vairable to its local declaration.

0D - delete all text from the line
^D - delete all text starting from the first non-blank character.

Macros - to define, q, then a. the nrecord, then to exit, q. then you have @a as the "saved macro". 

m - mark.
` - move to mark with a.
' - move to mark with a.


`x` to delete the thing under the key

`A` to append at end at line. You go to Insert mode there.

To save and exit: `:wq`.

`dw` to delete a word.

`d$` to delete until the end of the line.

`d^` to delete the beginning of the line.


combine with `d`

dd to delete and entire line.
2dd to delete two lines.

Undoing shit: `u`. You can also prepend with an number.
Massive undo: `U`.
Redo: `C-R`.

`^`: Move to start of line which is not whitespace.

`p`: Put the previously delected text after the cursor. Use in conjunction with `dd` to paste the preivous line.

Change is like delete but you go to insert mode after.

`ce`: Delete until end of word and put you in insert mode.

## Lesson 3 Summary

- `p` to put the deleted text AFTER the cursor
- To replace the 

