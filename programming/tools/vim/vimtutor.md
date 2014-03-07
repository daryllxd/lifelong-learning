# The Path to Mastery

1. Vim help. Highest ROI. It takes practice to parse it.
2. Keep a cheat sheet on your desk. Vim is a practice of accretion. It means you slowly add parts. Focus on just a few commands at a time. You don't build muscle memory until you do the command. WE DON'T WANT STUFF IN THE CHEAT SHEET, WE WANT THEM IN OUR BRAIN. Undo what you do and use the command and do it the right way.
3. Keep track of your annoyances. When you feel that you are doing something inefficient, capture those in a list. Ex: :Q to quit... few seconds of annoyance is subtracted. We want to stay in the zone and when you have to program in your head, you don't want to stop what you're dong.
4. Learn all the single letter commands. The most important commands are bound to the single letter keys.
5. Bind Esc to Caps Lock.

:set wrap
:set syntax=markdown

Splitting the window.
:split "heeehe  "
:vertical-split

:set splitbelow
:set splitright
:on - close all except in
:help opening-window


C-w (hjkl) to move across the panes.

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

$ - start of word.
^ - end of word.

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
c
v
b
n
m





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

