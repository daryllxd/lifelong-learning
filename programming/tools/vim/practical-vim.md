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

How often should you leave Insert mode? It's a matter of preference, but I like to make each "undoable chunk" correspond to a thought. I pause at the end of a sentence to consider what I'll write next, and each pause forms a natural break point, giving me a cue to leave Insert mode. When I'm ready to continue writing, I press `A` and carry on where I left off.

*Tip 9: Compose Repeatable Changes*

To delete a word from the end, we can do `dbx`, `bdw`, and `daw`. How  we settle the question of which is best? Remember, Vim is optimized for repetition.

`daw` wins because it is a single command and can be repeated (the others are 2 commands) so it can be repeated via `.`. Making effective use of the dot command often requires some forethought. If you recognize that you have to make the same small change in a handful of places, you can attempt to compose your changes in such a way that they can be repeated with the dot command.

*Tip 10: Use Counts to Do Simple Arithmetic.*

Doesn't work with tmux and my tmux command. -.-

*Tip 11: Don't Count If You Can Repeat.*

I think it is easier/better to do `dw.....` rather than `d7w` or counting, as it is super tedious. At least I can just back up by `u`.

*Tip 12: Combine and Conquer.*

Operator + Motion = Action

The combination of operators with motions forms a kind of grammar. *The first rule is simple: an action is composed from an operator followed by a motion.* Learning new motions and operators is like learning the vocabulary of Vim. If we follow the simple grammar rules, we can express more ideas as our vocabulary grows.

When an operator command is invoked in duplicate, it acts upon the current line. `gUgU` or `gUU` uppercases an entire line.

# 3: Insert Mode

*Tip 13: Make Corrections Instantly from Insert Mode.*

In Insert mode, the backspace key works just as you would expect, but there are also other chords available:

    C-h | Delete back one character
    C-w | Delete back one word
    C-u | Delete back to start of line

*Tip 14: Get Back to Normal Mode.*

The classic way to move back to normal mode is with `<Esc>`. From Insert mode, we can switch to Insert Normal mode for one command by doing *`<C-o>`*. This is applicable to the `zz` thing.

*Tip 15: Paste from a Register Without Leaving Insert Mode.*

Use *`<C-r>0`* to paste from the 0 register without leaving Insert mode.

*Tip 16: Do Calculations in Place.*

The expression register allows us to perform calculations and then insert the result directly into our document.

    <C-r>=6*35<CR> to paste 6*35 (210) in.

# 4: Visual Mode

*Tip 21: Define a Visual Selection.*

Vim has three kinds of Visual mode: character, line, and visual.

    v   # Visual
    V   # Line-wise
    C-v # Block-wise Visual mode
    gv  # Reselect the last visual selection
    o   # Go to other end of highlighted text

*Tip 23: Prefer Operators to Visual Commands Where Possible.*

Visual mode may be more intuitive than Vim's Normal mode, but it has a weakness: it doesn't always play well with the dot command. We can route around this weakness by using Normal mode operators when appropriate.

As a general rule, we should prefer operator command over their Visual mode equivalents when working through a repetitive set of changes.

*Tip 24: Edit Tabular Data with Visual-Block Mode.*

    C-v to select
    Vr- to replace an entire line with the - symbol.
    r| to replace a column with the | symbol (if you have selected it already).

*Tip 25: Change Columns of Text.*

In this snippet of CSS, we want to replace all of the `images` and change them into `components`. What you do is to select using the Visual Block mode, `c` to change, `e` to move, then replace whatever is inside. The change will appear at first on the top line only.

    li.one   a{ background-image: url('/images/sprite.png'); }
    li.two   a{ background-image: url('/images/sprite.png'); }
    li.three a{ background-image: url('/images/sprite.png'); }

*Tip 26: Append After a Ragged Visual Block.*

For a jagged block such as this, what you do is `<C-v>2j$A;<Esc>`.

    var foo = 1
    var bar = 'a'
    var foobar = foo + bar

# Command-Line Mode

*Tip 27: Meet Vim's Command Line.*

When we press `:`, Vim switches into Command-Line mode. This mode has some resemblance to the command line that we use in the shell.
