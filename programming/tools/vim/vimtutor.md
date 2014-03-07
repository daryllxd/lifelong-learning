:set wrap
:set syntax=markdown

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

`x` to delete the thing under the key

`A` to append at end at line. You go to Insert mode there.

To save and exit: `:wq`.

`dw` to delete a word.

`d$` to delete until the end of the line.

`d^` to delete the beginning of the line.

Operators and motions



Navigating: just press the thing.

2w - 2 words forward
3e - end of third word

5j - move 5 lines down

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

