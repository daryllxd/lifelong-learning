# Chapter 1

*Tip 1: Meet the Dot Command.*

    >G # increases indentation from current line to the end of the file.

If we have to add a semicolon to the end of a JavaScript line, we can do `A;`. To repeat this on multiple lines, we do `j.` to navigate to the line and repeat the command.

Compound commands that I didn't know:

    C | c$
    s | cl
    S | ^C

*Tip 3: Take One Step Back, Then Three Forward*

    var foo = "method("+argument1+","+argument2+")";

    f+ to find next "+"
    s + <Esc> to replace the "+" with " + "
    ; to move to next match (this finds the last match `f` performed)
    . to replace next match

We get:

    var foo = "method(" + argument1 + "," + argument2 + ")";

Repeating again: `@:` to repeat any Ex command. Repeat last `:substitute` command by pressing `&`.

*Tip 4: Act, Repeat, Reverse*

    Intent                   | Act                   | Repeat | Reverse
    Make a Change            | {edit}                | .      | u
    Scan line for next char  | f{char}/t{char}       | ;      | ,
    Scan docu for next match | /pattern<CR>          | n      | N
    Perform substitution     | :s/target/replacement | &      | u

*Tip 5: Find and Replace by Hand*

Technique for changing first occurrence by hand, and then find/replace every other match one by one, for selective changing (we can't do the `:s` thing because it is automatic replace).

    * to select all with same word
    cwTHING<Esc> to change whatever is under the word to THING
    n to fly to next match
    . (optional) to replace if you want to. n to jump again.

If we want to blindly replace everything, that's when we do `:%s/content/copy/g`.
