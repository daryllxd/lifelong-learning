# Chapter 1

*Tip 1: Meet the Dot Command.*

    >G # increases indentation from current line to the end of the file.

If we have to add a semicolon to the end of a JavaScript line, we can do `A;`. To repeat this on multiple lines, we do `j.` to navigate to the line and repeat the command.

Compound commands that I didn't know:

    C | c$
    S | cl
    S | ^C

*Tip 3: Take One Step Back, then Three Forward*

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

**On Vim Etymology.** `ed` was the original Unix text editor. In the context of "typists actually type faster than computers", it was vital that `ed` provide a terse syntax (`p` prints the current line, `%p` prints the current file). `ex` added a feature that turned the terminal screen into an interactive window that showed the contents of a file (real time). *The screen editing mode was activated by entering `:visual`, or `:vi` for short, and that's where the name `vi` came from.* Vim stands for Vi Improved.

    C-w # Delete to start of previous word
    C-u # Delete to strat of line

It is sometimes quicker to use and Ex command than to get a job done with the Normal commands. Ex commands can be executed everywhere (you don't need to move from your cursor).

*Tip 28: Execute a Command on One or More Consecutive Lines.*

    :1 or 1G # Go to the line 1
    :print   # Print it in the buffer
    :3d      # Go to line 3 and delete it, as opposed to 3Gdd
    :2,5d    # Delete each line from 2 to 5, inclusive.
    :%p      # % is a shorthand for the entire line. This is why we do :%s/Practical/Pragmatic to replace the entire line.
    :/<html>/.<\/html>/p # Pats from this pattern to the end.

Some symbols:

    1  # First line of the file
    $  # Last line of the file
    0  # Virtual line
    .  # Line where the cursor is placed
    'm # Line containing mark m
    '< # Start of visual selection
    '> # End of visual selection
    %  # The entire file (shorthand for:1,$)

    :0,$s/Go/Ro/g # Replace all instances of Go with Ro for basically the entire file.

*Tip 29: Duplicate or Move Lines using `:t` and `:m` Commands*

Copy: :copy, :co, :t

    :6copy.  # Copy whatever is in line 6 and put it below the current line
    :.t$     # Copy whatever is in the current line and put it at the end of the file
    :'<,'>m$ # Move whatever is in the visual selection to the end of the file
    @:       # Repeat the last Ex command.

`:t.` duplicates the current line. This is the same as `yyp` but `yyp` uses a register, whereas `:t.` doesn't.

*Tip 30: Run Normal Mode commands Across a Range.*

`normal`: Execute several normal mode commands on a series of consecutive lines.

    :'<,'>normal A; # To add semicolons to the end of several lines, select using visual mode first
    :%normal I// # Comment out an entire JavaScript file

Pressing `<C-r><C-w>` in command mode to get the word under the cursor. `<C-r><C-a>` to get the WORD under the cursor.

*Tip 35: Run Commands in the Shell.*

    :read !git diff # Execute git diff in the shell and insert its standard output below the cursor

# Part II: Files

# 6: Manage Multiple Files

    :ls               # See the current file
    :bnext/:bprevious # Switch to then next/previous buffer
    <C-w>=            # Equalize width and height of all windows
    <C-w>_            # Maximize height of active window
    <C-w>|            # Maximize width of active window

# 7: Open Files and Save Them to Disk

    :e.      # Open file window for the current working directory
    :E       # Open file explorer for the directory of the active buffer
    :Se, :Ve # Open file explorer in a horizontal split window or vertical split window
    :!mkdir -p hello/hi # Make directory named hello/hi in root directory.

# 8: Navigate Inside Files with Motions

*Tip 49: Find by Character*

    fc # Find the first occurence of "c"
    ;  # Move to the next occurence
    ,  # Move to the previous occurence

Think like a Scrabble player. If you are searching for the word "excellent", use `fx`, not `fe` so you can reach it faster. Capitals and punctuation marks are also rare, find them.

*Tip 51: Trace Your Selection with Precision Text Objects*

    var tpl = [
    '<a href="{url}">{title}</a>'
    ]

    vi} # Select inside the }
    a"  # Select around the quotes
    i>  # Inside >
    it  # Inside an HTML tag
    at  # Around an HTML tag
    a]  # Around ]

Vim's text objects consists of two characters, the first of which is always either `i` or `a`.

    ci"#     # Change inside the "" (ex: in href) to #
    citclick # Change inside of tag to "click"

