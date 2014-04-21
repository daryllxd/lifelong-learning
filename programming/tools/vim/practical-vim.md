# Chapter 1

*Tip 1: Meet the Dot Command.*

    >G # increases indentation from current line to the end of the file.

If we have to add a semicolon to the end of a JavaScript line, we can do `A;`. To repeat this on multiple lines, we do `j.` to navigate to the line and repeat the command.

Compound commands that I didn't know:

    C | c$
    S | cl
    S | ^C

*Tip 3: Take One Step Back, Then Three Forward*

    Var foo = "method("+argument1+","+argument2+")";

    F+ to find next "+"
    S + <Esc> to replace the "+" with " + "
    ; To move to next match (this finds the last match `f` performed)
    . To replace next match

We get:

    Var foo = "method(" + argument1 + "," + argument2 + ")";

Repeating again: `@:` to repeat any Ex command. Repeat last `:substitute` command by pressing `&`.

*Tip 4: Act, Repeat, Reverse*

    Intent                   | Act                   | Repeat | Reverse
    Make a Change            | {edit}                | .      | u
    Scan line for next char  | f{char}/t{char}       | ;      | ,
    Scan docu for next match | /pattern<CR>          | n      | N
    Perform substitution     | :s/target/replacement | &      | u

*Tip 5: Find and Replace by Hand*

Technique for changing first occurrence by hand, and then find/replace every other match one by one, for selective changing (we can't do the `:s` thing because it is automatic replace).

    * To select all with same word
    Cwthing<Esc> to change whatever is under the word to THING
    N to fly to next match
    . (Optional) to replace if you want to. n to jump again.

If we want to blindly replace everything, that's when we do `:%s/content/copy/g`.

# Chapter 2: Normal Mode

*Tip 8: Chunk Your Undos*

The `u` key triggers undo, which reverts change (command triggered from Normal, Visual, and CLI modes). You can do `<Esc>o` instead of `<CR>` to create a line break so the paragraph creation can be undone.

*Tip 9: Compose Repeatable Changes*

To delete a word from the end, we can do `dbx`, `bdw`, and `daw`. How can we settle the question of which is best? Remember, Vim is optimized for repetition.

`daw` wins because it is a single command and can be repeated (the others are 2 commands) so it can be repeated via `.`.





