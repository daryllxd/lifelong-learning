nG – jump to line n
L – jump to the bottom of the screen (“low”)
H – jump to the top of the screen (“high”)
M – jump to the middle of the screen (“middle”)
C-o – jump back
C-i – jump forward
zt – move this line to the top of the screen (“top”)
zb – move this line to the bottom of the screen (“bottom”)
zz – move this line to the middle of the screen (“ziddle?”)

To quit: `:q!`

`h, j, k, l` to move

Press escape key to put you in normal mode. 

`x` to delete the thing under the key

`i` to go to insert mode

`A` to append at end at line. You go to Insert mode there.

To save and exit: `:wq`.

`dw` to delete a word.

`d$` to delete until the end of the line.

`d^` to delete the beginning of the line.

Operators and motions

w - until the start of the next word, excluding its first hcaracter. So you delete the space in between too.
e - to the end of the current word, don't delete the space in between.
$ - start of word.
^ - end of word.

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