*Tip 53: Mark Your Place and Snap Back to It*

    '{mark} # Moves to the line where the mark was set
    `{mark} # Moves the cursor to the exact position where the mark was set

Automatic Marks

    `` # Position before the last jump within the current file
    `. # Location of last change
    `^ # Location of last insertion
    `[ # Start of last change or yank
    `] # End of last change or yank
    `< # Start of last visual selection
    `> # End of last visual selection

# 9: Navigate Between Files with Jumps

*Tip 55: Traverse the Jump List*

Motions move around within a file, whereas jumps can move between files. We can inspect the contents of the jump list by running the command `:jumps`.

Jumps:

    [count]G                       # Jumpt to line number
    //pattern<CR>/?pattern<CR>/n/N # Jump to next/previous occurence of pattern
    H/M/L                          # Jump to top/middle/bottom of screen
    gf                             # Jump to file name under cursor
    <C-]>                          # Jump to definition of a keyword

*Tip 56: Traverse the Change List*

Vim records the location of our cursor after each change we make to a document.

    :changes # See recent changes
    g;       # Go forward in the change list
    g,       # Go backward in the change list

# IV: Registers

# 10: Copy and Paste

*60: Grok Vim's Registers*

Vim has multiple registers for all cut, copy, and paste operations.

    "{register} # Specifying which register we want to use. If we don't specify a register, then Vim will use the unnamed register.
    "_d         # Use the black hole register!
    "ayiw       # Yank in word to "a" register

The Yank Register: When we use the `y{motion}` command, the specified text is copied not only into the unnamed register but also into the yank register, `0`.

*Named registers: `#a` overwrites, and `#A` appends to the `a` register.*

    "% # Name of the current file
    "# # Name of the alternate file
    ". # Last inserted text
    ": # Last Ex command
    "/ # Last search pattern

*62: Paste from a Register*

In Insert mode:

    <C-r>" # Insert contents of the unnamed register
    <C-r>0 # Insert contents of the yank register

Pasting Line-wise Regions

    gp/gP # Same as p/P, but they leave the cursor positioned at the end of the pasted text instead of at the beginning.

# 11: Macros

    @@ # Repeats the macro that was invoked last

*65: Normalize, Strike, Abort.*

- Normalize the cursor position: Use the `n`, `0`, `^`, `gg` etc. to make sure that we are at the same cursor as the previous one.
- Strike your target with a reasonable motion: Use `w`, `b`, `e` and `ge`, not `h` and `l`.
- Abort when a motion fails. A `k` at the first line fails (Vim beeps). *If a motion fails while a macro is executing, then Vim aborts the rest of the macro.*

Parallel macro: Record the macro first, then select via visual block, then `:normal @a` to execute everything in parallel.

*68: Append Commands to a Macro.*

Instead of `qa` to record a macro, `qA` to append what you record to it. View the macro's contents by `:reg a`.

[TODO]: 69: Act Upon a Collection of Files.

# V: Patterns

# 12: Matching Patterns and Literals

Vim's regular expression engine is different: certain characters have a special meaning by default in Vim's search field. To disable this, we use `very nomagic` literal switch.

*73: Use the `\v` Pattern Switch for Regex Searches.*

# 13: Search

*79: Meet the Search Command.*

- When we execute a search, Vim scans forward from the current cursor position, stopping on the first match that it finds. If nothing is found before the end of the document, Vim informs us "search hit BOTTOM, continuing at TOP".
- If we use `?`, the search starts backward.
- `n` to next match, `N` to previous match.
- `/<CR>`: Jump forward to next match of same pattern, `?<CR>`: Jump backward to previous match of same pattern.
- To mute search highlighting, we could run `:set nohlsearch` to disable the feature entirely, but we use `:nohlsearch` to set the search highlighting muted until the next time you execute a new or repeat the search command.

*82: Count the Matches for the Current Pattern.*

    :%s///gn # Counts the number of matches of the pattern. We are calling the substitute command, but the n flag suppresses the usual behavior. Instead of replacing each match with the target, it simply counts the number of matches and echoes the result below the command line.

*83: Offset the Cursor to the End of a Search Match.*

Use this to position your cursor after a search. Ex: `/lang/e<CR>` means after you match `lang`, you move to the end of the word. This means you can then execute stuff such as appending, which means you can use `.` to repeat commands again.

*84: Operate on a Complete Search Match.*

Let's say we want this:

    class XhtmlDocument < XmlDocument; end
    class XhtmlTag < XmlTag; end

To:

    class XHTMLDocument < XMLDocument; end
    class XHTMLTag < XMLTag; end

Strokes:

    /\vX(ht)?ml\C<CR> # Find the matcher for the XML thingie
    gU//e<CR> # We use //e to search from the start to the end of the search match.
    // # Run the offset again

# 14: Substitution

*87: Meet the Substitute Command.*

The substitute command needs a search pattern, a replacement string, and a range over which it will execute.

    :[range]s[ubstitute]/{pattern}/{string}/[flags]

Flags: `:h :s_flags`.

    g # Act globally, change all matches within a line rather than just changing the first one.
    c # Confirm or reject each change.
    n # Suppress the usual substitute behavior, causing the command to report the numbero f occurences, not a change itself.
    e # Silence error reporting.
    & # Reuse the same flags from the previous substitute command.
    % # Means the entire file (vertically, like `:%s/??/?/g`).

Characters for the Replacement String:

    \r # Carriage return
    \t # Tab character
    \1 # Insert first submatch
    \2 # Second submatch
    \0 # Entire matched pattern
    &  # Entire matched pattern
    ~  # Use {string} from the previous invocation of :substitute
    \={VS} # Evaluate Vimscript expression, use result as replacement string

Prompt options:

    y     # Substitute
    n     # Skip
    q     # Quit substituting
    l     # "last" -- Substitute this match, then quit
    a     # "all" -- Substitute this and any remaining matches
    <C-e> # Scroll the screen up
    <C-y> # Scroll the screen down

To reuse the last search pattern, leave the search field blank.

*91: Replace with the Contents of a Register.*

If the text already exists in the document, we can yank it into a register and use it in the replacement field. Then we can pass the contents of a register either by value or by reference.

*Pass by Value:* We can replace things via this:

    :%s//<C-r>0/g # Paste from register 0. Vim pastes the contents of register 0 in place, which means we can examine it before we execute the substitute command.

*Pass by Reference:*

    :%s//\=@0/g # The \= item tells Vim to evaluate a Vim script expression, We reference the contents of register 0 (the yank register) as @0. This means substitute the last pattern with the contents of the yank register.

We can do this:

    :let @/='Pragmatic Vim'
    :let @a='Practical Vim'
    :%x//\=@/g

We set the search pattern, set the contents of the register (same thing as `"ay`), and then replace the thing.
